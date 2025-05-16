import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FoodItem {
  id: string;
  name: string;
  imagePath: string;
  price: number;
  category: string;
  description: string;
}

interface CartContextType {
  cartItems: FoodItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "CART_ITEMS";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);

  const saveCart = async (items: FoodItem[]) => {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem(CART_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = (item: FoodItem) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    AsyncStorage.removeItem(CART_KEY);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext must be used within a CartProvider");
  return context;
};
