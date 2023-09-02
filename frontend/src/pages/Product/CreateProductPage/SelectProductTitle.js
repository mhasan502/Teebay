import React from "react";
import {
    Button,
    Center,
    Group,
    Space,
    Stack,
    TextInput,
    Title
} from "@mantine/core";


const SelectProductTitle = ({nextStep, handleChange, values}) => {
    const nextHandler = () => {
        nextStep();
    };

    return (
        <Stack>
            <Center>
                <Title>
                    Select a title for your product
                </Title>
            </Center>

            <Space h="md"/>

            <TextInput
                required
                size="md"
                placeholder="Enter product title"
                value={values.title}
                onChange={handleChange("title")}
                variant="filled"
                radius="md"
            />

            <Space h="md"/>

            <Group position="right">
                <Button onClick={nextHandler} color="violet.9">
                    Next
                </Button>
            </Group>
        </Stack>
    )
};


export default SelectProductTitle;