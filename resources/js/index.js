import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import AddNotification from './addNotification.js';
import NotificationList from './NotificationList.js';
import Report from './Report.js';

const routing = (
    <Router>
            <div>
                <Route path="/AddNotification" component={AddNotification} > </Route>
                <Route path="/NotificationList" component={NotificationList} > </Route>
                <Route path="/Report" component={Report}> </Route>
            </div>
    </Router>
); 

ReactDOM.render(routing, document.getElementById('root'));
//ReactDOM.render(<AddNotification />, document.getElementById('root'));