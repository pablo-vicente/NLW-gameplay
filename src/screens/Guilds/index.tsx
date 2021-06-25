import React, { useState } from "react";

import { View, FlatList } from 'react-native'
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./styles";

type Props = {
    handleGuildsSelected: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildsSelected }: Props) {

    const guilds = [
        {
            id: '1',
            name: "Lendarios",
            icon: "image.png",
            owner: true
        },
        {
            id: '2',
            name: "Galera dos Games",
            icon: "image.png",
            owner: false
        },
        {
            id: '3',
            name: "Galera dos Games",
            icon: "image.png",
            owner: false
        },
        {
            id: '4',
            name: "Galera dos Games",
            icon: "image.png",
            owner: false
        },
        {
            id: '5',
            name: "Galera dos Games",
            icon: "image.png",
            owner: false
        },
        {
            id: '6',
            name: "Galera dos Games",
            icon: "image.png",
            owner: false
        }
    ]

    return (
        <View style={styles.container}>

            <FlatList
                data={guilds}
                keyExtractor={item => (item.id)}
                renderItem={({ item }) => (
                    <Guild
                        data={item}
                        onPress={() => handleGuildsSelected(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                ListHeaderComponent={() => <ListDivider isCentered />}
                contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                style={styles.guilds}
            />


        </View>
    );

}