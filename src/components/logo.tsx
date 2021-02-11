// libs
import styled from "styled-components";

// images
import logo from "../images/logo.svg";

const StyledImage = styled.img`
    max-width: 277px;
    width: 100%;
`;
export const Logo = () => <StyledImage src={logo} alt="dataduck ♥ space307" />
