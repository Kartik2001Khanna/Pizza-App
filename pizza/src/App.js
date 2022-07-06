import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Navigation from './components/Navigation';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import { CartContext} from './CartContext';
import { useEffect, useState } from 'react';
import { getCart, storeCart } from './helpers';

const App = () => {
    const [ cart, setCart ] = useState({});

    useEffect(() => {
       getCart().then(cart => {
        setCart(JSON.parse(cart));
       });
    }, []);  

    useEffect(() => {
        storeCart('cart', JSON.stringify(cart));
    }, [cart]);

    
    return (
    <>
        <Router>
          
         <CartContext.Provider value={{ cart, setCart }}>
                  <Navigation />     
            <Switch>
                <Route path="/" component={Home} exact></Route>
                <Route path="/products" exact component={ProductsPage}></Route>
                <Route path="/products/:_id"  component={SingleProduct}></Route>
                <Route path="/cart" component={Cart}></Route>
            </Switch>
            </CartContext.Provider>
        </Router>
        
    </>
    )
}

export default App;