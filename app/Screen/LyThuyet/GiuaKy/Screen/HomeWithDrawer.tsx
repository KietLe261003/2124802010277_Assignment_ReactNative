import React from "react";
import DrawerNav from "../Component/Drawer";
import Home from "./Home";


const HomeWithDrawer = () => {
  return (
    <DrawerNav>
      <Home />
    </DrawerNav>
  );
};

export default HomeWithDrawer;
