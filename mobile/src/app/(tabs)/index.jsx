import { View, Image, Text, StyleSheet } from "react-native";
import Screen from "@/components/Screen";

import { colors } from "@/theme/colors";

import { useFonts, Nunito_600Bold, Nunito_600SemiBold } from "@expo-google-fonts/nunito";

import mainBanner from "@/assets/images/main_banner.png";

import BlockButton from "@/components/BlockButton";

export default function HomeScreen() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  return (
    <Screen banner={mainBanner}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <BlockButton bg="FE" />
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20
        }}>
          <Text style={[
            styles.title, 
            {
              backgroundColor: colors.feBlue,
              color: colors.colorBg,
              paddingBlock: 5,
              paddingInline: 20,
              borderRadius: 20,
            }
          ]}>FAQ</Text>
          <Text style={[
            styles.title,
            {
              color: colors.feBlue
            }
            ]}>
              Perguntas Frequentes
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 24
  }
})