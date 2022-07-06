import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';

const Cart = () => {
    let total = 0;
    const[products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);

    const [priceFetched, togglePriceFetched] = useState(false);
    
    useEffect(() => {
        if(!cart.items) {
            return;
        }

        if(priceFetched){
            return;
        }

        //console.log('cart', Object.keys(cart.items));
        
        fetch('/api/products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ids: Object.keys(cart.items)})

        }).then(res => res.json())
        .then(products => {
            setProducts(products);
            togglePriceFetched(true);
        })
        
    }, [cart, priceFetched]);

    const getQty = (productId) => {

        return cart.items[productId];
    }

    const increment = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = {...cart};
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
         
    }

    const decrement = (productId) => {
        const existingQty = cart.items[productId];
        if(existingQty === 1){
            return;
        }
        const _cart = {...cart};
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
         
    }
    const getSum = (productId, price) => {
        const sum = price * getQty(productId);
        total += sum;
        return sum;
    }

    const handleDelete = (productId) => {

        const _cart = {...cart};
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        setCart(_cart);
        const updatedProductList = products.filter((product) => product._id !== productId);
        setProducts(updatedProductList);
    }

    const handleOrderNow = () => {
        window.alert('ORDER PLACED SUCCESFULLY!!');
        setProducts([]);
        setCart({});

    }

    return (
        !products.length 
        ? <img className="mx-auto w-1/2 mt-12 " src="/images/empty2.gif" alt="Empty Cart" />
        :
        <div className="mx-auto pb-24 lg:w-1/2 w-full container">
        <h1 className=" my-12 font-bold text-center text-lg rounded-full bg-yellow-300"> CART ITEMS</h1>
        <ul>
            {
                products.map( product => {
                    return(
                        <li className="mb-12" key={product._id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img classname="h-20" src={ product.image } alt="pizza item"/>
                                <span className="font-bold ml-4 w-48 ">{ product.name }</span>
                            </div>
                            <div>
                                <button onClick={() => { decrement(product._id) }} className="rounded-full font-bold px-4 py-2leading-none bg-blue-300 hover:bg-blue-500">-</button>
                                <b className="px-4 ">{ getQty(product._id) }</b>
                                <button onClick={() => { increment(product._id) }} className="rounded-full font-bold px-4 py-2leading-none bg-blue-300 hover:bg-blue-500">+</button>
                            </div>
                            <span>₹ { getSum(product._id, product.price) }</span>
                            <button onClick={() => { handleDelete(product._id) }} className="rounded-full hover:bg-red-700 font-bold bg-red-500 leading-none text-white px-4 py-2">DELETE</button>
                        </div>
                    </li>
                    )            
                })
            }
         </ul>  
        <hr className="my-6"/> 
        <div className="font-bold text-right">
            GRAND TOTAL: ₹ { total }
        </div>   
        <div className=" text-right mt-6">
            <button onClick = { handleOrderNow } className="rounded-full py-2 px-4 leading-none text-white font-bold bg-green-400 hover:bg-green-600">ORDER NOW</button>
        </div>     
        </div>
    )
}

export default Cart;

