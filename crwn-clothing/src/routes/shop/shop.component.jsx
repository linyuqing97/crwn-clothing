import { useContext } from "react";
import './shop.style.scss';

import { ProductsContext } from "../../context/product.context";
import ProductCard from "../../components/product-card/product-card.component";

const Shop = () =>{
    const {products} = useContext(ProductsContext);

    return (
        <div className="products-containers">
            {products.map((product)=> (
                <ProductCard key={product.id} product = {product}/>
                ))}
        </div>
    );
};

export default Shop;