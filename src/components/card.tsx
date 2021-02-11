// libs
import { memo, useMemo } from 'react';
import styled from 'styled-components';

// constants
import { TEXT_AREA_MAX_LEN } from '../constants';

// types
import type { Card as Valentine } from '../model/types';

const MAX_TEXT_FONT_SIZE = 40;
const MIN_TEXT_FONT_SIZE = 22;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  z-index: 1;

  font-style: normal;
  font-weight: bold;
  font-size: 54.9999px;
  line-height: 121.7%;
  text-align: center;
  color: #000000;
`;

const SenderName = styled.span`
  color: #ca0000;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 710px;
  border-radius: 13px;
  overflow: hidden;
  align-self: center;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s ease-in;

  @media (min-width: 780px) {
    flex-direction: row;
    height: 429px;
  }
`;

const Container = styled.div<{ readonly isClickable: boolean }>`
  display: flex;
  align-self: center;
  position: relative;
  width: 80%;

  @media (min-width: 780px) {
    width: auto;
  }

  ${Info} {
    display: none;
  }

  ${({ isClickable }) =>
    isClickable &&
    `
        cursor: pointer;

        &:hover {
            ${Wrapper} {filter: blur(10px);}

            ${Info} {
                display: flex;
            }
        }
    `}
`;

const Image = styled.aside<{ readonly src: string }>`
  width: 100%;
  height: 429px;
  background: url(${({ src }) => src});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  @media (min-width: 780px) {
    width: 304px;
    margin: 0;
  }
`;

const Message = styled.aside<{ readonly fontSize: number }>`
  background-color: #fbe2ff;
  padding: 16px 12px;
  height: 100%;

  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.2;
  color: #000000;

  width: 100%;

  @media (min-width: 780px) {
    width: 407px;
    padding: 48px 42px;
    font-size: ${({ fontSize }) => fontSize}px;
  }
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  word-break: break-word;
  overflow: unset;

  @media (min-width: 780px) {
    overflow: auto;
  }
`;

export const Card = memo(
  ({ isClickable = false, from, content, card }: { readonly isClickable?: boolean } & Omit<Valentine, 'matched'>) => {
    const step = useMemo(() => TEXT_AREA_MAX_LEN / (MAX_TEXT_FONT_SIZE - MIN_TEXT_FONT_SIZE), []);
    const offset = useMemo(() => Math.floor(content.length / step), [content, step]);
    const fontSize = useMemo(() => MAX_TEXT_FONT_SIZE - offset, [offset]);
    const name = from ? from.name : 'anonymous';

    return (
      <Container isClickable={isClickable}>
        <Info>
          from&nbsp;<SenderName>{name}</SenderName>
        </Info>

        <Wrapper>
          <Image src={card.src} />
          <Message fontSize={fontSize}>
            <Text>{content}</Text>
          </Message>
        </Wrapper>
      </Container>
    );
  },
);
