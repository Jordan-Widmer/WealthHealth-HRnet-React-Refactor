import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

// Defining redux-persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Persisting the employees reducer
const persistedReducer = persistReducer(persistConfig, employeesReducer);

// Store setup with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PERSIST', 'persist/PURGE', 'persist/REGISTER'],
      },
    }),
});

// Instantiating the persistor for the store
const persistor = persistStore(store);

// Exporting store and persistor
export { store, persistor };
