import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayoutNav() {

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          header: () => <CustomHeader />
        }} />
      </Stack>

    </BottomSheetModalProvider>
  );
}
