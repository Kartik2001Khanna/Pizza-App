import Products from '../components/Products';

const Home = () => {
    return (
        <>
        <div className="hero py-16">
            <div className="container mx-auto flex item-center justify-between">
                <div className="w-1/2">
                    <h4 className="text-lg"><em>Are you hungry ?? Want to eat something delicious</em></h4>
                    <h1 className="text-2xl md: text-4xl font-bold">Don't wait and grab the best Pizza!!</h1>
                    <button className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-400 hover:bg-green-400">ORDER NOW</button>
                </div>
                <div className="w-1/2 flex">
                    <img src="/images/piz1.gif" style={{height : 300}} alt="Pizza head"/>
                    <img src="/images/piz3.gif" style={{height : 300}} alt="Pizza head"/>
                </div>
            </div>
        </div>
        <div className="pb-24">
            <Products />
        </div>
        </>



    )

}

export default Home;