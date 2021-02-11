// libs
import { useCallback } from 'react';
import styled from 'styled-components';
import { useLocation } from 'wouter';

// components
import { Button, Card, Layout } from '../components';

// state
import { useState } from 'react';
import { $formData } from '../model/bootstrap';
import { sendData } from '../model/api';

// constants
import { ROUTES } from '../constants';

const Errors = styled.div`
  margin-top: 35px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  color: #ff0000;
`;

export const PreviewScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const formData = $formData.getState();
  const [, setLocation] = useLocation();
  const submitData = useCallback(async () => {
    if (!formData) return;

    const { to, card, content, anonymously } = formData;

    try {
      const res = await sendData({
        to: to.id,
        anonymous: anonymously,
        card_id: card.id,
        content,
      });

      if (res && 'success' in res && res.success) {
        if (res.matched && res.matched.card_id) {
          // @ts-ignore
          window.location = `/valentinkomat/card/${res.matched.card_id}`;
          return;
        }

        setLocation(ROUTES.SUCCESS);
        return;
      }

      if (res && 'message' in res) {
        setError(res.message);
        return;
      }

      setError('Error');
    } catch (e) {
      setError(e);
    }
  }, [formData, setLocation]);

  if (!formData) {
    setLocation(ROUTES.EDITOR);
    return null;
  }
  const { to, card, content } = formData;
  const from = { name: to.name, link: null };

  return (
    <Layout>
      <Card from={from} card={card} content={content} />
      <Button type="button" onClick={submitData}>
        Send
      </Button>

      {error ? <Errors>{error}</Errors> : null}
    </Layout>
  );
};
