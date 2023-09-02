import React from "react";
import {
    Button,
    Center,
    Container,
    Group,
    NumberInput,
    Select,
    Space,
    Stack,
    Text,
    Title
} from "@mantine/core";


const SelectProductPriceRent = ({nextStep, prevStep, handleChange, values}) => {
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
                    Select price
                </Title>
            </Center>

            <Space h="md"/>
            <Container>
                <NumberInput
                    required
                    size="md"
                    placeholder="Enter product price"
                    value={values.price}
                    onChange={handleChange('price')}
                    variant="filled"
                    radius="md"
                    hideControls
                    icon="$"
                />

                <Space h="lg"/>
                <Text>
                    Rent
                </Text>

                <Group>
                    <NumberInput
                        required
                        size="md"
                        placeholder="Enter product rent price"
                        value={values.rent_price}
                        onChange={handleChange('rent_price')}
                        variant="filled"
                        radius="md"
                        hideControls
                        icon="$"
                    />
                    <Select
                        required
                        size="md"
                        placeholder="select option"
                        value={values.rent_type}
                        onChange={handleChange('rent_type')}
                        data={[
                            {value: 'DAILY', label: 'per day'},
                            {value: 'HOURLY', label: 'per hour'},
                        ]}
                        variant="filled"
                        radius="md"
                    />
                </Group>
            </Container>

            <Space h="lg"/>
            <Space h="lg"/>

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


export default SelectProductPriceRent;