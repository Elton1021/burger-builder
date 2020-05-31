import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';


const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => <li key={igKey+"_orderSummary"}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}
        </li>);
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><b>Total Price: {props.price.toFixed(2)}</b></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxilary>
    )
}

export default orderSummary
