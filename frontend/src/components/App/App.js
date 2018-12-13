import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Header from '../Header';
import Product from '../../screens/Product';
import Results from '../../screens/Results';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta name="description" content="La comunidad de compra y venta online más grande de América Latina." />
        </Helmet>
        <Header {...this.props}/>
        <Switch>
          <Route path='/items' exact component={Results} />,
          <Route path='/items/:id' component={Product} />
        </Switch>
      </div>
    );
  }
}

export default App;
