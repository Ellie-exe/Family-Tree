import React from 'react';
import TreeEditor from "./tree-editor/TreeEditor";
import { Route, Switch } from "react-router-dom";

const App = () => {

    return (
        <Switch>
            <Route path='/'>
                <TreeEditor/>
            </Route>
        </Switch>
    );
}

export default App;
