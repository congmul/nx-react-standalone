import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PRODUCT_FEATURE_KEY, productReducer,
  LINTER_SERVICE_FEATURE_KEY, linterServiceReducer,
  EDITOR_FEATURE_KEY, editorReducer,
 } from './app/lib/redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: {
    [EDITOR_FEATURE_KEY]: editorReducer,
    [LINTER_SERVICE_FEATURE_KEY]: linterServiceReducer,
    [PRODUCT_FEATURE_KEY]: productReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
