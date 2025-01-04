import {useGlobalContext} from "@/providers/global-provider";
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator} from "react-native";
import {Redirect, Slot} from "expo-router";
import {routes} from "@/constants/routes";

export default function AppLayout() {
    const {loading, isLoggedIn} = useGlobalContext();

    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-primary-300" size="large"/>
            </SafeAreaView>
        )
    }

    if (!isLoggedIn) return <Redirect href={routes.signIn}/>

    return <Slot/>
}