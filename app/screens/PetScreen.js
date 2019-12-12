import React from "react";
import { View, Text } from "react-native";

export default class PetScreen extends React.Component {
    state = {};
    componentDidMount() {}

    render() {
        let id = this.props.navigation.state.params.petId;
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text>Hola mnundo {id}</Text>
                </View>
            </>
        );
    }
}
