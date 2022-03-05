import { Route, Switch } from 'react-router-dom';
import { Catalog } from '../../pages/catalog';
import { Details } from '../../pages/details';
import { Home } from '../../pages/home';

const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/:category/search/:keyword" component={Catalog} />
    <Route path="/:category/:id" component={Details} />
    <Route path="/:category" component={Catalog} />
    <Route path="/" component={Home} exact />
  </Switch>
);

export default Routes;
