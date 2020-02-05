import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  //Code for checking the removal of old interceptors
  // state = {
  //   show: true
  // };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }

  render() {
    return (
      <div>
        {/* <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout> */}

        <Layout>
          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
        </Layout>
      </div>
    );
  }
}

export default App;
