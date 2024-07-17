import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import {
  FaTachometerAlt,
  FaUsers,
  FaPlus,
  FaBoxes,
  FaCog,
  FaHistory,
  FaMoneyBill,
  FaOutdent,
  FaLongArrowAltUp,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
       navigate('/login')
    }
  }, [user, axios]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const logOut = () => {
    localStorage.removeItem("quickPayUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="">
      <div>
        <Link to="/?tab=overview">
          <SidebarItem active={tab === "overview" || false}>
            <FaTachometerAlt className="mr-2 text-xl " /> Overview
          </SidebarItem>
        </Link>

        <Link to="/?tab=make-transactions">
          <SidebarItem active={tab === "make-transactions" || false}>
            <FaMoneyBill className="mr-2 text-xl " /> Make Transactions
          </SidebarItem>
        </Link>
        {user?.role === "Admin" && (
          <Link to="/?tab=user-management">
            <SidebarItem active={tab === "user-management" || false}>
              <FaUsers className="mr-2 text-xl " /> Users Management
            </SidebarItem>
          </Link>
        )}

        <Link to="/?tab=all-transactions">
          <SidebarItem active={tab === "all-transactions" || false}>
            <FaHistory className="mr-2 text-xl " /> All Transactions
          </SidebarItem>
        </Link>
      </div>

      <div onClick={logOut}>
        <SidebarItem>
          <FaSignOutAlt className="mr-2 text-xl" /> Logout
        </SidebarItem>
      </div>
    </div>
  );
};

export default DashSidebar;
