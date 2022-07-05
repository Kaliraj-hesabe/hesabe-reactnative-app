/* eslint-disable */
import React from 'react';
import { TextInput, View, Text } from 'react-native';
/* eslint-enable */
import Input from './Input';

export default class TextValidator extends Input {

  focus() {
    this.refs.textInput.focus();
   }

   getInnerRef = () => this.ref;
    render() {
        /* eslint-disable no-unused-vars */
        const {
            errorMessage,
            validators,
            requiredError,
            underlineColorAndroid,
            errorStyle,
            validatorListener,
            ...rest
        } = this.props;
        let underlineColor = underlineColorAndroid;
        if (!underlineColor) {
            underlineColor = !this.state.isValid ? errorStyle.underlineInvalidColor : errorStyle.underlineValidColor;
        }
        return (
            <View position="relative">
                <TextInput
                    {...rest}
                    underlineColorAndroid={underlineColor}
                    //ref={(r) => { this.input = r; }}
                    ref={'textInput'}

                />
                {this.errorText()}
            </View>
        );
    }

    errorText() {
        const { errorStyle } = this.props;
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <View {...errorStyle.container}>
                <Text style={{...errorStyle.text,...{textAlign: 'left'}}}>{this.getErrorMessage()}</Text>
            </View>
        );
    }
}
