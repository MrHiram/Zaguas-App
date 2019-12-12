import React from "react";
import { View } from "react-native";
import MainStyles from "../styles/MainStyles";
import AddPetContainer from "../containers/AddPetContainer";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class AddPetScreen extends React.Component {
    render() {
        let { colorTheme } = this.props.screenProps;
        return (
            <View style={[{ flex: 1 }, colorTheme.mainBackground]}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    extraHeight={300}
                >
                    <View
                        style={[
                            MainStyles.animatedHeaderContainer,
                            { position: "absolute" }
                        ]}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0.75 }}
                            end={{ x: 0.5, y: 0.75 }}
                            colors={["#045379", "#1782ac"]}
                            style={{
                                position: "absolute",
                                height: 520,
                                width: "100%"
                            }}
                        />
                    </View>
                    <AddPetContainer
                        goBack={() => {
                            this.props.navigation.state.params.onGoBack();
                            this.props.navigation.goBack();
                        }}
                        screenProps={this.props.screenProps}
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
