import React from "react";
import { Image } from "react-native";
import { styles } from "./styles";


export function GuildIcon() {
    const uri = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2%2FVolvo-PNG-Image-HD.png&f=1&nofb=1'
    return (

        <Image
            source={{ uri }}
            style={styles.image}
            resizeMode='cover'
        />

    );
}