import React from 'react';
import {Provider} from 'react-redux';

import {store, persistor} from './redux/store';

import StackNavigation from './navigation/StackNavigation';

import {PersistGate} from 'redux-persist/integration/react';
import ThemedApp from './hooks/ThemeProvider';

const App = () => {
  return (
    
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
         <ThemedApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
