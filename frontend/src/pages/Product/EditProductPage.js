import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
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
import {gql, useMutation, useQuery} from "@apollo/client";


const ALL_CATEGORY_TYPES_QUERY = gql`
    query  {
        allCategoryTypes{
            id
            categoryName
        }
    }
`;

const EDIT_PRODUCT_MUTATION = gql`
    mutation EditProductMutation(
        $id: String!, 
        $title: String!, 
        $description: String!, 
        $price: String!, 
        $category: [String!], 
        $rentType: String!, 
        $rentPrice: String!,
        $userEmail: String!
    )
    {
        editProduct(
            id: $id,
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


const EditProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {product} = location.state;

    const [categoryTypes, setCategoryTypes] = useState([]);

    useQuery(ALL_CATEGORY_TYPES_QUERY, {
        onCompleted: (data) => {
            setCategoryTypes(data.allCategoryTypes)
        }
    });

    const [editProductMutation] = useMutation(EDIT_PRODUCT_MUTATION, {
        onCompleted: (data) => {
            console.log(data);
            navigate(-1);
        },
        onError: (error) => {
            alert(error);
        }
    });


    const form = useForm({
        initialValues: {
            title: product.title,
            category: product.category.map((category) => category.id),
            description: product.description,
            price: product.price,
            rentPrice: product.rentPrice,
            rentType: product.rentType,
        },
    });

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
                            defaultValue={parseFloat(form.values.price)}
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
                                defaultValue={parseFloat(form.values.rentPrice)}
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
                <Button type="submit" color="violet" onClick={handleEditProduct}>
                    Edit Product
                </Button>
            </Group>
        </Container>
    )
};

export default EditProductPage;