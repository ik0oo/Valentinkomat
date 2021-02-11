// libs
import { Link } from 'wouter';
import styled from 'styled-components';

// components
import { LargeButton, Logo, Valentine } from '../components';
import { CardsListScreen } from './cards_list';

// state
import { $valentines } from '../model/bootstrap';

// constants
import { ROUTES } from '../constants'

const Layout = styled.main`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 75%;
    min-height: 100%;

    > * {
        flex: 1;
        display: flex;
        padding: 20px 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    > div {
        justify-content: flex-start;
    }
    
    > footer {
        justify-content: flex-end;
    }

    @media (min-width: 480px) {
        width: 55%;
    }

    @media (min-width: 960px) {
        width: 45%;
    }

    @media (min-width: 1280px) {
        width: 35%;
    }
`;

export const HomeScreen = () => {
    const valentines = $valentines.getState();

    return valentines.length > 0
        ? (
            <CardsListScreen />
        ) : (
            <Layout>
                <Wrapper>
                    <header>
                        <Valentine />
                    </header>
                    <div>
                        <Link href={ROUTES.EDITOR}>
                            <LargeButton type="button">Send Valentine</LargeButton>
                        </Link>
                    </div>
                    <footer>
                        <Logo />
                    </footer>
                </Wrapper>
            </Layout>
        );
}
