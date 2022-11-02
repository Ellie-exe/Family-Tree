import React from 'react';
import Feed from './feed/Feed.js';
import Login from "./login/Login";
import { Switch, Route } from 'react-router-dom';

const App = () => {

    return (
        <Switch>
            <Route path='/login' exact>
                <Login/>
            </Route>
            <Route path='/feed' exact>
                <Feed/>
            </Route>
        </Switch>
    );
}

export default App;
