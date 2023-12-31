import { Image, StyleSheet, Text, View, TouchableOpacity, SectionList, ListRenderItem, ScrollView } from 'react-native'
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Colors from '@/constants/Colors';
import { restaurant } from '@/assets/data/restaurant';
import { Link, useNavigation } from 'expo-router';
import { useLayoutEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Details = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);

    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<TouchableOpacity[]>([]);

    const DATA = restaurant.food.map((item, index) => ({
        title: item.category,
        data: item.meals,
        index,
    }))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.primary,
            headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={Colors.primary}
                />
            </TouchableOpacity>,
            headerRight: () => <View style={styles.bar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                    <Ionicons
                        name="share-outline"
                        size={24}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                    <Ionicons
                        name="search-outline"
                        size={24}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>
        })
    }, [])

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);        
    };

    const onScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y > 350) {
            opacity.value = withTiming(1);
        } else {
            opacity.value = withTiming(0);
        }
    }

    const renderItem: ListRenderItem<any> = ({ item, index }) => (
        <Link href={"/(modal)/dish"} asChild>
            <TouchableOpacity style={styles.item}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dish}>{item.name}</Text>
                    <Text style={styles.dishText}>{item.info}</Text>
                    <Text style={styles.dishText}>{item.price}</Text>
                </View>
                <Image source={item.img} style={styles.dishImage} />
            </TouchableOpacity>
        </Link>
    )


    return (
        <>
            <ParallaxScrollView
                scrollEvent={onScroll}
                backgroundColor={'#fff'}
                style={{ flex: 1 }}
                parallaxHeaderHeight={250}
                stickyHeaderHeight={100}
                renderBackground={() => <Image
                    source={restaurant.img}
                    style={{ width: '100%', height: 300 }}
                />
                }
                contentBackgroundColor={Colors.primary}
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>{restaurant.name}</Text>
                    </View>
                )}
            >
                <View style={styles.detailsContainer}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantDescription}>{restaurant.delivery} * {restaurant.tags.map((tag, index) => (
                        `${tag}${index < restaurant.tags.length - 1 ? ' * ' : ""}`
                    ))}</Text>
                    <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
                    <SectionList
                        contentContainerStyle={{ paddingBottom: 50 }}
                        keyExtractor={(item, index) => `${item.id + index}`}
                        scrollEnabled={false}
                        sections={DATA}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={{
                            marginHorizontal: 20,
                            height: 1,
                        }} />}
                        SectionSeparatorComponent={() => <View style={{
                            height: 1,
                            backgroundColor: 'rgba(0,0,0,0.05)'
                        }} />}
                        renderSectionHeader={({ section: { title, index } }) => <Text style={styles.sectionHeader}>{title}</Text>}
                    />
                </View>
            </ParallaxScrollView>
            <Animated.View style={[styles.stickySegments, animatedStyles]}>
                <View style={styles.segmentsShadow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentsScrollView}>
                        {restaurant.food?.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}
                                onPress={() => selectCategory(index)}
                            >
                                <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{item.category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Animated.View>
        </>
    )
}

export default Details;

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },
    stickySection: {
        marginLeft: 70,
        height: 100,
        justifyContent: 'flex-end',
        paddingBottom: 18
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    stickySectionText: {
        fontSize: 20,
        margin: 10,
    },
    restaurantName: {
        fontSize: 24,
        margin: 16,
    },
    restaurantDescription: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        color: Colors.medium,
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 40,
        margin: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        padding: 16
    },
    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    dishText: {
        fontSize: 14,
        color: Colors.mediumDark
    },
    dish: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    stickySegments: {
        position: "absolute",
        height: 50,
        left: 0,
        top: 100,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingBottom: 4,
        shadowColor: 'grey',
        elevation: 3
    },
    segmentsShadow: {
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        elevation: 5,
        width: '100%',
        height: '100%'

    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentButtonText: {},
    segmentText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentsScrollView: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20
    }
})