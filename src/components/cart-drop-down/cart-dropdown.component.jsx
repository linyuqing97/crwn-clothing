import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const  navigate  = useNavigate();

  const goToCheckoutHandler = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;