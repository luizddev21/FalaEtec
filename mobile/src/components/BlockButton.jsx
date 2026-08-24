import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme/colors";
import { Text, TouchableOpacity, StyleSheet, ImageBackground, useWindowDimensions } from "react-native";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

import feSmall from "@/assets/images/button_assets/FE-Small.png";

export default function BlockButton({
  bg
}) {
  const { width, height } = useWindowDimensions();

  

  const size =
    width <= 478
      ? "Small"
      : width <= 768
        ? "Medium"
        : "Large";



  return (
    <TouchableOpacity style={styles.button}>
      <ImageBackground source={feSmall}
          resizeMode="contain"
          style={{ flex: 1 }}>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
  },
});
