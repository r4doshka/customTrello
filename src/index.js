import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import reducers from './reducers';
import { loadInitialData } from './reducers/actions';

import './styles/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import uuid from 'uuid/v1';
import normalizeData from './data';

const entities = normalizeData();

const data = {
  columnsIds: entities.result,
  columns: entities.entities.columns,
  cards: entities.entities.cards,
  comments: entities.entities.comments,
  users: entities.entities.users,
};


const store = configureStore(reducers);

store.subscribe(() => {
  // persist your state
})

store.dispatch(loadInitialData(data));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
