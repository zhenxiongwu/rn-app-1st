/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import Home from './home';

export default class app extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    name: 'home',
                    component: Home
                }}
                configureScene={
                    (route) => Navigator.SceneConfigs.FloatFromBottom
                }
                renderScene={
                    (route, navigator)=>{
                        const Component = route.component;
                        return <Component {...route.params} navigator={navigator}/>
                    }
                }
            />
        );
    }
}

