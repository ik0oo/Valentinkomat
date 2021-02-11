// libs
import styled from 'styled-components';
import { useLocation } from 'wouter';

// state
import { $newCard } from '../model/bootstrap';

// components
import { Button, ButtonTransparent, Card, Layout } from '../components';

// constants
import { ROUTES } from '../constants';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 121.7%;
  text-align: center;
  color: #000000;
  // width: 300px;
  margin-bottom: 20px;
`;

const Match = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 99.7%;
  text-align: center;
  color: #000000;
  margin-bottom: 50px;

  @media (min-width: 780px) {
    font-size: 56px;
  }
`;

const Highlight = styled.span`
  color: #ca0000;
`;

const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: row;

  > button:first-child {
    margin-right: 14px;
  }
`;

export const NewCardScreen = () => {
  const [, setLocation] = useLocation();
  const newCard = $newCard.getState();

  if (!newCard) {
    setLocation(ROUTES.HOME);
    return null;
  }

  const { from, card, content, matched } = newCard;
  const isItMatch = matched === 1;
  const name = from ? from.name : 'anonymous';

  return (
    <Layout>
      <Wrapper>
        <Header>
          Hi! You have a new valentine from <Highlight>{name}</Highlight>
        </Header>

        {isItMatch ? (
          <Match>
            It's a &nbsp;<Highlight>match!</Highlight>
          </Match>
        ) : null}

        <Card content={content} card={card} from={from} />
        <ButtonsBlock>
          {/*{isItMatch ? (*/}
          {/*  <>*/}
          {/*    <Button type="button">also send to o.lang</Button>*/}
          {/*    <ButtonTransparent type="button">send new</ButtonTransparent>*/}
          {/*  </>*/}
          {/*) : (*/}
          <Button type="button">send new</Button>
          {/*)}*/}
        </ButtonsBlock>
      </Wrapper>
    </Layout>
  );
};
