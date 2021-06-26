import React, { ReactNode } from "react";
import { View, Text, FlatList } from 'react-native'

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { Avatar } from "../Avatar";

export type MemberProps = {
    id: string,
    username: string,
    avatar_url: string,
    status: string
}

type Props = {
    data: MemberProps
}

export function Member({ data }: Props) {
    const { on, primary } = theme.colors;
    const IsOnline = data.status === 'online';

    return (
        <View style={styles.container}>

            <Avatar urlImge={data.avatar_url} />

            <View>

                <Text style={styles.title}>
                    {data.username}
                </Text>

                <View style={styles.status}>

                    <View

                        style={[
                            styles.bulletStatus,
                            {
                                backgroundColor: IsOnline ? on : primary
                            }]
                        }
                    />


                    <Text style={styles.nameStatus}>
                        {IsOnline ? "Disponível" : "Ocupado"}
                    </Text>

                </View>
            </View>


        </View>

    );

}