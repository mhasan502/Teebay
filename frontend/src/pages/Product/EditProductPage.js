import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    ActionIcon,
    Button,
    Container,
    Group,
    MultiSelect,
    NumberInput,
    Select,
    Space,
    Stack,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useMutation, useQuery} from "@apollo/client";
import {IconX} from '@tabler/icons-react';
import ALL_CATEGORY_TYPES_QUERY from "../../queries/ProductQueries/AllCategoryTypesQuery";
import EDIT_PRODUCT_MUTATION from "../../mutations/ProductMutations/EditProductMutation";
import GET_PRODUCT_QUERY from "../../queries/ProductQueries/GetProductQuery";


const EditProductPage = () => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const product_id = parseInt(useParams().id);
    const [categoryTypes, setCategoryTypes] = useState([]);

    useQuery(ALL_CATEGORY_TYPES_QUERY, {
        fetchPolicy: 'cache-first',
        onCompleted: (data) => {
            setCategoryTypes(data.allCategoryTypes)
        },
        onError: (error) => {
            alert(error);
        }
    });

    const [editProductMutation] = useMutation(EDIT_PRODUCT_MUTATION, {
        onCompleted: (data) => {
            alert(data.editProduct.message);
        },
        onError: (error) => {
            alert(error);
        }
    });

    const getProductQuery = useQuery(GET_PRODUCT_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id: product_id
        },
        onCompleted: (data) => {
            form.values.title = data.product.title;
            form.values.description = data.product.description;
            form.values.price = parseFloat(data.product.price);
            form.values.rentPrice = parseFloat(data.product.rentPrice);
            form.values.rentType = data.product.rentType;
            form.values.category = data.product.category.map((category) => category.id);
        },
        onError: (error) => {
            alert(error);
        }
    });

    const form = useForm({
        initialValues: {
            title: '',
            category: '',
            description: '',
            price: '',
            rentPrice: '',
            rentType: '',
        },
    });

    useEffect(() => {
        if (getProductQuery.data) {
            setProduct(getProductQuery.data.product);
        }
    }, [getProductQuery.data]);

    const handleEditProduct = async () => {
        await editProductMutation({
            variables: {
                id: product.id,
                title: form.values.title,
                description: form.values.description,
                price: form.values.price.toString(),
                category: form.values.category,
                rentType: form.values.rentType,
                rentPrice: form.values.rentPrice.toString(),
                userEmail: localStorage.getItem('email')
            }
        })
    };


    return (
        <Container my={100}>
            <Group position="right">
                <ActionIcon size="lg" variant="filled" color="red.9" onClick={() => navigate(-1)}>
                    <IconX/>
                </ActionIcon>
            </Group>
            <form onSubmit={form.onSubmit(values => handleEditProduct())}>
                <Stack spacing="xs">
                    <Text>
                        Title
                    </Text>
                    <TextInput
                        required
                        size="md"
                        placeholder="Enter product title"
                        value={form.values.title}
                        onChange={(event) => form.setFieldValue("title", event.currentTarget.value)}
                        variant="filled"
                        radius="md"
                    />
                </Stack>
                <Space h="lg"/>
                <Stack spacing="xs">
                    <Text>
                        Category
                    </Text>
                    <MultiSelect
                        required
                        size="md"
                        placeholder="Select a category"
                        value={form.values.category}
                        data={categoryTypes.map((category) => ({value: category.id, label: category.categoryName}))}
                        onChange={(event) => form.setFieldValue("category", event)}
                        variant="filled"
                        radius="md"
                    />
                </Stack>
                <Space h="lg"/>
                <Stack spacing="xs">
                    <Text>
                        Description
                    </Text>
                    <Textarea
                        required
                        size="md"
                        placeholder="Enter product description of your product"
                        value={form.values.description}
                        onChange={(event) => form.setFieldValue("description", event.currentTarget.value)}
                        variant="filled"
                        radius="md"
                        autosize
                        minRows={5}
                    />
                </Stack>
                <Space h="lg"/>
                <Stack spacing="xs">
                    <Group>
                        <Stack spacing="xs">
                            <Text>
                                Price
                            </Text>
                            <NumberInput
                                required
                                size="md"
                                placeholder="Enter product price"
                                value={form.values.price}
                                onChange={(event) => form.setFieldValue("price", event)}
                                variant="filled"
                                radius="md"
                                hideControls
                                icon="$"
                            />
                        </Stack>
                        <Stack spacing="xs">
                            <Text>
                                Rent price
                            </Text>
                            <Group>
                                <NumberInput
                                    required
                                    size="md"
                                    placeholder="Enter product rent price"
                                    value={form.values.rentPrice}
                                    onChange={(event) => form.setFieldValue("rentPrice", event)}
                                    variant="filled"
                                    radius="md"
                                    hideControls
                                    icon="$"
                                />
                                <Select
                                    required
                                    size="md"
                                    placeholder="Enter product rent type"
                                    value={form.values.rentType}
                                    onChange={(event) => form.setFieldValue("rentType", event)}
                                    data={[
                                        {value: 'DAILY', label: 'per day'},
                                        {value: 'HOURLY', label: 'per hour'},
                                    ]}
                                    variant="filled"
                                    radius="md"
                                />
                            </Group>
                        </Stack>
                    </Group>
                </Stack>

                <Space h="lg"/>
                <Space h="lg"/>

                <Group position="right">
                    <Button type="submit" color="violet.9">
                        Edit Product
                    </Button>
                </Group>
            </form>
        </Container>
    )
};

export default EditProductPage;