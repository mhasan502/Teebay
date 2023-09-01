import React, {useState} from "react";
import {
    Container,
    Text
} from "@mantine/core";
import SelectProductTitle from "./CreateProductPage/SelectProductTitle";
import SelectProductCategories from "./CreateProductPage/SelectProductCategories";
import SelectProductDescription from "./CreateProductPage/SelectProductDescription";
import SelectProductPriceRent from "./CreateProductPage/SelectProductPriceRent";
import ProductSummary from "./CreateProductPage/ProductSummary";

const CreateProductPage = () => {
    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        title: '',
        categories: '',
        description: '',
        price: '',
        rent_price: '',
        rent_type: '',
    });

    const nextStep = () => {
        setStep(step + 1)
    };
    const prevStep = () => {
        setStep(step - 1)
    };

    const handleChange = (input) => e => {
        if (input === 'title' || input === 'description') {
            setValues({...values, [input]: e.target.value});
        } else {
            setValues({...values, [input]: e});
        }
    };


    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <SelectProductTitle
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <SelectProductCategories
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={values}
                    />
                )
            case 3:
                return (
                    <SelectProductDescription
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={values}
                    />
                )
            case 4:
                return (
                    <SelectProductPriceRent
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        values={values}
                    />
                )
            case 5:
                return (
                    <ProductSummary
                        prevStep={prevStep}
                        values={values}
                    />
                )
            default:
                return (
                    <Text>Something went wrong</Text>
                )
        }
    }
    return (
        <Container my={200}>
            {renderStep()}
        </Container>
    )
};

export default CreateProductPage;