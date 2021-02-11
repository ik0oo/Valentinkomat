// libs
import styled from 'styled-components';
import { Link } from 'wouter';

// components
import { Button, Layout } from '../components';

// constants
import { ROUTES } from '../constants';

const Wrapper = styled.section`
  font-style: normal;
  font-weight: bold;
  font-size: 3.6em;
  line-height: 119.7%;
  text-align: center;
  color: #6f6f6f;
  margin-bottom: 2em;

  @media (min-width: 360px) {
    margin-bottom: 3em;
  }
`;

export const SuccessScreen = () => (
  <Layout>
    <Wrapper>
      <div>Success!</div>
      <div>Your valentine has been sent</div>
    </Wrapper>
    <Link href={ROUTES.EDITOR}>
      <Button type="button">Send more</Button>
    </Link>
  </Layout>
);
