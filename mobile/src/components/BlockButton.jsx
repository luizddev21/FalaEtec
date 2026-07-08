import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/theme/colors";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

export default function BlockButton({
  children,
  text,
  initial,
  final,
  proportion = 1 / 1,
}) {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  return (
    <TouchableOpacity style={[styles.smallButton, { aspectRatio: proportion }]}>
      <LinearGradient
        colors={[initial, final]}
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            aspectRatio: proportion,
          },
          styles.smallButton,
        ]}
      >
        <Text style={styles.buttonText}>{text}</Text>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  smallButton: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
  },

  buttonText: {
    fontFamily: "Nunito_400Regular",
    color: colors.colorBg,
    fontSize: 24,
  },
});
