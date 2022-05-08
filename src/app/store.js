import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,      // doing this will connect our store with the api that we have created. The no. of api's we are using, the number of times we have to connect that api's reducer with our created store.
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});