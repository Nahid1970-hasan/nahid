import styled from "styled-components"
import { InfoCard, ModalCard } from "../components/style/Card_styled"
import { Container } from "../components/style/Container_styled"
import { Flex } from "../components/style/Flex_styled"
import { Typography } from "../components/style/Typography_styled"

const CustUl = styled.ul`
   margin:0 0 0 30px;
   
`


export const About = () => {
    return <div >
        <Container>
            <InfoCard>
                <Flex row>
                    <Flex md={12}>
                        <Typography fontSize="bodyTitleFontSize" textAlign="center" fontWeight="bold">
                            About me
                        </Typography>
                    </Flex>
                    <Flex md={12} padding="0!important">
                        <ModalCard >
                        <Typography margin="10px 0 10px 0!important">
                            I specialize in building responsive and intuitive web interfaces using React, ensuring seamless user interactions and optimized performance. My journey as a developer is fueled by a love for coding, an eagerness to solve complex problems, and a constant drive to learn and innovate.
                        </Typography>
                        </ModalCard>
                       
                    </Flex>

                    <Flex md={12}>
                        
                        <Typography fontSize="bodySubTitleFontSize" textAlign="center" fontWeight="bold" >
                            What I Do
                        </Typography>
                        <ModalCard >
                        <Typography textAlign="start" margin="10px 0 0 30px">
                            <CustUl>
                                <li> Responsive Web Design: Crafting websites that look and feel great on any device.</li>
                                <li>  Single Page Applications (SPAs): Developing fast, scalable, and interactive SPAs using React.</li>
                                <li>  User Interface (UI) Development: Focusing on aesthetics and usability to create engaging user experiences.</li>
                                <li>  Front-End Optimization: Ensuring fast load times and smooth navigation for enhanced user satisfaction.</li>

                            </CustUl>
                        </Typography>
                        </ModalCard>
                        
                    </Flex>

                    <Flex md={12}>
                        <Typography fontSize="bodySubTitleFontSize" textAlign="center" fontWeight="bold" >
                            Personal Information
                        </Typography>
                        <Typography textAlign="start">

                        </Typography>
                    </Flex>

                </Flex>

            </InfoCard>

        </Container>
    </div>
}