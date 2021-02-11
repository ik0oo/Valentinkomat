import styled from 'styled-components';
import image from '../images/valentine.svg';
import loader from '../images/loader.svg';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    max-width: 20%;
  }

  img:first-child {
    margin-bottom: 50px;
  }
`;

export const Loader = () => {
  return (
    <Wrapper>
      <img src={image} alt="Happy Valentine's Day" width="195" height="150" />
      <img src={loader} alt="Loading..." width="300" height="38" />
    </Wrapper>
  );
};
