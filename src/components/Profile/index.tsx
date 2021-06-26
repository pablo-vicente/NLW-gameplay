import React from "react";
import {
    View,
    Text,
    Alert
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";
import { styles } from "./styles";

export function Profile() {

    function handleSignOut() {
        Alert.alert("Logoiut", "Deseja sair do gameplay", [{
            text: 'Não',
            style: 'cancel'
        }, {
            text: 'Sim',
            onPress: () => { signOut() }
        }])
    }

    const { user, signOut } = useAuth();
    return (
        <View style={styles.container}>

            <RectButton onPress={handleSignOut}>
                <Avatar urlImge={user.avatar} />
            </RectButton>


            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.userName}>
                        {user.firstName}
                    </Text>

                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitoria
                </Text>

            </View>


        </View>
    );
}