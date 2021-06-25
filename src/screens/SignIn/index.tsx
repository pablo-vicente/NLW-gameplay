import React from "react";
import {
    View,
    Text,
    Image,
    Alert,
    ActivityIndicator
} from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";
import IllustationImg from "../../assets/illustration.png";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useAuth } from "../../hooks/auth";
import { theme } from "../../global/styles/theme";

export function SignIn() {
    const { loading, signIn } = useAuth();

    async function handleSignIn() {
        try {
            signIn()
        } catch (error) {
            Alert.alert(error)
        }
    }

    return (

        <Background>

            <View style={styles.container}>

                <Image
                    source={IllustationImg}
                    style={styles.image}
                    resizeMode="stretch"
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se e organize {`\n`}
                        suas jogatinas  {`\n`}
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games  {`\n`}
                        favoritos com seus amigos
                    </Text>

                    {
                        loading
                            ? <ActivityIndicator color={theme.colors.primary} />
                            : <ButtonIcon
                                title="Entar com Discord"
                                onPress={handleSignIn}
                            />
                    }


                </View>

            </View>

        </Background>


    );
}
