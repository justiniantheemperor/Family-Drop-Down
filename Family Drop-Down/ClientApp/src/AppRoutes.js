import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import ViewData from "./components/ViewData";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
    {
        path: '/view-data',
        element: <ViewData />
    }
];

export default AppRoutes;
