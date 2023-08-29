import React from "react";
import {Button, Group, Stack, Text} from "@mantine/core";
import {gql, useMutation} from "@apollo/client";


const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProductMutation(
        $title: String!, 
        $description: String!, 
        $price: String!,
        $category: [String!],
        $rentType: String!,
        $rentPrice: String!,
        $userEmail: String!
    ) 
    {
        createProduct(
            data: {
                title: $title, 
                description: $description, 
                price: $price, 
                category: $category,
                rentType: $rentType,
                rentPrice: $rentPrice,
                userEmail: $userEmail
            }
        ) 
        {
            message
        }
    }
`;

const ProductSummary = ({prevStep, values}) => {
    const [createProductMutation] = useMutation(CREATE_PRODUCT_MUTATION, {
        onCompleted: (data) => {
            alert(data);
        },
        onError: (error) => {
            alert(error);
        }
    });

    const handleCreateProduct = async () => {
        await createProductMutation({
            variables: {
                title: values.title,
                description: values.description,
                price: values.price.toString(),
                category: values.categories,
                rentType: values.rent_type,
                rentPrice: values.rent_price.toString(),
                userEmail: localStorage.getItem('email'),
            }
        });
    };

    const prevHandler = () => {
        prevStep();
    };

    return (
        <Stack>
            <Text size="xl" weight="500">Summary</Text>
            <Text>
                Title: {values.title}
            </Text>
            <Text>
                Categories: {values.categories}
            </Text>
            <Text>
                Description: {values.description}
            </Text>
            <Text>
                Price: ${values.price}, To rent: ${values.rent_price} {values.rent_type}
            </Text>
            <Group position="apart">
                <Button onClick={prevHandler} color="violet">Back</Button>
                <Button onClick={handleCreateProduct} color="violet">Submit</Button>
            </Group>
        </Stack>
    )
};

export default ProductSummary;