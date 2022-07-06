import {Link} from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../CartContext';

const Product = (props) => {
    const [ isAdding, setisAdding ] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const { product } = props;
    
    const addToCart = (event, product) => {
        event.preventDefault();
        let _cart = {...cart};       
        if(!_cart.items){
            _cart.items = {}

        } 
        if(_cart.items[product._id]) {
            _cart.items[product._id] += 1;           
        }else{
            _cart.items[product._id] = 1;
            
        }
        
        if(!_cart.totalItems) {
            _cart.totalItems = 0;
        }

        _cart.totalItems += 1;
        setCart(_cart);
        setisAdding(true);
        setTimeout(() => {
            setisAdding(false);
        }, 800);
    }
    return (
            
            <Link to={`/products/${product._id}`}>
            <div>
                <img src={product.image} alt="Pizza"/>
                <div className="text-center">
                    <h2 className=" hover:bg-green-300 text-lg font-bold py-1">{product.name}</h2>
                    <span className="bg-yellow-200 font-bold py-1 rounded-full text-sm px-4"><em>{product.size}</em></span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="font-bold">₹{product.price}</span>
                    <button disabled={isAdding} onClick={(e) => { addToCart(e, product) }} className={`${ isAdding ? 'bg-red-500': 'bg-blue-400 hover:bg-blue-600' } py-1 px-3 rounded-full font-bold`}>ADD{isAdding ? 'ED' : ''}</button>
                </div>
            </div>
            </Link>
          )
}

export default Product;
