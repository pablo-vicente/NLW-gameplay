import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import * as Linking from 'expo-linking';

import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, FlatList, Alert, Share, Platform } from "react-native";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { theme } from "../../global/styles/theme";

import BannerPng from '../../assets/banner.png'
import { styles } from "./styles";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useRoute } from "@react-navigation/native";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from "../../components/Load";


type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string,
    name: string,
    instant_invite: string,
    members: MemberProps[],
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
    const [loading, setLoading] = useState(true)

    const routes = useRoute();
    const { guildSelected } = routes.params as Params;

    async function fecthGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
            setWidget(response.data)
        } catch (error) {
            Alert.alert("Verifique as configurações do servidor. Será que o Widget está habilitado?")
        }
        finally {
            setLoading(false)
        }
    }

    function handleShareInvitation() {

        const message = Platform.OS === 'ios'
            ? `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invite;

        console.log(message)

        Share.share({
            message,
            url: widget.instant_invite
        })

    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite)
    }

    useEffect(() => {
        fecthGuildWidget()
    }, [])

    return (
        <Background>
            <Header
                title="Detalhes"
                action={

                    guildSelected.guild.owner &&
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                            onPress={handleShareInvitation}
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
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>

            </ImageBackground>

            {
                loading ? <Load /> :
                    <>
                        <ListHeader
                            title="Jogadores"
                            subtitle={`Total ${widget.members.length}`}
                        />


                        <FlatList
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Member
                                    data={item}
                                />
                            )}
                            ItemSeparatorComponent={() => <ListDivider />}
                            style={styles.members}
                        />
                    </>
            }


            {
                guildSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon
                        title="Entrar na partida"
                        onPress={handleOpenGuild}
                    />
                </View>
            }




        </Background>
    );

}