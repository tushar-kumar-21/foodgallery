import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
androidSafeArea:{    
    paddingTop:Platform.OS === 'android' ? 25 : 0,
}
})