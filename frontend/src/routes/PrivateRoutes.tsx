import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/layouts/Protected/ProtectedRoute';
import {
    CategoryList,
    ColorList,
    CreateCategory,
    CreateColor,
    CreateSize,
    CreateTag,
    SizeList,
    TagList,
    UpdateCategory,
    UpdateColor,
    UpdateSize,
    UpdateTag,
    CreateProduct,
    DashboardPage,
    ProductsListAll,
    Suspense,
    ManageOrders,
    OrdersDetails,
    ListUser,
    // UpdateProduct,
} from './LazyRoutes';
import { ADMIN_ROUTES } from '@/constants/router';
import { Outlet } from 'react-router-dom';
import UpdateProduct from '@/pages/Admin/_product_/UpdateProduct';

export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            <ProtectedRoute>
            <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                path: ADMIN_ROUTES.PRODUCTS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/edit',
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Category
            {
                path: ADMIN_ROUTES.CATEGORIES,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <CategoryList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_CREATE,
                        element: (
                            <Suspense>
                                <CreateCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.CATEGORIES_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateCategory />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Color
            {
                path: ADMIN_ROUTES.COLORS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ColorList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ColorList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateColor />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateColor />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Size
            {
                path: ADMIN_ROUTES.SIZES,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <SizeList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <SizeList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateSize />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateSize />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Tag
            {
                path: ADMIN_ROUTES.TAGS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <TagList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <TagList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateTag />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit/:id',
                        element: (
                            <Suspense>
                                <UpdateTag />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @user
            {
                path: ADMIN_ROUTES.USERS,
                element: (
                    <Suspense>
                        <ListUser />
                    </Suspense>
                ),
            },
            //@Order-List
            {
                path: ADMIN_ROUTES.ORDERS,
                element: (
                    <Suspense>
                        <ManageOrders />
                    </Suspense>
                ),
            },
            //@Order-detail
            {
                path: `${ADMIN_ROUTES.ORDERS}/:id/detail`,
                element: (
                    <Suspense>
                        <OrdersDetails />
                    </Suspense>
                ),
            },
        ],
    },
];
