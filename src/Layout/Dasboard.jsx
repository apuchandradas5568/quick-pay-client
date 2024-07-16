import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaEdit,
  FaEnvelope,
  FaHeart,
  FaList,
  FaStreetView,
  FaUser,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FiGitPullRequest } from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";

import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // Assume isAdmin is determined through some authentication logic
  const isAdmin = user?.isAdmin;

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:h-screen w-full lg:w-72 border-r p-4">
          <ul className="menu space-y-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    className="flex gap-2 items-center"
                    to="/user/admin-profile"
                  >
                    <RxDashboard />
                    Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center"
                    to="/user/manage-users"
                  >
                    <FaList />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center"
                    to="/user/approved-contact"
                  >
                    <FiGitPullRequest />
                    Approve Contact Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center"
                    to="/user/approved-premium"
                  >
                    <MdOutlineWorkspacePremium />
                    Approved Premium
                  </NavLink>
                </li>
                <>
                <hr />
                  <li>
                    <NavLink
                      className="flex items-center gap-2"
                      to="/user/profile"
                    >
                      <FaUser />
                      User Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex items-center gap-2"
                      to="/user/edit"
                    >
                      <FaEdit />
                      Edit Biodata
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex items-center gap-2"
                      to="/user/view"
                    >
                      <FaStreetView />
                      View Biodata
                    </NavLink>
                  </li>
                  <li>
                    {/* <NavLink className="flex items-center gap-2" to="/user/contact-request">
                    <FaEnvelope />
                    My Contact Request
                  </NavLink> */}
                  </li>
                  <li>
                    <NavLink
                      className="flex items-center gap-2"
                      to="/user/favorite"
                    >
                      <FaHeart />
                      My Favorite Biodata
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="flex items-center gap-2"
                      to="/user/review"
                    >
                      <FaList />
                      Review
                    </NavLink>
                  </li>
                </>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="flex items-center gap-2"
                    to="/user/profile"
                  >
                    <FaUser />
                    User Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="flex items-center gap-2" to="/user/edit">
                    <FaEdit />
                    Edit Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink className="flex items-center gap-2" to="/user/view">
                    <FaStreetView />
                    View Biodata
                  </NavLink>
                </li>
                <li>
                  {/* <NavLink className="flex items-center gap-2" to="/user/contact-request">
                    <FaEnvelope />
                    My Contact Request
                  </NavLink> */}
                </li>
                <li>
                  <NavLink
                    className="flex items-center gap-2"
                    to="/user/favorite"
                  >
                    <FaHeart />
                    My Favorite Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex items-center gap-2"
                    to="/user/review"
                  >
                    <FaList />
                    Review
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex-1 w-full min-h-screen overflow-auto p-8">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
