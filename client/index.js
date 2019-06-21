import React from 'react';
import {render} from 'react-dom';
import { Switch, Route, browserHistory } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Root from '../app/components/Root'

import HomePage from '../app/components/pages/HomePage'

function onRouterUpdate () {
  console.log('router updated!')
}

render((
  <BrowserRouter history={browserHistory} onUpdate={onRouterUpdate}>
    <Root>
      <Route path='/' component={HomePage} />
    </Root>
  </BrowserRouter>
), document.getElementById('app'));