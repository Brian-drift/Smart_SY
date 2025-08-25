import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Onboarding from "@/app/DebutOnboading/onboarding";
import Classe from "@/app/classe";
import ecranProflls from "@/app/Profils/ecranProflls";
import EditorScreen from "@/app/Editeurs";


const Stack = createNativeStackNavigator();
export default function Index() {
    return (
        <Stack.Navigator initialRouteName={'Onboarding'} screenOptions={{headerShown:false}}>
            <Stack.Screen name={"Onboarding"} component={Onboarding}/>
            <Stack.Screen name={"Classe"} component={Classe}/>
            <Stack.Screen name={"ecranProfile"} component={ecranProflls} />
            <Stack.Screen name={"EditorScreen"} component={EditorScreen} />
        </Stack.Navigator>
    );
}