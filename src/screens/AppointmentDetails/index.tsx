import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import React, { useState } from "react";
import { Text, View, ImageBackground, FlatList } from "react-native";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { theme } from "../../global/styles/theme";

import BannerPng from '../../assets/banner.png'
import { styles } from "./styles";
import { ListHeader } from "../../components/ListHeader";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";


export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            userName: 'Pablo',
            avatar_url: 'https://github.com/pablo-vicente.png',
            status: 'online'
        },
        {
            id: '2',
            userName: 'Pablo',
            avatar_url: 'https://github.com/pablo-vicente.png',
            status: 'offline'
        }
    ]

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />

                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerPng}
                style={styles.banner}
            >

                <View style={styles.bannerContent}>

                    <Text style={styles.title}>
                        Lendários
                    </Text>

                    <Text style={styles.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida a md10
                    </Text>
                </View>

            </ImageBackground>

            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />


            <FlatList
                data={members}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Member
                        data={item}
                    />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.members}
            />


            <View style={styles.footer}>
                <ButtonIcon
                    title="Entrar na partida"
                />
            </View>




        </Background>
    );

}