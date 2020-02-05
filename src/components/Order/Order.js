import React from 'react';
import classes from './Order.module.css';

const order = props => {
  const ingredients = [];

  for (let igName in props.ingredients) {
    ingredients.push({
      name: igName,
      quantity: props.ingredients[igName]
    });
  }

  const ingredientOutput = ingredients.map(ingredient => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={ingredient.name}
      >
        {ingredient.name} ({ingredient.quantity})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredientOutput}{' '}
      </p>
      <p>
        Price: <strong>USD: {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
