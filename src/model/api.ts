// import list from '../__fixtures__/list.json';
// import card from '../__fixtures__/card.json';
// import images from '../__fixtures__/images.json';
// import suggestions from '../__fixtures__/suggestions.json';

import { createEffect } from 'effector';
import { Card } from './types';

export const END_POINTS = {
  LIST: '/api/valentinkomat/list',
  IMAGES: '/api/valentinkomat/values',
  GET: '/api/valentinkomat/get',
  SEND: '/api/valentinkomat/send',
  SUGGESTION: '/api/user-suggest',
};

export const getSuggestions = async ({ data }: { readonly data: string }) => {
  const req = await fetch(`${END_POINTS.SUGGESTION}?q=${data}`);
  const res = await req.json();
  return res.data;

  // return Promise.resolve(suggestions.data);
};

const getList = async (): Promise<readonly Card[]> => {
  const req = await fetch(END_POINTS.LIST);
  const res = await req.json();
  return res.data;

  // return new Promise((res) => {
  //   setTimeout(() => {
  //     res(list.data);
  //   }, 5000);
  // });
  //
  // return Promise.resolve(list);
};

const getCard = async ({ id }: { readonly id: string }) => {
  const req = await fetch(`${END_POINTS.GET}?id=${id}`);
  const res = await req.json();
  return res.data;

  // return Promise.resolve(card);
};

const getImages = async () => {
  const req = await fetch(END_POINTS.IMAGES);
  const res = await req.json();
  return res.cards;

  // return Promise.resolve(images.cards);
};

type Success = {
  readonly success: boolean;
  readonly matched: {
    readonly name: string;
    readonly card_id: number;
  };
};

type Error = {
  readonly message: string;
};

export const sendData = async ({
  to,
  content,
  card_id,
  anonymous,
}: {
  readonly to: number;
  readonly content: string;
  readonly card_id: number;
  readonly anonymous: number;
}): Promise<Success | Error> => {
  const body = new FormData();
  const easteregg = localStorage.getItem('69');

  body.append('to', String(to));
  body.append('content', String(content));
  body.append('card_id', String(easteregg || card_id));
  body.append('anonymous', String(Number(anonymous)));
  //
  // return Promise.resolve({
  //   success: true,
  //   matched: {
  //     name: 'ekk',
  //     card_id: 123,
  //   },
  // });

  const req = await fetch(END_POINTS.SEND, {
    method: 'POST',
    body,
  });

  const res = await req.json();

  return res;
};

export const getDataFx = createEffect(async ({ id }: { readonly id: string | null }) => {
  return Promise.all([getList(), getImages(), id ? getCard({ id }) : Promise.resolve(null)]);
});
