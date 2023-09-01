import React, {useState} from "react";
import {
    Button,
    Center,
    Group,
    MultiSelect,
    Space,
    Stack,
    Title
} from "@mantine/core";
import {gql, useQuery} from "@apollo/client";


const ALL_CATEGORY_TYPES_QUERY = gql`
    query  {
        allCategoryTypes{
            id
            categoryName
        }
    }
`;

const SelectProductCategories = ({nextStep, prevStep, handleChange, values}) => {
    const [categoryTypes, setCategoryTypes] = useState([]);

    useQuery(ALL_CATEGORY_TYPES_QUERY, {
        onCompleted: (data) => {
            setCategoryTypes(data.allCategoryTypes)
        }
    });

    const prevHandler = () => {
        prevStep();
    };
    const nextHandler = () => {
        nextStep();
    };

    return (
        <Stack>
            <Center>
                <Title>
                    Select categories
                </Title>
            </Center>

            <Space h="md"/>

            <MultiSelect
                required
                size="md"
                placeholder="Select a category"
                value={values.categories}
                data={categoryTypes.map((category) => ({value: category.categoryName, label: category.categoryName}))}
                onChange={handleChange("categories")}
                variant="filled"
                radius="md"
            />

            <Space h="md"/>

            <Group position="apart">
                <Button onClick={prevHandler} color="violet.9">
                    Back
                </Button>
                <Button onClick={nextHandler} color="violet.9">
                    Next
                </Button>
            </Group>
        </Stack>
    )
};

export default SelectProductCategories;