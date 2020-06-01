import React, { Component } from 'react'
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrder from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        axiosOrder.get('/ingredients.json')
            .then(response => this.setState({ ingredients: response.data }))
            .catch(err => console.log);
    }

    updatePurchaseState() {
        this.setState((prevState, props) => {
            const ingredients = { ...prevState.ingredients };
            const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, el) => sum + el, 0);
            return { purchasable: sum > 0 }
        })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
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

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You continued!!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Elton Andrew',
                address: {
                    street: 'This Street',
                    zipCode: '182942',
                    country: 'India',
                },
                email: 'eltonandrew@airpay.co.in',
                deliveryMethod: 'fastest',
            }
        }
        axiosOrder.post('/orders.json', order)
            .then(result => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => this.setState({ loading: false, purchasing: false }));
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        let orderSummary = null;

        let burger = <Spinner />
        if (this.state.ingredients) {
            orderSummary = (<OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
            />);

            burger = (<Auxilary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />
            </Auxilary>);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;
        return (
            <Auxilary>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrder);
