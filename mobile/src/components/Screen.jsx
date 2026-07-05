import { View, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { useFonts } from '@expo-google-fonts/nunito';

export default function Screen({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    padding: 16,
  },
});
