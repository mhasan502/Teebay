import React from "react";
import Product from "../../../components/Product/Product";
import {Button, Group, Space} from "@mantine/core";
import {Link} from "react-router-dom";


const MyProductPage = ({products}) => {
    return (
        <>
            {products.map((product, index) => (
                <Product product={product} owner={true} key={index}/>
            ))}

            <Space h="lg"/>

            <Group position="right">
                <Link to="/create-product">
                    <Button color="violet.9">
                        Add Product
                    </Button>
                </Link>
            </Group>
        </>
    )
};

export default MyProductPage;