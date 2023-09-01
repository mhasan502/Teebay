import React from "react";
import {
    Button,
    Center,
    Group,
    Space,
    Stack,
    Textarea,
    Title
} from "@mantine/core";

const SelectProductDescription = ({nextStep, prevStep, handleChange, values}) => {
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
                    Select description
                </Title>
            </Center>

            <Space h="md"/>

            <Textarea
                required
                size="md"
                placeholder="Enter description of your product"
                value={values.description}
                onChange={handleChange("description")}
                variant="filled"
                radius="md"
                autosize
                minRows={5}
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

export default SelectProductDescription;