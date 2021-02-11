// libs
import { Link } from 'wouter';

// state
import { $valentines } from '../model/bootstrap';

// components
import { Button, Card, Layout } from '../components';

// constants
import { ROUTES } from '../constants';

export const CardsListScreen = () => {
  const valentines = $valentines.getState();

  return (
    <Layout>
      {valentines.map(({ card, content, from }) => (
        <Card isClickable from={from} card={card} content={content} key={card.id + content + from} />
      ))}

      <Link href={ROUTES.EDITOR}>
        <Button type="button">Send new</Button>
      </Link>
    </Layout>
  );
};
