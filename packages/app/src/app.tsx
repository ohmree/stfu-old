import {lazy} from 'solid-js';
import {Routes, Route} from 'solid-app-router';

import type {Component} from 'solid-js';

const Home = lazy(async () => import('./pages/home'));
const Login = lazy(async () => import('./pages/login'));

const App: Component = () => (
  <>
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Routes>
  </>
);

export default App;
