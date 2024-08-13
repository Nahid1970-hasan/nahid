import { useEffect, useRef, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadPage } from "../features/page/page_slice";
import { MenuListItem } from "./MenuListItem";
import { useTranslation } from "react-i18next";
import { Typography } from "./style/Typography_styled";

export const SidebarMenu = ({ item }) => {
  const [subMod, setSubMod] = useState(false); 
  const { t, i18n } = useTranslation(); 
  return (
    <>
      {!item.sub_module ? (

        <MenuListItem title={t(i18n.resolvedLanguage == 'en' ? item.module_name_en : item.module_name_bn)} icon={item.icon_name} link={item.page_name} />

      ) : (
        <li
          className={!subMod ? "collapsible collapsed" : "collapsible"}
        >
          <a onClick={() => setSubMod(!subMod)}><Typography  
        textAlign="left"
        color="font"
      >
            <span className="material-icons md-18">{item.icon_name}</span>
            {t(i18n.resolvedLanguage == 'en' ? item.module_name_en : item.module_name_bn)}
          </Typography></a>
          <ul style={{display: subMod? "block": "none"}}>
            {item.sub_module.map(
              (subMenu, i) =>
                  <MenuListItem key={i} title={t(i18n.resolvedLanguage == 'en' ? subMenu.sub_module_name_en : subMenu.sub_module_name_bn)} link={subMenu.page_name} />
            )}
          </ul>
        </li>
      )}
    </>
  );
};
