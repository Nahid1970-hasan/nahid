import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useOutsideClicker } from "../utils/helper";
import { Container } from "./style/Container_styled";
import { Loader } from "./style/Loader_styled";
import { StyledNavbar } from "./style/navbar_styled";
import { PublicMenu } from "./PublicMenu";
import { Typography } from "./style/Typography_styled";

const Marquee = styled.marquee`
  display: block;
  margin: 0;
  padding: 8px 2px; 
  background: ${({ background, theme }) =>
    background ? theme.colors[background] : theme.colors.bg}; 
`;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const wraperRef = useRef(null);
  const dispatch = useDispatch();
  useOutsideClicker(wraperRef, () => {
    setOpen(false);
  });

  // useEffect(() => {
  //   dispatch(loadTodayStatus());
  // }, []);

  return (
    <Suspense fallback={<Loader />}>

      <Container border={"none"}>

        <StyledNavbar>
          <Container border={"none"}>
            <div>
              <ul>
                <PublicMenu />
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <NavLink to="/login"><Typography
                    textAlign="left"
                    color="font"
                    fontSize="navFont"
                  >{("login")}</Typography></NavLink>
                </li>
              </ul>
            </div>
          </Container>
        </StyledNavbar>
        {/* <Marquee background={"bulletinBack"}>
          <strong><Typography color={"bulletin"} fontSize='bulletinFont' fontWeight="bold" >Demo</Typography></strong>
        </Marquee> */}
      </Container>
    </Suspense>
  );
};
