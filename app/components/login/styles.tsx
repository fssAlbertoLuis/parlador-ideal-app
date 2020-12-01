import styled from 'styled-components/native';

const Logo = styled.Image`
height: 150px;
width: 150px;
`;

const Title = styled.Text`
font-size: 20px;
color: ${({theme}) => theme.colors.primary.alternative};
`;

const RegisterText = styled.Text`
color: ${({theme}) => theme.colors.primary.alternative};
margin-top: 4px;
font-size: 18px;
`;

export {Logo, Title, RegisterText};
