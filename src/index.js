import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { loadState, saveState } from './localStorage';
import reducers from './reducers';
import { loadInitialData } from './reducers/actions';
import throttle from 'lodash/throttle';
import './styles/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import normalizeData from './data';

const persistedState = loadState();
const entities = normalizeData(persistedState);

//console.log('persisted', entities, persistedState);

const data = {
  columnsIds: entities.columnsIds,
  columns: entities.columns,
  cards: entities.cards,
  comments: entities.comments,
  users: entities.users,
  currentUser: entities.currentUser ,
};


const store = configureStore(reducers, persistedState);

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);

store.dispatch(loadInitialData(data));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
