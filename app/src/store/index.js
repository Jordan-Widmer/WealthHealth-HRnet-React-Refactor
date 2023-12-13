import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeeDataSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Defining redux-persist configuration
const persistConfig = {
  key: "root",
  storage,
};

/**
 * Redux store setup with persisted reducer.
 * @type {import("@reduxjs/toolkit").EnhancedStore}
 */
const store = configureStore({
  reducer: persistReducer(persistConfig, employeesReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PERSIST", "persist/PURGE", "persist/REGISTER"],
      },
    }),
});

// Instantiating the persistor for the store
/**
 * Redux persistor for the store.
 * @type {import("redux-persist").Persistor}
 */
const persistor = persistStore(store);

// Exporting store and persistor
export { store, persistor };
