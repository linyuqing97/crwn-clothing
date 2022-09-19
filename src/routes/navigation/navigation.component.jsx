import { Outlet} from "react-router-dom";
import { Fragment, useContext } from "react";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-drop-down/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../utils/firebase/firebase.utils";


import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
  } from './navigation.styles';
  
  const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
  
    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
  
            {currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to='/auth'>SIGN IN</NavLink>
            )}
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropDown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  };
  export default Navigation;