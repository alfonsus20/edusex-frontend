import { Suspense, lazy } from "react";

import useIsMobile from "../hooks/useIsMobile";

const NavbarDesktop = lazy(() => import("./navbar/NavbarDesktop"));
const NavbarMobile = lazy(() => import("./navbar/NavbarMobile"));

const Navbar = () => {
  const { isMobile } = useIsMobile();

  return <Suspense>{isMobile ? <NavbarMobile /> : <NavbarDesktop />}</Suspense>;
};

export default Navbar;
