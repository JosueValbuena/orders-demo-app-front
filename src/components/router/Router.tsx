import { createBrowserRouter } from "react-router"
import AppWrapper from "../organism/appWrapper/AppWrapper"
import { Home, NotFound, OrderCreate, OrderDetail } from "../pages"

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppWrapper />,
        children: [
            { index: true, element: <Home /> },
            { path: "orders/orderdetail/:id", element: <OrderDetail /> },
            { path: "orders/create", element: <OrderCreate /> },
            { path: "orders/editorder/:id", element: <OrderCreate /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;