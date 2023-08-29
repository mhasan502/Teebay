import React from "react";
import {Button, Group, NumberInput, Select, Stack, Text} from "@mantine/core";

const SelectProductPriceRent = ({nextStep, prevStep, handleChange, values}) => {
    const prevHandler = () => {
        prevStep();
    };
    const nextHandler = () => {
        nextStep();
    };

    return (
        <Stack>
            <Text size="xl" ta="center">Select price</Text>
            <NumberInput
                required
                placeholder="Purchase price"
                value={values.price}
                onChange={handleChange('price')}
                radius="md"
                hideControls
                icon="$"
            />
            <Text>Rent</Text>
            <Group>
                <NumberInput
                    required
                    placeholder="Rent price"
                    value={values.rent_price}
                    onChange={handleChange('rent_price')}
                    radius="md"
                    hideControls
                    icon="$"
                />
                <Select
                    required
                    placeholder="select option"
                    value={values.rent_type}
                    onChange={handleChange('rent_type')}
                    data={[
                        {value: 'DAILY', label: 'per day'},
                        {value: 'HOURLY', label: 'per hour'},
                    ]}
                    radius="md"
                />
            </Group>

            <Group position="apart">
                <Button onClick={prevHandler} color="violet">Back</Button>
                <Button onClick={nextHandler} color="violet">Next</Button>
            </Group>
        </Stack>
    )
};

export default SelectProductPriceRent;