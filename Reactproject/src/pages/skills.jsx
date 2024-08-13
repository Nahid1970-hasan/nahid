import { Step, Stepper } from "react-form-stepper"
import { Container } from "../components/style/Container_styled"
import { useState } from "react";
import { Typography } from "../components/style/Typography_styled";




export const Skills = () => {

    const steps = [
        { title: 'User details' },
        { title: 'Payment' },
        { title: 'Booking confirmation' },
      ];

    const [activeStep, setActiveStep] = useState(0);
    // const activeStep = 1;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return <div style={{ userSelect: "none" }}>
        <Container>
            Skill page done
            <div>
            <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <label
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </label>
                            <div>
                              
                            </div>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Container>
    </div>
}