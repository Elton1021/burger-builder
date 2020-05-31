import React, { Component } from 'react'
import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
    }

    updatePurchaseState() {
        this.setState((prevState, props) => {
            const ingredients = { ...prevState.ingredients };
            const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, el) => sum + el, 0);
            return { purchasable: sum > 0 }
        })
    }

    addIngredientHandler = type => {
        this.setState((prevState, props) => {
            const updatedIngredients = { ...prevState.ingredients }
            updatedIngredients[type] = prevState.ingredients[type] + 1;
            const newPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
            return { totalPrice: newPrice, ingredients: updatedIngredients }
        });
        this.updatePurchaseState()
    }

    removeIngredientHandler = type => {
        this.setState((prevState, props) => {
            const updatedIngredients = { ...prevState.ingredients }
            if (prevState.ingredients[type] <= 0)
                return;
            updatedIngredients[type] = prevState.ingredients[type] - 1;
            const newPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            return { totalPrice: newPrice, ingredients: updatedIngredients }
        });
        this.updatePurchaseState();
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;
        return (
            <Auxilary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                />
            </Auxilary>
        )
    }
}

export default BurgerBuilder
