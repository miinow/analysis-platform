import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import RouterNav from './pages/RouterNav';
import Login from './pages/Login';
import history from './utils/history';
import { basePath } from './config';
import HeatMapTable from './components/HeatMapTable';

class ContentRouter extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router basename="/" history={history}>
                    <div id="router">
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/heatmap" component={HeatMapTable} />
                            <Route path={basePath} component={RouterNav} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default ContentRouter;
