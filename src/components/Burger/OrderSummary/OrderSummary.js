import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class Ordersummary extends Component {
  // This could be a functional componenet, doesn't have to be a class
  componentDidUpdate() {
    console.log('[ordersummary] will update');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
      return (
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
          {this.props.ingredients[key]}
        </li>
      );
    });
    return (
      <>
        <h3>Your Order</h3>
        <p>Delicious burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </>
    );
  }
}
export default Ordersummary;
