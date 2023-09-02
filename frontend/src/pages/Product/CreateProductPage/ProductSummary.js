import React from "react";
import {
    Button,
    Group,
    Space,
    Stack,
    Text,
    Title
} from "@mantine/core";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import CREATE_PRODUCT_MUTATION from "../../../mutations/ProductMutations/CreateProductMutation";


const ProductSummary = ({prevStep, values}) => {
    const navigate = useNavigate();
    const [createProductMutation] = useMutation(CREATE_PRODUCT_MUTATION, {
        onCompleted: (data) => {
            alert(data.createProduct.message);
            navigate(-1);
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
            <Title>
                Summary
            </Title>

            <Text>
                Title: {values.title}
            </Text>
            <Text>
                Categories: {(values.categories) ? values.categories.join(', ') : ''}
            </Text>
            <Text>
                Description: {values.description}
            </Text>
            <Text>
                Price: ${values.price}, To rent: ${values.rent_price} {values.rent_type}
            </Text>

            <Space h="lg"/>

            <Group position="apart">
                <Button onClick={prevHandler} color="violet.9">
                    Back
                </Button>
                <Button onClick={handleCreateProduct} color="violet.9">
                    Submit
                </Button>
            </Group>
        </Stack>
    )
};


export default ProductSummary;