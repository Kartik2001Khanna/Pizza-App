import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../CartContext';

const Navigation = () => {
    const cartstyle = {
        background : 'skyblue',
        display: 'flex' ,
        padding: '6px 12px' ,
        borderRadius: '60px'
    }
    
    const { cart } = useContext(CartContext);

    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-3">
                <Link to="/">
                    <img src="/images/piz2.gif" alt="Logo" style={{height : 200}} />
                </Link>
                <ul className="flex items-center">
                    <li className="bg-blue-300 px-3 py-2 font-bold hover:bg-yellow-300 rounded-full"><Link to="/">Home</Link></li>
                    <li className="ml-5 bg-blue-300 px-3 py-2 font-bold hover:bg-yellow-300 rounded-full"><Link to="/products">Products</Link></li>
                    <li className="ml-5 px-3 py-2 hover:bg-yellow-300">
                        <Link to="/cart">
                            <div style={cartstyle}>
                                <span className="font-bold">{ cart.totalItems ? cart.totalItems : 0 }</span>
                                <img className="ml-3" src="/images/891462.png" alt="Cart Icon" style={{height : 40}} />
                            </div>
                        </Link>
                    </li>
                </ul>
            
                
                
            </nav>
        </>
    )
}

export default Navigation;
