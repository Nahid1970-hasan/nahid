import { useRef, useState } from "react";
import { useOutsideClicker } from "../utils/helper";
import { Menu } from "./Menu";
import { Typography } from "./style/Typography_styled";
import { MenuItem } from "./style/MenuItem_styled";

export const PublicMenu = ({ item }) => {
  const [subMod, setSubMod] = useState(false);
  const subModRef = useRef(null);
  useOutsideClicker(subModRef, () => { setSubMod(false) });
  // State to manage visibility of submenus
  const [showSkillsMenu, setShowSkillsMenu] = useState(false);

  // Function to toggle skills submenu
  const toggleSkillsMenu = () => {
    setShowSkillsMenu(!showSkillsMenu);
  };

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/">
              Home
            </a>
          </li>
          <li
          >
            <div ref={subModRef}>
              <a
                onClick={() => (
                  setSubMod(!subMod)
                )}
              >
                Skills
              </a>
              <Menu open={subMod}>
                <li><a href="#/skill1">
                  skill
                </a>

                </li>
                <li><a href="#/skill2">
                  skill2
                </a>

                </li>

              </Menu>
            </div>



          </li>
          <li >
            <a href="#/about" >
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#/contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>



    </>

  );
};
