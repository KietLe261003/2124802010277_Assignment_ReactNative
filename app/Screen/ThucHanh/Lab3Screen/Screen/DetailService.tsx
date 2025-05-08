import { View, Text } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
interface DetailServiceRouteParams {
    idService: String;
  }
const DetailService = () => {
  const route = useRoute<RouteProp<{ idService: DetailServiceRouteParams }, "idService">>();
  const {idService}=route.params;

  return (
    <View>
      <Text>DetailService {idService}</Text>
    </View>
  );
};

export default DetailService;
