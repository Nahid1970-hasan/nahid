import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getBNFont, useOutsideClicker } from "../utils/helper";
import { useRef } from "react";
import { StyledNavbar } from "../components/style/navbar_styled";
import { Typography } from "../components/style/Typography_styled";
import styled from "styled-components";
import { Flex } from "./style/Flex_styled";
import { theme } from "../styles/theme";
import { useSelector } from "react-redux";

const CustTy = styled.div`  
@media(max-width:${theme.layout.xs}){
    & >span{
        font-size: 15px;
        margin-right:8px;
    } 
  }
`;

const Div = styled.div`  
    display: flex;
    width:100%;  
    // background-image: url("../src/assets/img/banner.jpg");
    background-size: contain;
    background: ${(props) => `url(${props.imgUrl})`};
    background-repeat: round;
    height:100px;
`;

export const HeaderTop = () => {
    const [open, setOpen] = useState(false);

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const wraperRef = useRef(null);
    useOutsideClicker(wraperRef, () => { setOpen(false) });

    useEffect(() => {
        if (user.login) {
            navigate("/app");
        }
    }, [user]);

    return <>
        <StyledNavbar position={"block"} width={"auto"}>
         

        </StyledNavbar>

    </>
}
