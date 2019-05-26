import React from 'react';
import { Scene, Router, Stack, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import MainScreen from './components/MainScreen';
import ProfilePage from './components/ProfilePage';
import SplashScreen from './components/SplashScreen';
import BloodRequestPage from './components/BloodRequestPage';
import RequestList from './components/RequestList';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Stack key="splash" initial>
                    <Scene
                        hideNavBar
                        key="splashScreen"
                        component={SplashScreen}
                        statusBarStyle="light-content"
                    />
                </Stack>
                <Stack key="auth" type={ActionConst.RESET}>
                    <Scene
                        navigationBarStyle={{
                            backgroundColor: '#B91E25'
                        }}
                        key="login"
                        component={LoginForm}
                        title="Kullanıcı Girişi"
                        titleStyle={{
                            color: 'white'
                        }}
                        statusBarStyle="light-content"
                    />
                </Stack>
                <Stack key="main" type={ActionConst.RESET} >
                    <Scene
                        navigationBarStyle={{
                            backgroundColor: '#B91E25'
                        }}
                        titleStyle={{
                            color: 'white'
                        }}
                        key="mainScreen"
                        component={MainScreen}
                        title="Acil Kan"
                    />
                    <Scene
                        navigationBarStyle={{
                            backgroundColor: '#B91E25'
                        }}
                        navBarButtonColor='#ffffff'
                        titleStyle={{
                            color: 'white'
                        }}
                        key="profilePage"
                        component={ProfilePage}
                        title="Profil"
                    />
                    <Scene
                        navigationBarStyle={{
                            backgroundColor: '#B91E25'
                        }}
                        navBarButtonColor='#ffffff'
                        titleStyle={{
                            color: 'white'
                        }}
                        key="bloodRequest"
                        component={BloodRequestPage}
                        title="Acil Kan Talep Et"
                    />
                    <Scene
                        navigationBarStyle={{
                            backgroundColor: '#B91E25'
                        }}
                        navBarButtonColor='#ffffff'
                        titleStyle={{
                            color: 'white'
                        }}
                        key="requestList"
                        component={RequestList}
                        title="Bekleyen Talepler"
                    />
                </Stack>
            </Stack>
        </Router>
    );
}

export default RouterComponent;
