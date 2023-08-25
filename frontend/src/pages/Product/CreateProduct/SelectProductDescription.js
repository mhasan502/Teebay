import React from "react";
import {Button, Group, Stack, Text, Textarea} from "@mantine/core";

const SelectProductDescription = ({nextStep, prevStep, handleChange, values}) => {
    const prevHandler = () => {
        prevStep();
    };

    const nextHandler = () => {
        nextStep();
    };

    return (
        <Stack>
            <Text size="xl" ta="center">Select description</Text>
            <Textarea
                required
                placeholder=""
                radius="md"
                value={values.description}
                onChange={handleChange("description")}
            />
            <Group position="apart">
                <Button onClick={prevHandler} color="violet">Back</Button>
                <Button onClick={nextHandler} color="violet">Next</Button>
            </Group>
        </Stack>
    )
};

export default SelectProductDescription;