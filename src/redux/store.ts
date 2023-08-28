// store.js
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import authReducer from './authSlice'; // Import your authSlice reducer
import AsyncStorage from '@react-native-async-storage/async-storage';
import darkModeReducer from './darkModeSlice';

const rootReducer = combineReducers({
  auth: authReducer, // Add other reducers if needed
  darkmode: darkModeReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check
  }),
});

const persistor = persistStore(store); // Persistor to be used in <PersistGate>

export {store, persistor};
