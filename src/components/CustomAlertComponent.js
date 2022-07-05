// custom-button.js

import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const GLOBAL = require('../utils/Globals');
import {DarkModeContext} from 'react-native-dark-mode';

export default class CustomAlertComponent extends React.Component {

  onNegativeButtonPress = () => {
    this.props.onPressNegativeButton();
  };

  onPositiveButtonPress = () => {
    this.props.onPressPositiveButton();
  };

  static contextType = DarkModeContext;

  render() {
     const isDarkMode = this.context === 'dark';
    return (
      <Modal
        visible={this.props.displayAlert}
        transparent={true}
        animationType={"fade"}>
        <View style={[styles.mainOuterComponent]}>
          <View style={[styles.mainContainer,{backgroundColor : isDarkMode ? GLOBAL.COLOR.BLACK : GLOBAL.COLOR.WHITE}]}>
            {/* First ROw - Alert Icon and Title */}
            <View style={styles.topPart}>
              {
                this.props.displayAlertIcon
                &&
                <Image
                  source={require('../screens/pages/Assest/calendarGray.png')}
                  resizeMode={'contain'}
                  style={styles.alertIconStyle}
                />
              }
              <Text style={[styles.alertTitleTextStyle,{color : isDarkMode ? GLOBAL.COLOR.WHITE : GLOBAL.COLOR.DARKBLUE,height : 80,marginTop : 40}]}>
                {`${this.props.alertTitleText}`}
              </Text>
            </View>
            {/* Second Row - Alert Message Text */}
            <View style={styles.middlePart}>
              <Text style={styles.alertMessageTextStyle}>
                {`${this.props.alertMessageText}`}
              </Text>
            </View>
            {/* Third Row - Positive and Negative Button */}
            <View style={styles.bottomPart}>
              {
                this.props.displayPositiveButton
                &&
                <TouchableOpacity
                  onPress={this.onPositiveButtonPress}
                  style={styles.alertMessageButtonStyle} >
                  <Text style={styles.alertMessageButtonTextStyle}>{this.props.positiveButtonText}</Text>
                </TouchableOpacity>
              }
              {
                this.props.displayNegativeButton
                &&
                <TouchableOpacity
                  onPress={this.onNegativeButtonPress}
                  style={styles.alertMessage2ButtonStyle}>
                  <Text style={styles.alertMessage2ButtonTextStyle}>{this.props.negativeButtonText}</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

CustomAlertComponent.propTypes = {
  displayAlert: PropTypes.bool,
  displayAlertIcon: PropTypes.bool,
  alertTitleText: PropTypes.string,
  alertMessageText: PropTypes.string,
  displayPositiveButton: PropTypes.bool,
  positiveButtonText: PropTypes.string,
  displayNegativeButton: PropTypes.bool,
  negativeButtonText: PropTypes.string,
  onPressPositiveButton : PropTypes.func,
  onPressNegativeButton : PropTypes.func,
}

// export default CustomAlertComponent;

const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  mainContainer: {
    flexDirection: 'column',
    height: '40%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.WHITE,
    // borderWidth: 2,
    // borderColor: '#FF0000',
    borderRadius: 10,
    padding: 4,
  },
  topPart: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#00FF00',
    paddingHorizontal: 2,
    paddingVertical: 4
  },
  middlePart: {
    flex: 1,
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#FF6600',
    padding: 4,
    color: '#FFFFFF',
    fontSize: RFValue(16),
    marginVertical: 2,
    marginTop : 20
  },
  bottomPart: {
    //flex: 1,
    width: '100%',
    height : '50%',
    // borderWidth: 1,
    // borderColor: '#0066FF',
    flexDirection: 'column',
    padding: 4,
    justifyContent: 'center',
    alignItems : 'center'
  },
  alertIconStyle: {
    // borderWidth: 1,
    // borderColor: '#cc00cc',
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: 'center',
    color: GLOBAL.COLOR.DARKBLUE,
    fontSize: RFValue(17),
    fontFamily: 'Prompt-SemiBold',
    // borderWidth: 1,
    // borderColor: '#660066',
    padding: 2,
    marginHorizontal: 2
  },
  alertMessageTextStyle: {
    color: GLOBAL.COLOR.DARKGRAY,
    textAlign: 'center',
    fontSize: RFValue(15),
    fontFamily: 'Prompt-Regular',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  alertMessageButtonStyle: {
    width: '70%',
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 25,
    height : '35%',
    backgroundColor: GLOBAL.COLOR.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMessage2ButtonStyle: {
    width: '70%',
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 10,
    height : '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMessageButtonTextStyle: {
    fontSize: RFValue(20),
    fontFamily: 'Prompt-SemiBold',
    color: '#FFFFFF'
  },
  alertMessage2ButtonTextStyle: {
    fontSize: RFValue(15),
    fontFamily: 'Prompt-Regular',
    color: GLOBAL.COLOR.ORANGE
  },

});
