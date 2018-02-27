import ReactDom from "react-dom";
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';

import App from './components/App';

ReactDom.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));