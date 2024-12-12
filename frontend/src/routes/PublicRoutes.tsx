import { MAIN_ROUTES } from '@/constants/router';
import AccountLayout from '@/layouts/AccountLayout';
import MainLayout from '@/layouts/Mainlayout/MainLayout';
import NotFound from '@/pages/Client/NotFound';
import { Navigate } from 'react-router';
import {
    HomePage,
    LoginPage,
    MyOrderDetailsPage,
    MyOrdersPage,
    ProductDetailPage,
    ProfilePage,
    RegisterPage,
    ShippingPage,
    CheckoutPage,
    ProductPage,
    Suspense,
    CartDetailPage,
    OrderSuccessPage,
    WishlistPage,
    OrderErrorPage,
    VerifyAccountPage,
    ForgotPasswordPage,
} from './LazyRoutes';
import AuthProtected from '@/layouts/Protected/AuthProtected';

const PublicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.VERIFY,
                element: (
                    <Suspense>
                        <VerifyAccountPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.FORGOT_PASSWORD,
                element: (
                    <Suspense>
                        <ForgotPasswordPage />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense>
                        <RegisterPage />
                    </Suspense>
                ),
            },
            // @Product page
            {
                path: '/products',
                element: (
                    <Suspense>
                        <ProductPage />
                    </Suspense>
                ),
            },
            {
                path: 'products/:id',
                element: (
                    <Suspense>
                        <ProductDetailPage />
                    </Suspense>
                ),
            },

            // @CheckOut
            {
                path: MAIN_ROUTES.CART,
                element: (
                    <Suspense>
                        <AuthProtected>
                            <CartDetailPage />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.SHIPPING,
                element: (
                    <Suspense>
                        <ShippingPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CHECKOUT,
                element: (
                    <Suspense>
                        <CheckoutPage />
                    </Suspense>
                ),
            },
            //@WishList
            {
                path: MAIN_ROUTES.WISH_LIST,
                element: (
                    <Suspense>
                        <AuthProtected>
                            <WishlistPage />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            // @Account
            {
                element: (
                    <Suspense>
                        <AuthProtected>
                            <AccountLayout />
                        </AuthProtected>
                    </Suspense>
                ),
                children: [
                    {
                        path: `${MAIN_ROUTES.PROFILE}`,
                        element: <ProfilePage />,
                    },
                    {
                        path: `${MAIN_ROUTES.MY_ORDERS}`,
                        element: <MyOrdersPage />,
                    },
                    {
                        path: `${MAIN_ROUTES.MY_ORDERS_DETAIL}`,
                        element: <MyOrderDetailsPage />,
                    },
                ],
            },
        ],
    },
    {
        path: MAIN_ROUTES.SUCCESS_ORDER,
        element: (
            <Suspense>
                <OrderSuccessPage />
            </Suspense>
        ),
    },
    {
        path: MAIN_ROUTES.ERROR_ORDER,
        element: (
            <Suspense>
                <OrderErrorPage />
            </Suspense>
        ),
    },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to={'/404'} /> },
];

export default PublicRoutes;
