import AccessoriesPage from "./pages/AccessoriesPage";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import GlassesPage from "./pages/GlassesPage";
import LensesPage from "./pages/LensesPage";
import Shop from "./pages/Shop";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  // {
  //   path: PRODUCT_ROUTE + "/:id",
  //   Component: ProductPage,
  // },
  {
    path: PRODUCT_ROUTE + "/accessories/:id",
    Component: AccessoriesPage,
  },
  {
    path: PRODUCT_ROUTE + "/lenses/:id",
    Component: LensesPage,
  },
  {
    path: PRODUCT_ROUTE + "/glasses/:id",
    Component: GlassesPage,
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  }, //delete
];
