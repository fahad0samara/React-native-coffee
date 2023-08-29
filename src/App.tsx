import React from 'react';
import {Provider} from 'react-redux';

import {store, persistor} from './redux/store';

import StackNavigation from './navigation/StackNavigation';

import {PersistGate} from 'redux-persist/integration/react';


const App = () => {
  return (
    
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        <StackNavigation />



      </PersistGate>
    </Provider>
  );
};

export default App;
