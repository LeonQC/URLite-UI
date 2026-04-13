import { createBrowserRouter } from "react-router";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import GettingStarted from "./pages/GettingStarted";
import ShortLinks from "./pages/ShortLinks";
import LinkDetail from "./pages/LinkDetail";
import CreateLink from "./pages/CreateLink";
import QRCodes from "./pages/QRCodes";
import Barcodes from "./pages/Barcodes";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: GettingStarted },
      { path: "links", Component: ShortLinks },
      { path: "links/:id", Component: LinkDetail },
      { path: "links/create", Component: CreateLink },
      { path: "qr-codes", Component: QRCodes },
      { path: "barcodes", Component: Barcodes },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
    ],
  },
]);