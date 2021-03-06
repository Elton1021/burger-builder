import React from 'react'
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad' },
    { label: 'Bacon' },
    { label: 'Cheese' },
    { label: 'Meat' },
]

const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <b>{props.price.toFixed(2)}</b></p>
            {controls.map(ctrl => <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.label.toLowerCase())}
                removed={() => props.ingredientRemoved(ctrl.label.toLowerCase())}
                disabled={props.disabled[ctrl.label.toLowerCase()]}
            />)}
            <button
                className={classes.OrderButton}
                onClick={props.ordered}
                disabled={!props.purchasable}
            >
                ORDER NOW
            </button>
        </div>
    )
}

export default buildControls