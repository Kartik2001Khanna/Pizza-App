import { useState,useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom'

const SingleProduct = () => {
    const[product, setproduct]= useState({});
    const params = useParams();
    const history = useHistory();
    

    useEffect(() => {
        fetch(`/api/products/${params._id}`)
        .then(res => res.json())
        .then(product => { 
            setproduct(product);
        
        })
    }, [params._id])

    return (
        <div className="container mx-auto mt-12">
            <button className="px-6 py-2 mb-12 rounded-full bg-blue-400 hover:bg-blue-600 text-black font-bold" onClick={ () => { history.goBack() }}>Back</button>
            <div className="flex">
                <img src={ product.image } alt="Pizza"/>    
                <div className="ml-16">
                    <h1 className="text-xl font-bold">{ product.name }</h1>
                    <div className="font-bold text-sm"><em>{ product.size }</em></div>
                    <div className="font-bold mt-2">₹{ product.price }</div>
                    {/*<button className="bg-yellow-500 hover:bg-yellow-600 py-1 px-8 mt-4 rounded-full font-bold">Add to cart</button>*/}
                </div>                
            </div>
        </div>
    )
}

export default SingleProduct;
