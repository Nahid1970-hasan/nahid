import styled from "styled-components"
import { Container } from "../components/style/Container_styled"
import { Typography } from "../components/style/Typography_styled"
import { Flex } from "../components/style/Flex_styled"
import { InfoCard } from "../components/style/Card_styled"

const Image = styled.img`
   width:100%;
   height:100%;
   text-align: center;
   vertical-align: middle;

`
const CustDiv = styled.div`
   padding:110px 0 0 0 !important;
`

export const Home = () => {
    return <div>
        <Container>
            <InfoCard >
                <Flex row>
                    <Flex md={6} padding="30px 0 0 90px !important">
                        <CustDiv>
                        <Typography fontSize="bodyTitleFontSize" textAlign="start" fontWeight="bold">
                            Hello
                        </Typography>
                        <Typography fontSize="bodyContentFontSize" textAlign="start" >
                        I'm Hasan, a passionate and dedicated React web developer committed to creating stunning, high-performance web applications. With a keen eye for detail and a deep understanding of the latest web technologies, I transform ideas into dynamic, user-friendly digital experiences.
                        </Typography>
                        </CustDiv>
                    </Flex>
                    <Flex md={6} padding="0 !important">
                        <Image src="./src/assets/Image/file.png" />

                    </Flex>


                </Flex>


            </InfoCard>
        </Container>
    </div>
}