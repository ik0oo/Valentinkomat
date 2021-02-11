// libs
import styled from 'styled-components'
import { Link } from 'wouter';

// components
import { Valentine } from './valentine';
import { Logo } from './logo';

// constants
import { ROUTES } from '../constants'

// types
import type { ReactNode } from "react";

const Wrapper = styled.main`
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > header {
        width: 253px;
        margin-bottom: 50px;
    }
`;

const Container = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 75px;
`;

export const Layout = ({ children }: { readonly children: ReactNode }) => (
    <Wrapper>
        <Link href={ROUTES.HOME}>
            <header>
                <Valentine/>
            </header>
        </Link>
        <Container>
            {children}
        </Container>
        <footer><Logo/></footer>
    </Wrapper>
);
