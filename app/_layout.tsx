import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, useColorScheme } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayoutNav() {

  const navigation = useNavigation();

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          header: () => <CustomHeader />
        }} />
        <Stack.Screen name="(modal)/filter" 
        options={{
          presentation:'modal',
          headerTitle:'Filter',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:Colors.lightGrey
          },
          headerLeft:()=>(
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
              <Ionicons name='close-outline' size={28}/>
            </TouchableOpacity>
          )
        }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
