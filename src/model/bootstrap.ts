// libs
import { createApi, createStore, combine } from 'effector';

// types
import { Data, Card, Image } from './types';

// api
import { getDataFx } from './api';

export const $valentines = createStore<readonly Card[]>([]).on(getDataFx.done, (_, { result: [list] }) => list);
export const $images = createStore<readonly Image[]>([]).on(getDataFx.done, (_, { result: [, images] }) => images);
export const $newCard = createStore<Card | null>(null).on(getDataFx.done, (_, { result: [, , card] }) => card);

const $status = combine($valentines, $images, $newCard, getDataFx.pending, (v, i, c, isLoading) =>
  isLoading ? false : true,
);

export const $formData = createStore<Data | null>(null);

export const { setData } = createApi($formData, {
  setData: (state, payload: Data) => (payload ? { ...state, ...payload } : state),
});

export const isAppInit = ({ id }: { readonly id: string | null }) =>
  new Promise((res) => {
    getDataFx({ id });

    $status.watch((status) => {
      if (status) {
        res(true);
      }
    });

    setTimeout(() => {
      res(false);
    }, 5000);
  });
