import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "expo-router/build/react-navigation";

export default function myPhrases(){
    return(
        <SafeAreaView>
            <Text>My Phrases</Text>
        </SafeAreaView>
    )
}