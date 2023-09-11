import DropDown from "./components/DropDown";
import ViewData from "./components/ViewData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/drop-down',
    element: <DropDown />
  },
    {
        path: '/view-data',
        element: <ViewData />
    }
];

export default AppRoutes;
