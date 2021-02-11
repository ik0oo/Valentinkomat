// libs
import { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'wouter';

// components
import { Button, Layout, Form } from '../components';

// constants
import { ROUTES, TEXT_AREA_MAX_LEN } from '../constants';

// state
import { $images, setData } from '../model/bootstrap';

// types
import type { SyntheticEvent } from 'react';
import type { Data, Image } from '../model/types';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  @media (min-width: 780px) {
    flex-direction: row;
  }
`;

const SliderComponent = styled.aside`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-self: center;
  text-align: center;
  overflow: hidden;
  margin-bottom: 50px;

  @media (min-width: 780px) {
    width: 304px;
    margin-right: 25px;
    margin-bottom: auto;
  }
`;

const Slides = styled.div`
  display: flex;
  margin-bottom: 15px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  > div {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 304px;
    height: 429px;
    margin-right: 50px;
    border-radius: 10px;
    background: #eee;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }

  img {
    width: 100%;
  }

  > .active {
    background: red;
  }
`;

const SliderCommon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Nav = styled.div`
  a {
    display: inline-flex;
    width: 7px;
    height: 7px;
    background: #c4c4c4;
    border-radius: 100%;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    position: relative;
  }

  a:first-child {
    margin-left: 0;
  }

  a:active {
    top: 1px;
  }

  a:focus {
    background: #000;
  }

  a.active {
    background: #ec0303;
  }
`;

const Caption = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 76.7%;
  text-align: right;
  color: #000000;
`;

const Errors = styled.div`
  margin-top: 35px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  color: #ff0000;
`;

const Slider = ({
  caption,
  list,
  selected,
}: {
  readonly caption: string;
  readonly list: readonly Image[];
  readonly selected: number;
}) => (
  <SliderComponent>
    <Slides className="slides">
      {list.map(({ id, src, title }) => (
        <div id={`slide-${id}`} key={id}>
          <img src={src} alt={title} width="530" height="750" />
        </div>
      ))}
    </Slides>

    <SliderCommon>
      <Nav>
        {list.map(({ id }) => (
          <a href={`#slide-${id}`} className={`slide ${id === selected ? 'active' : ''}`} key={id} />
        ))}
      </Nav>
      <Caption>“{caption}”</Caption>
    </SliderCommon>
  </SliderComponent>
);

export const EditorScreen = () => {
  const images = $images.getState();
  const [error, setError] = useState<string | null>(null);
  const [isTextTooLong, setTextAreaError] = useState(false);
  const [selectedImageIndex, setCurrentSlideIndex] = useState(0);
  const selectedImage = useMemo(() => images[selectedImageIndex], [selectedImageIndex, images]);
  const onChangeLength = useCallback((textLength) => setTextAreaError(textLength > TEXT_AREA_MAX_LEN), [
    setTextAreaError,
  ]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    let timer: number;
    const slidesAmount = document.querySelectorAll('.slide').length;
    const slides = document.querySelector('.slides');
    const listener = (e: Event) => {
      clearTimeout(timer);
      // @ts-ignore
      timer = setTimeout(() => {
        try {
          // @ts-ignore
          const selected = Math.floor(e.target.scrollLeft / (e.target.scrollWidth / slidesAmount));
          setCurrentSlideIndex(selected);
        } catch (e) {}
      }, 100);
    };
    // @ts-ignore
    slides.addEventListener('scroll', listener);

    return () => {
      try {
        // @ts-ignore
        slides.removeEventListener('scroll', listener);
      } catch (e) {}
    };
  }, [setCurrentSlideIndex, selectedImageIndex]);

  const onSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { target } = e;
        // @ts-ignore
        const { userId, userName, text, isAnonymous } = target || {
          userId: {},
          userName: {},
          text: {},
          isAnonymous: {},
        };

        if (!userId.value || !userName.value) {
          setError('Choose user');
          return;
        }

        if (text.value.length === 0) {
          setError('Input message');
          return;
        }

        if (text.value.length > TEXT_AREA_MAX_LEN) {
          setError('Message is too long');
          return;
        }

        const formValues = ({
          to: {
            id: Number(userId.value),
            name: userName.value,
          },
          content: text.value,
          card: selectedImage,
          anonymously: isAnonymous.checked,
        } as unknown) as Data;

        setData(formValues);
        setLocation(ROUTES.PREVIEW);
      } catch (e) {}
    },
    [selectedImage, setLocation],
  );

  return (
    <Layout>
      <Wrapper>
        <Slider caption={selectedImage.title} selected={selectedImage.id} list={images} />
        <Form onSubmit={onSubmit} onChangeLength={onChangeLength} hasError={isTextTooLong} />
      </Wrapper>

      <Button type="submit" form="editor-form" disabled={isTextTooLong}>
        Preview
      </Button>

      <Errors>{error ? <div>{error}</div> : null}</Errors>
    </Layout>
  );
};
