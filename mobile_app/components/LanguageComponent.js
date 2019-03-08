import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Alert, Button } from 'react-native';

export default class LanguageComponent extends Component {

    constructor() {
        super();
        this.state = {
        
        }
        this.lang_button = this.lang_button.bind(this);

    }

    lang_button() {
        Alert.alert('Language Options', 'Choose your language of preference', [
                    {text: 'English', onPress: () => console.log('English')},
                    {text: 'Mandarin', onPress: () => console.log('Mardarin')},
                    {text: 'Russian', onPress: () => console.log('Russian')},
                ]);
    }

    render() {
        return (
            <View>
                <Button
                    onPress={() => this.lang_button()}
                    title="Language"
                    color="violet"
                    accessibilityLabel="This is a button" 
                />
            </View>
        )
    }
}