// libs
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';

// components
import { Loader } from './components/loader';
import { Router } from './Router';

// state
import { isAppInit } from './model/bootstrap';

export const App = () => {
  const [location] = useLocation();
  const [isAppReady, setReadiness] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        const [id] = location.match(/\d+$/) || [null];
        const status = await isAppInit({ id });
        if (typeof status === 'boolean') {
          setReadiness(status);
        }
      } catch (e) {}
    })();
  }, [setReadiness, location]);

  return isAppReady ? <Router /> : <Loader />;
};
