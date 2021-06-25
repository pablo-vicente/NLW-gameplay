import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

type Props = {
    isCentered?: boolean
}

export function ListDivider({ isCentered: isCenter }: Props) {
    return (

        <View style={[
            styles.container,
            isCenter ? {
                marginVertical: 12,
            } : {
                marginTop: 2,
                marginBottom: 31
            }
        ]} />

    );
}