import React from 'react';

const ordersummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
        {props.ingredients[key]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>Delicious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </>
  );
};

export default ordersummary;
