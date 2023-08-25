import React from "react";
import {Button, Group, Stack, Text, TextInput} from "@mantine/core";

const SelectProductTitle = ({nextStep, handleChange, values}) => {
    const nextHandler = () => {
        nextStep();
    };

    return (
        <Stack>
            <Text size="xl" ta="center">Select a title for your product</Text>
            <TextInput
                required
                placeholder="Enter product title"
                radius="md"
                value={values.title}
                onChange={handleChange("title")}
            />

            <Group position="right">
                <Button onClick={nextHandler} color="violet">Next</Button>
            </Group>
        </Stack>
    )
};

export default SelectProductTitle;