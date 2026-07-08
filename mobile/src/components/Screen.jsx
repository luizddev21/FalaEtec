import { View, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const HEADER_HEIGHT = 250;

export default function Screen({ children, banner = null }) {

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const bannerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, -120],
            Extrapolation.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT * 0.8],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    banner ? 
      <View style={styles.container}>
      <Animated.Image
        source={banner}
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: HEADER_HEIGHT,
            width: '100%',
            backgroundColor: "#6C63FF",
            boxShadow: 'inset 0px 2px 8px rgba(0, 0, 0, 0.15)',
            zIndex: 1,
          },
          bannerStyle,
        ]}
      />

      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <View style={{ height: HEADER_HEIGHT }} />
        {children}
      </Animated.ScrollView>
    </View>
    :
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    padding: 16,
  },
});
