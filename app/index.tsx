import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Categories from '@/components/Categories';
import Restaurants from '@/components/Restaurants';
import Colors from '@/constants/Colors';

const Page = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{paddingBottom:40}}>
                <Categories />
                <Text style={styles.header}>Top picks in your neighbourhood</Text>
                <Restaurants/>
                <Text style={styles.header}>Offers near you</Text>
                <Restaurants/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Page;

const styles = StyleSheet.create({
    container:{                  
        backgroundColor:Colors.lightGrey
    },
    header:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:16,
        marginBottom:8,
        paddingHorizontal:16
    }
})