import './cart-drop-down.style.scss';
import Button from '../button/button.component';

const CartDropDown = () =>{
    return(
        <div className='cart-drop-down-container'>
            <div className='cart-items'/>
            <Button>CHECK OUT</Button>
        </div>
    );
};

export default CartDropDown;