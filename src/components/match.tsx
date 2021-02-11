// libs
import { memo } from 'react';
import styled from 'styled-components';

const Highlight = styled.span`
    color: #CA0000;
`;

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 419px;
    background-color: #FBE2FF;
    border-radius: 8px;
    display: flex;
    justify-content: center;

    &:after {
        content: "♥";
        color: #fff;
        position: absolute;
        font-size: 330px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 400px;
        text-align: center;
    }

    @media (min-width: 780px) {
        width: 711px;

        &:after {
            font-size: 500px;
        }
    }
`;

const Content = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    width: 100%;
    align-item: center;

    > * {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 780px) {
        width: 60%;
    }
`;

const Headline = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 99.7%;
    text-align: center;
    color: #000000;

    @media (min-width: 780px) {
        font-size: 56px;
    }
`;

const Text = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 35px;
    line-height: 99.7%;
    text-align: center;
    color: #000000;
    
    @media (min-width: 780px) {
        font-size: 44px;
    }
`;

const Selection = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 38px;
    line-height: 99.7%;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    > div {
        cursor: pointer;
    }

    @media (min-width: 780px) {
        font-size: 44px;
    }
`;

const Yes = styled.div`
    color: #000000;
`;

const No = styled.div`
    color: #CA0000;
`;

export const Match = memo(({ confirm, cancel }: {
    readonly confirm: () => void;
    readonly cancel: () => void;
}) => (
    <Wrapper>
        <Content>
            <Headline>It's a &nbsp;<Highlight>match!</Highlight></Headline>
            <Text>Do you want to reveal yourself?</Text>
            <Selection>
                <No onClick={cancel}>No</No>
                <Yes onClick={confirm}>Yes</Yes>
            </Selection>
        </Content>
    </Wrapper>
));
