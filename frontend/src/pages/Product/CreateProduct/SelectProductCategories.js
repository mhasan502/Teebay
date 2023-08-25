import React, {useState} from "react";
import {Button, Group, MultiSelect, Stack, Text} from "@mantine/core";
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
            <Text size="xl" ta="center">Select categories</Text>
            <MultiSelect
                required
                placeholder="Select a category"
                value={values.categories}
                data={categoryTypes.map((category) => ({value: category.categoryName, label: category.categoryName}))}
                onChange={handleChange("categories")}
                radius="md"
            />
            <Group position="apart">
                <Button onClick={prevHandler} color="violet">Back</Button>
                <Button onClick={nextHandler} color="violet">Next</Button>
            </Group>
        </Stack>
    )
};

export default SelectProductCategories;