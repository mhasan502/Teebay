import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {Button, Group, MultiSelect, NumberInput, Select, Stack, Text, Textarea, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {gql, useQuery} from "@apollo/client";


const ALL_CATEGORY_TYPES_QUERY = gql`
    query  {
        allCategoryTypes{
            id
            categoryName
        }
    }
`;

const EditProductPage = () => {
    const location = useLocation();
    const {product} = location.state;

    const [categoryTypes, setCategoryTypes] = useState([]);

    useQuery(ALL_CATEGORY_TYPES_QUERY, {
        onCompleted: (data) => {
            setCategoryTypes(data.allCategoryTypes)
        }
    });


    const form = useForm({
        initialValues: {
            title: product.title,
            category: product.category.map((category) => category.id),
            description: product.description,
            price: product.price,
            rent_price: product.rentPrice,
            rent_type: product.rentType,
        },
    });


    return (
        <Stack>
            <Stack>
                <Text>Title</Text>
                <TextInput
                    required
                    placeholder="Enter product title"
                    value={form.values.title}
                    onChange={(event) => form.setFieldValue("title", event.currentTarget.value)}
                    radius="md"
                />
            </Stack>
            <Stack>
                <Text>Category</Text>
                <MultiSelect
                    required
                    placeholder="Enter product category"
                    value={form.values.category}
                    data={categoryTypes.map((category) => ({value: category.id, label: category.categoryName}))}
                    onChange={(event) => form.setFieldValue("category", event)}
                    radius="md"

                />

            </Stack>
            <Stack>
                <Text>Description</Text>
                <Textarea
                    required
                    size="md"
                    placeholder="Enter product description"
                    value={form.values.description}
                    onChange={(event) => form.setFieldValue("description", event.currentTarget.value)}
                    radius="md"
                />
            </Stack>
            <Stack>
                <Group>
                    <Stack>
                        <Text>Price</Text>
                        <NumberInput
                            required
                            placeholder="Enter product price"
                            defaultValue={parseFloat(form.values.price)}
                            precision={2}
                            onChange={(event) => form.setFieldValue("price", event)}
                            radius="md"
                            hideControls
                            icon="$"
                        />
                    </Stack>
                    <Stack>
                        <Text>Rent price</Text>
                        <Group>
                            <NumberInput
                                required
                                placeholder="Enter product rent price"
                                defaultValue={parseFloat(form.values.rent_price)}
                                precision={2}
                                onChange={(event) => form.setFieldValue("rent_price", event)}
                                radius="md"
                                hideControls
                                icon="$"
                            />
                            <Select
                                required
                                placeholder="Enter product rent type"
                                value={form.values.rent_type}
                                data={[
                                    {value: 'DAILY', label: 'per day'},
                                    {value: 'HOURLY', label: 'per hour'},
                                ]}
                                onChange={(event) => form.setFieldValue("rent_type", event)}
                                radius="md"
                            />
                        </Group>
                    </Stack>
                </Group>
            </Stack>
            <Button>
                Edit Product
            </Button>
        </Stack>
    )
};

export default EditProductPage;