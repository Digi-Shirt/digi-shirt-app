import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    //
    //=== Generic Containers ========
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    backgroundImage:{
        flex: 1,
        width: "100%",
        paddingTop: 20,
        alignItems: "center",
    },
    modalView: {
        backgroundColor: '#FFF',
        padding: 20,
        alignItems: "center",   
    },
    textBlock: {
        width: "90%",
        marginVertical: 20,
        fontSize: 22,
        color: '#777',
    },
   
    //
    //=== Typography ===============
    h1: {
        fontSize: 50,
    },
    h2: {
        fontSize: 40,
    },
    bold: {
        fontWeight: 'bold'
    },
    messageText: {
        color: '#777',
        marginVertical: 20,
        fontSize: 18,
        textAlign: "justify",
    },
    //
    //=== Images ===================
    placeHolderImage: {
        marginBottom: 20,
        width: 250,
        height: 250,
    },
    //
    //=== Forms ====================
    input: {
        width: "90%",
        fontSize: 24,
        borderColor: '#CCC',
        borderWidth: 2,
        marginVertical: 20,            
        padding: 5,   
    },
    
       //wraps buttons for horizontal layout
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
    },
    //
    //=== Standard Button Atom ======
    standardButton: {
        flex: 1,
        width: "90%",
        flexDirection: "row",
        marginHorizontal: 5,
        backgroundColor: '#00529a',
        paddingVertical: 40,
        height: 80,
        marginVertical: 5, 
    
    },  
    buttonText: {
        flex: 1,
        flexDirection: "row",        
        fontSize: 26,        
        color: "white",
        alignSelf: "center",
        textAlign: "center",
    
    },  
    buttonView: {
        
    },
    //
    //=== Error Message Box =======
    errorMessageBox:{
        flexDirection: 'row',
        backgroundColor: '#F88',
        marginVertical: 10,
        width: "90%",
        padding: 20,
        textAlignVertical: 'center',
      },
      errorText:{
        textAlignVertical: 'center',
        marginHorizontal: 20,
        fontSize: 18,
        color: '#222',
      },

});

export default styles;