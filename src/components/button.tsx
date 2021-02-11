// libs
import styled from 'styled-components';

export const LargeButton = styled.button`
  background-color: #ca0000;
  border-radius: 9px;
  border: none;
  color: #fff;
  font-size: 2em;
  max-width: 517px;
  min-width: 80%;
  height: 2.5em;
  align-self: center;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fbe2ff;
    color: #000;
  }

  @media (min-width: 960px) {
    border-radius: 12px;
  }
`;

export const Button = styled.button`
  background-color: #ca0000;
  border-radius: 9px;
  border: none;
  font-weight: bold;
  color: #fff;
  font-size: 24px;
  width: 300px;
  height: 70px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fbe2ff;
    color: #000;
  }

  &:disabled {
    background: #eee;
    cursor: not-allowed;
  }
`;

export const ButtonTransparent = styled(Button)`
  background-color: #fff;
  border: 1px solid #ca0000;
  color: #ca0000;
`;
