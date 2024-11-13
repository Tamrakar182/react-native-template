import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-white p-20">This is a test</Text>
      <Button onPress={() => console.log('should work')}>
        <Text className="text-white">Works?</Text>
      </Button>
    </SafeAreaView>
  );
}
