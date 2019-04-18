import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import AddNotification from './addNotification.js';
import NotificationList from './NotificationList.js';
import Report from './Report.js';

export default class RoutePath extends Component{
    render(){
        return(
            <BrowserRouter>
                    <Switch>
                        <Route path="/AddNotification" component={AddNotification} > </Route>
                        <Route path="/NotificationList" component={NotificationList} > </Route>
                        <Route path="/Report" component={Report} > </Route>
                    </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <RoutePath />
    , document.getElementById('root')
);