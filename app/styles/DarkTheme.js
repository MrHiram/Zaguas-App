import { StyleSheet, Platform } from 'react-native';

const colors = {
    PRIMARY_BASE_COLOR: '#222',
    PRIMARY_ACCENT: '#007EA9',
    SECONDARY_ACCENT: '#FFF'
}

export default StyleSheet.create({    
    mainBackground:{
        backgroundColor: colors.PRIMARY_BASE_COLOR, 
    },
    mainAccentBackGround:{
        backgroundColor: colors.PRIMARY_ACCENT
    },
    mainTextColor:{
        color: colors.SECONDARY_ACCENT
    },
    btnTextColor:{
        color: colors.PRIMARY_BASE_COLOR
    }
});