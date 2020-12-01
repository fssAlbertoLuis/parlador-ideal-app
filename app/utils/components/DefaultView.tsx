import styled from 'styled-components/native';

export default styled.View<{flex?: number}>`
  width: 100%;
  padding: 10px;
  ${props => props.flex ? `flex: ${props.flex};` : ''}
`;
