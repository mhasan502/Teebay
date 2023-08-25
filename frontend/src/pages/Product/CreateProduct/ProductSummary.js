import React from "react";
import {Button, Group, Stack, Text} from "@mantine/core";

const ProductSummary = ({prevStep, values}) => {
    const prevHandler = () => {
        prevStep();
    };
    const submitHandler = () => {
        console.log(values);
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
                <Button onClick={submitHandler} color="violet">Submit</Button>
            </Group>
        </Stack>
    )
};

export default ProductSummary;