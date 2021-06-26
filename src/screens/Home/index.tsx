import React, { useState, useCallback } from "react";
import { View, Text, FlatList } from 'react-native'

import { styles } from "./styles";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../config/database";
import { Load } from "../../components/Load";


export function Home() {

    const [category, setCategory] = useState("")
    const [loading, setloading] = useState(true)
    const [appointments, setAppointment] = useState<AppointmentProps[]>([])

    const navigation = useNavigation()

    function handlerCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected })
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointment() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage: AppointmentProps[] = response ? JSON.parse(response) : []

        if (category) {
            setAppointment(storage.filter(item => item.category === category))
        } else {
            setAppointment(storage)
        }

        setloading(false)
    }

    useFocusEffect(useCallback(() => {
        loadAppointment();
    }, [category]))

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd
                    onPress={handleAppointmentCreate}
                />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handlerCategorySelect}
            />

            {

                loading ? <Load /> :
                    <>
                        <ListHeader
                            title="Partidas Agendadas"
                            subtitle={`Total ${appointments.length}`}
                        />


                        <FlatList
                            data={appointments}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Appointment
                                    data={item}
                                    onPress={() => handleAppointmentDetails(item)}
                                />
                            )}
                            ItemSeparatorComponent={() => <ListDivider />}
                            contentContainerStyle={{
                                paddingBottom: 69
                            }}
                            style={styles.matches}
                            showsVerticalScrollIndicator={false}

                        />

                    </>
            }
        </Background>
    );

}