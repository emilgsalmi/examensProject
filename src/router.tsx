import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home"
import ProductPage from "./pages/ProductPage";
import { About } from "./pages/About";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        errorElement: <NotFound />,
        children:[
            {
                path:"/",
                element:<Home />,
                index:true
            },
            {
                path:"/products",
                element:<ProductPage />,
            },
            {
                path:"/about",
                element: <About />
            }
        ]
    }
])