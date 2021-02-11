import { Route, Switch } from 'wouter';
import { EditorScreen, HomeScreen, PreviewScreen, SuccessScreen, NewCardScreen } from './screens';

// constants
import { ROUTES } from './constants';

import './App.css';

export const Router = () => {
  return (
      <Switch>
          <Route path={ROUTES.PREVIEW}>
              <PreviewScreen />
          </Route>

          <Route path={ROUTES.EDITOR}>
              <EditorScreen />
          </Route>

          <Route path={ROUTES.SUCCESS}>
              <SuccessScreen />
          </Route>

          <Route path={ROUTES.NEW}>
              <NewCardScreen />
          </Route>

          <Route path={ROUTES.HOME}>
              <HomeScreen />
          </Route>

          <Route path="/:rest*">
              <HomeScreen />
          </Route>
      </Switch>
  );
}
