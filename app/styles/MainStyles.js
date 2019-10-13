import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    /* Main */
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBackgroundImage:{
        height: '80%',
        width: '100%',
        backgroundColor: '#000',
        position: 'absolute'
    },
    mainLogo:{
        width: '60%',
        alignSelf: 'center',
        paddingVertical: 100,
        marginBottom: 200
    },
    mainCard:{
        backgroundColor:"#fff",
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent:'center',
        width: '100%',
        alignSelf: 'baseline',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30
    },
    mainContainer:{
        flex: 1,
        backgroundColor: "#0076A0"
    },
    scrollView:{
        height: '100%',
    },
    spacer:{
        marginBottom: 50
    },

    /* Inputs */
    mainInputTitle:{
        color: '#007EA8',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 10
    },
    mainInputContainer:{
       
        flexDirection: 'row',
        borderBottomColor: '#606060',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginVertical: 10
    },
    mainInputContainerError:{
        borderBottomColor: '#E44F3C'
    },  
    mainInput:{
        flex: 1,
    },
    mainInputImg:{
        width: 20,
        height: 20
    },
    mainInputErrorMessage:{
        color: '#E44F3C',
        fontStyle: 'italic',
        alignSelf: 'flex-start',
    },

    /* Touchables */
    TouchableTextContainer:{
        position: 'relative',
        top: -35,
        alignSelf: 'flex-end',
    },
    TouchableText:{
        color: '#007EA9',
        marginLeft: 10
    },
    TouchableTextContainerRow:{       
        marginVertical: 15, 
        flexDirection: 'row',
    },
    /* Buttons */ 
    MainButtonContainer:{
        backgroundColor: '#007EA9',
        width: '100%',
        borderRadius: 5
    },
    MainButtonText:{
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10
    }
});