import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";



export default function AdminRoot() {
  return (
    <div>
      <Sidebar>
        <Outlet/>
      </Sidebar>
    </div>
  )
}
