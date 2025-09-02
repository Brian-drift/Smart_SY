import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Onboarding from "@/app/DebutOnboading/onboarding";
import Classe from "@/app/(TABS) CLASSES/Reception/classe";
import ecranProflls from "@/app/Profils/ecranProflls";
import EcransDesPremieres from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_premieres";
import EcransDesDeuxiemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_deuxiemes";
import EcransDesTroisiemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_troisiemes";
import EcransDesQuatriemes from "@/app/(TABS) CLASSES/Reception/classes_superieurs/ecrans_des_quatriemes";


const Stack = createNativeStackNavigator();
export default function Index() {
    return (
        <Stack.Navigator initialRouteName={'Onboarding'} screenOptions={{headerShown:false}}>
            <Stack.Screen name={"Onboarding"} component={Onboarding}/>
            <Stack.Screen name={"Classe"} component={Classe}/>
            <Stack.Screen name={"ecranProfile"} component={ecranProflls} />
            <Stack.Screen name={"EcransDesPremieres"} component={EcransDesPremieres}/>
            <Stack.Screen name={"EcransDesDeuxiemes"} component={EcransDesDeuxiemes}/>
            <Stack.Screen name={"EcransDesTroisiemes"} component={EcransDesTroisiemes}/>
            <Stack.Screen name={"EcransDesQuatriemes"} component={EcransDesQuatriemes}/>
        </Stack.Navigator>
    );
}