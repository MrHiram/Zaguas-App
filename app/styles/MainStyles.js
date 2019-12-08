import { StyleSheet, Platform } from 'react-native';

const colors = {
    PRIMARY_ACCENT: '#007EA8',
}

export default StyleSheet.create({
    /* Primary Containers */
    mainContainer: {
        flex: 1,
    },
    scrollView: {
        height: '100%',
        width: '100%',
    },
    searchBarContainer: {
        flexDirection: 'row',
        padding: 7,
        marginHorizontal: 20,
        marginTop: Platform.OS == 'android' ? 30 : null,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        elevation: 1,
        borderRadius: 15,
    },
    mainTitle: {
        color: colors.PRIMARY_ACCENT,
        fontSize: 20,
        marginTop: 10
    },
    mainText: {
        fontSize: 17,
        color: '#777',
        paddingVertical: 10
    },
    textBold: {
        fontWeight: 'bold'
    },
    alignLeft: {
        alignSelf: 'flex-start',
    },
    alignCenter: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBackgroundImage: {
        height: 500,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#007EA9',
    },
    setupMainImage: {
        width: '100%',
        height: '100%',
    },
    setupCardImg: {
        alignSelf: "center",
        backgroundColor: '#ccc',
        height: '55%',
        overflow: 'hidden'
    },
    setupCardImagContainer: {
        height: '50%',
    },
    setupContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden',
        width: '90%',
        height: '30%',
        marginBottom: 30
    },
    paddinText: {
        paddingHorizontal: 20
    },
    mainLogo: {
        width: '60%',
        alignSelf: 'center',
        marginBottom: 80
    },
    mainLogoWithoutBottom: {
        marginBottom: 0
    },
    whiteText: {
        color: '#fff',
        marginBottom: 30,
        fontSize: 20,
        textAlign: 'center'
    },
    secondaryLogo: {
        width: '80%',
        alignSelf: 'center',
        height: '10%',
        marginTop: 60,
        marginBottom: 20
    },
    profileCard: {
        paddingTop: 20,
        marginBottom: 20
    },
    profilePictureText: {
        alignSelf: 'center',
    },
    mainCard: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'center',
        width: '100%',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
    },
    borderBottom: {
        borderBottomWidth: 1,
    },
    searchBarText: {
        flex: 1,
        fontWeight: '700'
    },
    searchBarIcon: {
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 7
    },
    feedHeaderText: {
        fontSize: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        marginStart: 20,
        marginVertical: 10
    },
    /*Profile*/
    mainName: {
        fontSize: 30,
        alignSelf: "center"
    },
    subnames: {
        fontSize: 25
    },
    blue: {
        color: "#1E749D",
    },
    green: {
        color: "#198352",
    },
    teal: {
        color: "#81D0C6",
    },
    mainText: {
        fontSize: 18
    },
    containerProfile: {
        backgroundColor: "#f3f3f3",
        borderRadius: 5,
        padding: 10,
        marginVertical: 15
    },
    animatedBox: {
        flex: 1,
        padding: 20,
    },
    /*****/
    spacer: {
        marginBottom: 50
    },
    switchContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    switchSize: {
        width: 60
    },
    switchText: {
        marginTop: 5
    },

    /* Inputs */
    mainInputContainer: {
        flexDirection: 'row',
        borderBottomColor: '#606060',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginVertical: 10
    },
    mainInputContainerError: {
        borderBottomColor: '#E44F3C'
    },
    mainInputImg: {
        width: 20,
        height: 20
    },
    mainInputErrorMessage: {
        color: '#E44F3C',
        fontStyle: 'italic',
        alignSelf: 'flex-start',
    },
    mainImageErrorMessage: {
        alignSelf: 'center',
    },
    comboboxProfile: {
        borderBottomColor: '#606060',
        borderBottomWidth: 1,
        height: 50,
        width: '100%'
    },

    /* Touchables */
    TouchableTextContainer: {
        position: 'relative',
        top: -35,
        alignSelf: 'flex-end',
    },
    TouchableText: {
        color: '#007EA9',
        marginLeft: 10
    },
    TouchableTextContainerRow: {
        marginVertical: 15,
        flexDirection: 'row',
    },
    /* Buttons */
    MainButtonContainer: {
        backgroundColor: '#007EA9',
        width: '100%',
        borderRadius: 5
    },
    MainButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10
    },
    animatedHeaderContainer: {
        top: (Platform.OS == 'ios') ? 20 : 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topRightSetings: {
        minHeight: 28,
        minWidth: 28,
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 50
    },
    topLeftSetings: {
        minHeight: 28,
        minWidth: 28,
    }
});