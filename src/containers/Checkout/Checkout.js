import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
  // Since this code is synchronous, it can be placed inside
  //the initialization area. It saves an unnecessary render, instead of using componentWillMount, which is depricated.
  initState = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingredientsInit = {};
    let priceInit = 0;

    for (let param of query.entries()) {
      //['salad', '1']
      if (param[0] === 'price') {
        priceInit = +param[1];
      } else {
        ingredientsInit[param[0]] = +param[1];
      }
    }
    return {
      ingredients: ingredientsInit,
      totalPrice: priceInit
    };
  };

  state = this.initState();

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
