import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from './../../Backdrop/Backdrop';
import Auxilary from '../../../../hoc/Auxilary/Auxilary';

const sideDrawer = props => (
    <Auxilary>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={[classes.SideDrawer,(props.open) ? classes.Open : classes.Close].join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </Auxilary>
)

export default sideDrawer
