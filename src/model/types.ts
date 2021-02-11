export type Image = {
  readonly id: number;
  readonly src: string;
  readonly title: string;
};

export type Images = readonly {
  readonly id: number;
  readonly meta: Image;
}[];

export type User = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly avatar: string;
};

export type From = { readonly name: string; readonly link: string | null };

export type Card = {
  readonly card: Image;
  readonly content: string;
  readonly from: From | null;
  readonly matched: number;
};

export type Data = {
  card: Image;
  content: Card['content'];
  to: Pick<User, 'name' | 'id'>;
  readonly anonymously: number;
};
