// libs
import styled from 'styled-components';

// images
import valentine from '../images/valentine.svg';

const StyledImage = styled.img`
  width: 100%;
`;

export const Valentine = () => <StyledImage src={valentine} alt="Happy Valintine's day!" />;
