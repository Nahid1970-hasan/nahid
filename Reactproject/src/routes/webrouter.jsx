import {
    createHashRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import NotFound from "../pages/NotFound";
import { Home } from "../pages/home";
import { LayoutHome } from "../layouts/Layout_home";
import { About } from "../pages/About";
import { Skills } from "../pages/skills";
import { Contact } from "../pages/Contact";
import { Skill2 } from "../pages/Skill2";




export const WebRouter = createHashRouter(
    createRoutesFromElements(
        <>
            <Route element={<LayoutHome />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skill1" element={<Skills />} />
                <Route path="/skill2" element={<Skill2 />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </>
    ),
    {
        basename: import.meta.env.BASE_URL
    }
);


