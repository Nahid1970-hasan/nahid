import { Suspense, useRef, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styled from "styled-components";
import { useOutsideClicker } from "../utils/helper";
import { Container } from "./style/Container_styled";
import { Loader } from "./style/Loader_styled";
import { Typography } from "./style/Typography_styled";



// Styled Navbar component
const NavbarContainer = styled.div`
  background-color:#FFFFFF;
  padding: 5px 5px;
`;
export const Navbar = () => {
  const [subMod, setSubMod] = useState(false);
  const subModRef = useRef(null);
  useOutsideClicker(subModRef, () => setSubMod(false));

  return (
    <Suspense fallback={<Loader />}>
      <NavbarContainer>
        <Container border={"none"}>
          <nav className="nav">
            <Link to="/" className="site-title">
              New Site
            </Link>
            <ul>
              <CustomLink to="/">Home</CustomLink>
              <CustomLink to="/about">About</CustomLink>
              <CustomLink to="/skill1">Skills</CustomLink>
              <CustomLink to="/contact">Contact</CustomLink>
              {/* <Link to="/login">
                <Typography
                  textAlign="left"
                  color="font"
                  fontSize="navFont"
                >
                  Login
                </Typography>
              </Link> */}
            </ul>

          </nav>
        </Container>
      </NavbarContainer>
    </Suspense>
  );
};
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })


  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
