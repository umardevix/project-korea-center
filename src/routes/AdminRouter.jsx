import { AdminLayout } from "../admin/adminLayout/AdminLayout";
import { AddProductPage } from "../admin/pages/addProductPage/AddProductPage";
import { AdminOrder } from "../admin/pages/adminOrderPage/AdminOrder";
import { Dashboard } from "../admin/pages/dashboardPage/Dashboard";
import { EditProductPage } from "../admin/pages/editProductPage/EditProductPage";
import PrivateRoute from "../authContext/PrivateRouter";
import { productLoader } from "../pages/productIdPage/ProductIdPage";

export const adminRouter = [
	{
		path: "/admin",
		element: <AdminLayout />,  // Лейаут для админки
		children: [
			{
				path: "/admin",
				element: <PrivateRoute element={<Dashboard />} adminOnly={true} />
			},
			{ path: '/admin/order', element: <AdminOrder /> },
			{ path: '/admin/addProduct', element: <AddProductPage /> },
			{ loader: productLoader, path: '/admin/edit-product/:id', element: <EditProductPage /> },
		],
	},
];