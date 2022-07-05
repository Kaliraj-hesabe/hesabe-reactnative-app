import React from 'react';
import { StyleSheet, TouchableOpacity, View,ImageBackground ,Image,Text} from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { TabBg } from '../svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};



export const TabBarAdvancedButton: React.FC<Props> = ({
  bgColor,
  ...props

}) => (

  <View
    style={styles.container}
    pointerEvents="box-none"
  >
  <TabBg
      color={bgColor}
      style={styles.background}
    />

    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
    >

      <MaterialCommunityIcons
        name="plus"
        style={styles.buttonIcon}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
    top: -33.5,  //new for android
    height : 80  //new for android
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    //top: -32.5, // old code
    top: 5,  //new for android
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#E94F37',

  },
  buttonIcon: {
    fontSize:RFValue(25),
    color: '#F6F7EB',
  }
});
