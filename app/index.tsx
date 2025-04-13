import { GestureHandlerRootView } from 'react-native-gesture-handler';

import App from './Screen/App';

const Index = () => {
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <App /> 
    </GestureHandlerRootView>
  );
};

export default Index;
