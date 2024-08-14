import { Suspense, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useOutsideClicker } from "../utils/helper";
import { Container } from "./style/Container_styled";
import { Loader } from "./style/Loader_styled";
import { StyledNavbar } from "./style/navbar_styled";
import { Typography } from "./style/Typography_styled";
import { Flex } from "./style/Flex_styled";
import { Menu } from "./Menu";



// Styled Navbar component
const NavbarContainer = styled.div`
  background-color:#FFFFFF;
  padding: 5px 5px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-right: 2px;
`;

const NavLinkStyled = styled(NavLink)`
  color:#000000;
  padding: 10px;
  &:hover {
    background-color: #555; /* Darker background on hover */
    color:#000000; 
  }
`;

export const Navbar = () => {
  const [subMod, setSubMod] = useState(false);
  const subModRef = useRef(null);
  useOutsideClicker(subModRef, () => setSubMod(false));

  return (
    <Suspense fallback={<Loader />}>
      <NavbarContainer>
        <Container border={"none"}>
          <StyledNavbar>
            <Flex row>
              <Flex md={11}>
                <NavList>
                  <NavItem>
                    <NavLinkStyled to="/">Home</NavLinkStyled>
                  </NavItem>
                  <NavItem ref={subModRef}>
                    <NavLinkStyled to="#" onClick={() => setSubMod(!subMod)}>
                      Skills
                    </NavLinkStyled>
                    {subMod && (
                      <Menu open={subMod}>
                        <NavList>
                          <NavItem><NavLinkStyled to="#skill1">Skill 1</NavLinkStyled></NavItem>
                          <NavItem><NavLinkStyled to="#skill2">Skill 2</NavLinkStyled></NavItem>
                        </NavList>
                      </Menu>
                    )}
                  </NavItem>
                  <NavItem>
                    <NavLinkStyled to="#about">About</NavLinkStyled>
                  </NavItem>
                  <NavItem>
                    <NavLinkStyled to="#contact">Contact</NavLinkStyled>
                  </NavItem>
                </NavList>
              </Flex>
              <Flex md={1}>
                <NavList>
                  <NavItem>
                    <NavLinkStyled to="/login">
                      <Typography
                        textAlign="left"
                        color="font"
                        fontSize="navFont"
                      >
                        Login
                      </Typography>
                    </NavLinkStyled>
                  </NavItem>
                </NavList>
              </Flex>
            </Flex>
          </StyledNavbar>
        </Container>
      </NavbarContainer>
    </Suspense>
  );
};
