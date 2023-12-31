import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '../constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackDrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);

    const { dismiss } = useBottomSheetModal();

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackDrop}
        >
            <View style={styles.contentContainer}>
                <View style={styles.toggle}>
                    <TouchableOpacity style={styles.toggleActive}>
                        <Text style={styles.activeText}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleInactive}>
                        <Text style={styles.inActiveText}>Pickup</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subHeader}>Your Location</Text>
                <Link href={'/(modal)/location-search'} asChild>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Ionicons name="location-outline" size={20} color={Colors.medium} />
                            <Text style={{ flex: 1 }}>Current location</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                </Link>

                <Text style={styles.subHeader}>Arrival time</Text>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <Ionicons name='stopwatch-outline' size={20} color={Colors.medium} />
                        <Text style={{ flex: 1 }}>Now</Text>
                        <Ionicons name='chevron-forward' size={20} color={Colors.primary} />

                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => dismiss()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
})

export default BottomSheet;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        padding: 30,
        paddingVertical: 6,
        borderRadius: 32
    },
    activeText: {
        color: '#fff',
        fontWeight: '700'
    },
    inActiveText: {
        color: Colors.primary,
    },
    toggleInactive: {
        // backgroundColor:Colors.primary,
        padding: 30,
        paddingVertical: 6,
        borderRadius: 32
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        borderRadius: 4,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        margin: 16,
    },
    item: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderColor: Colors.lightGrey,
        borderWidth: 1
    }
})