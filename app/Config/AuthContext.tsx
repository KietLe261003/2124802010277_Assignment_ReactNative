import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app, db } from "./firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { doc, getDoc } from "@firebase/firestore";
import { User } from "../Screen/ThucHanh/Lab3Screen/Type/User";

// Constants for storage keys
const KEY_USER = "USER";
const KEY_TOKEN = "TOKEN";

// Create context
export const AuthContext = createContext<any>(undefined);

// Props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await getDoc(doc(db, "users", firebaseUser.uid));
        setUser(userData.data() as User);
        const token = await firebaseUser.getIdToken();
        await AsyncStorage.setItem(KEY_USER, JSON.stringify(firebaseUser));
        await AsyncStorage.setItem(KEY_TOKEN, JSON.stringify(token));
      } else {
        setUser(null);
        await AsyncStorage.removeItem(KEY_USER);
        await AsyncStorage.removeItem(KEY_TOKEN);
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const login = async ({ phone, password }: { phone: string; password: string }) => {
    setIsLoading(true);
    try {
      const email = `${phone}@kami.com`; // simulate email from phone
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("BottomTab", { screen: "Home" });
    } catch (error: any) {
      alert("Đăng nhập thất bại: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
