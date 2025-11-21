import React from 'react';
import logo from '../../assets/logoBranco1.png';

import { Container, LogoImage } from './styles';

const IntroScreen = () => {
    return (
        <Container>
            <LogoImage source={logo} />
        </Container>
    );
}

export default IntroScreen;