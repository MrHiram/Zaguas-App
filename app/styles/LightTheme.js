import { StyleSheet, Platform } from 'react-native';

const colors = {
    PRIMARY_BASE_COLOR: '#FFF',
    PRIMARY_ACCENT: '#007EA9',
    SECONDARY_ACCENT: '#222',
    PRIMARY_SHADOW: '#000'
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
    secondaryTextColor:{
        color: colors.PRIMARY_SHADOW
    },
    subtitleTextColor:{
        color: colors.PRIMARY_ACCENT
    },
    btnTextColor:{
        color: colors.PRIMARY_BASE_COLOR
    }
});