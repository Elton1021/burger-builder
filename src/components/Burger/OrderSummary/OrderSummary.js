import React from 'react'
import Auxilary from '../../../hoc/Auxilary'

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
            <p>Continue to checkout?</p>
        </Auxilary>
    )
}

export default orderSummary
