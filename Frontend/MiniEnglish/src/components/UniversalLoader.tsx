
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type UniversalLoaderProps = {
  message?: string;
  variant?: "fullscreen" | "refresh" | "inline";
};

export default function UniversalLoader({
  message = "Getting your phrases ready…",
  variant = "fullscreen",
}: UniversalLoaderProps) {
  if (variant === "refresh") {
    return (
      <View style={styles.refresh}>
        <ActivityIndicator size="small" color="#B52046" />
        <Text style={styles.refreshText}>{message}</Text>
      </View>
    );
  }

  if (variant === "inline") {
    return (
      <View style={styles.inline}>
        <ActivityIndicator size="small" color="#FF5A79" />
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullscreen}>
      <View style={styles.spinnerCircle}>
        <ActivityIndicator size="large" color="#FF5A79" />
      </View>

      <Text style={styles.title}>MiniEnglish</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subtitle}>
        Just a moment, little steps make big progress. 🌸
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: "#F8F9FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  spinnerCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#E6EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    color: "#B52046",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  message: {
    color: "#121C2A",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    color: "#8D7072",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  refresh: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },
  refreshText: {
    color: "#B52046",
    fontSize: 13,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 10,
  },
});
