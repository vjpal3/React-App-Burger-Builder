import React, { Component } from 'react';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('https://react-burger-app-vp.firebaseio.com/orders/ingredients.json')
      .then(res => {
        console.log(res.data);
        this.setState({
          ingredients: res.data
        });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // recalculate it on the server in real app
      customer: {
        name: 'Vrishali Pal',
        address: {
          street: 'TestStreet 1',
          zipCode: '01234',
          country: 'USA',
          email: 'test@test.com'
        },
        deliveryMethod: 'fastest'
      }
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
