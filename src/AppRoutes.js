import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SearchPage from './pages/search';
import DetailsPage from './pages/details';
import { PropertiesProvider } from './store/propertyContext';

export default function Routes() {
    return <PropertiesProvider>
        <Router>
            <Switch>
                <Route exact path='/' component={SearchPage} />
                <Route path='/details/:property_id' component={DetailsPage} />

                <Redirect to="/" />
            </Switch>
        </Router>
    </PropertiesProvider>
}