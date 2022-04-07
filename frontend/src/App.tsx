import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { PageReactQuery } from './components/PageReactQuery';
import { PageZustand } from './components/PageZustand';
import { PageJotai } from './components/PageJotai';
import { Link } from 'react-router-dom';
import { Provider } from 'jotai';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router>
          <div className="App">
            <div className="App-content">
              <span>
                <Link to={'/query/'}>React Query</Link> | <Link to={'/zustand/'}>Zustand</Link> | <Link to={'/jotai/'}>Jotai</Link>
              </span>
              <MainSwitch />
            </div>
          </div >
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

function MainSwitch() {
  return (
    <Switch>
      <Route path='/zustand/'>
        <PageZustand />
      </Route>

      <Route path='/query/'>
        <PageReactQuery />
      </Route>

      <Route path='/jotai/'>
        <PageJotai />
      </Route>

      <Route path='/'>
        <PageReactQuery />
      </Route>

    </Switch>)
}

export default App;