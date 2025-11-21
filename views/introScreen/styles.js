import styled from 'styled-components/native';
import { colors } from '../../src/components/styles/colors';
    
export const Container = styled.View`
    flex: 1;
    background-color: ${colors.blue}; 
    align-items: center;
    justify-content: center;
`;

export const LogoImage = styled.Image`
    width: 200px;
    height: 200px;
    resize-mode: contain;
`;