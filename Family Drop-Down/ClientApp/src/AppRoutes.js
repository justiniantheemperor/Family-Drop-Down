import DropDown from "./components/DropDown";
import { FetchData } from "./components/FetchData";
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
    },
  {
    path: '/fetch-data',
    element: <FetchData />
    }
];

export default AppRoutes;
