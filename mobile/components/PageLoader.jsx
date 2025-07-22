import { ActivityIndicator, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { styles } from "../assets/styles/home.styles";

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default PageLoader;
