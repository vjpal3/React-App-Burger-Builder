import React, { Component } from 'react';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  updatePurchaseState() {
    const ingredients = this.state.ingredients;
    const sum = Object.keys(ingredients).reduce((sum, key) => {
      return (sum += ingredients[key]);
    }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    this.setState(prevState => {
      const updatedIngredients = { ...prevState.ingredients };
      updatedIngredients[type] = updatedIngredients[type] + 1;
      return {
        ingredients: updatedIngredients,
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      };
    }, this.updatePurchaseState);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) return;

    this.setState(prevState => {
      const updatedIngredients = { ...prevState.ingredients };
      updatedIngredients[type] = updatedIngredients[type] - 1;
      return {
        ingredients: updatedIngredients,
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
      };
    }, this.updatePurchaseState);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
