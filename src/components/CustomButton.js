// custom-button.js

import React from 'react';
import { TouchableOpacity, StyleSheet, Text,Image } from 'react-native';
import IonicIcons from 'react-native-vector-icons/Ionicons';
const GLOBAL = require('../utils/Globals');

export const CustomButton = (props) => {
    const { title = 'Enter', style = {}, textStyle = {},imgStyle = {}, source = {} ,onPress,imagename = '',imageColorname = '',imagedisplay = 'none'} = props;
     //<IonicIcons name  = {props.imagename} style={[styles.image, imgStyle]} size = {20} color= {props.imageColorname}/>
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
         <Image
         source={source}
         style={imgStyle}
         />
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    button: {
        display: 'flex',
      //  height: 50,
        width : 185,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GLOBAL.COLOR.ORANGE,
        paddingVertical :8,
    },

    text: {
        fontSize: 20,
        //textTransform: 'uppercase',
        color: GLOBAL.COLOR.WHITE,
        fontFamily : 'Prompt-SemiBold'
    },
   image: {
   width: 20,
   height: 20,
   position: 'absolute',
   marginLeft : 15,
   left: 5, // Keep some space between your left border and Image
   },
});
