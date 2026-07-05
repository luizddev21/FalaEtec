import { View, Pressable, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { useEffect, useState, useRef } from "react";
import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

export default function MyTabBar({ state, descriptors, navigation }) {
  const labels = {
    index: "Início",
    user: "Usuário",
  };

  const translateX = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        const width = e.nativeEvent.layout.width;
        setTabWidth(width / state.routes.length);
      }}
    >
      <Animated.View
        style={[
          styles.tabIndicator,
          {
            width: tabWidth - 20,
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        let icon = "home";

        if (route.name === "index") icon = "home";
        if (route.name === "user") icon = "person";

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={focused ? styles.buttonFocused : styles.button}
          >
            <Ionicons
              name={icon}
              size={24}
              color={focused ? colors.feBlue : colors.darkGrey}
            />

            <Text
              style={{
                color: focused ? colors.feBlue : colors.darkGrey,
                marginTop: 5,

                fontFamily: "Nunito_400Regular",
              }}
            >
              {labels[route.name]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: 10,
    gap: 10,
    backgroundColor: colors.mediumGrey,

    justifyContent: "space-around",

    alignItems: "center",
  },

  tabIndicator: {
    position: "absolute",
    left: 0,
    width: "50%",
    height: "80%",
    backgroundColor: colors.colorBg,
    margin: 10,
    borderRadius: 20,
    zIndex: 0,
  },

  button: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    zIndex: 1,
  },

  buttonFocused: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    zIndex: 1,
  },
});
