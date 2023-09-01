import React from "react";
import Product from "../../../components/Product/Product";
import {Link} from "react-router-dom";

const AllProductPage = ({products}) => {
    return (
        <>
            {products.map((product, index) => (
                <Link to={"product-details/" + product.id} key={index}>
                    <Product product={product}/>
                </Link>
            ))}
        </>
    )
};

export default AllProductPage;