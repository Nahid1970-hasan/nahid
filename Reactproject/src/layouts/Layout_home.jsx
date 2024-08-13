import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import { Header } from "./Header"
import styled from "styled-components"
import {theme} from "../styles/theme"
const BodyArea = styled.div`
    margin-bottom: 0px;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
` 
export const LayoutHome = () => {
    return (
        <>
            <Header />
            <BodyArea>
                <Outlet />
            </BodyArea>
            <Footer/>
        </>)
}