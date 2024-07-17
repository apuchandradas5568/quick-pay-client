import React, { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar'

import { useLocation } from 'react-router-dom';
import Overview from '../pages/Overview';
import AllTransaction from '../pages/admin_pages/AllTransaction';
import UserManagement from '../pages/admin_pages/UserManagement';
import TransactMoney from '../pages/TransactMoney';


const Dashboard = () => {

    const location = useLocation();
    const [tab, setTab] = useState();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      if(tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);


  return (
    <div className="min-h-[800px] lg:p-12 mx-auto flex flex-col md:flex-row ">
      {/* sidebar */}
      <div className="md:w-72  border-r  md:h-[800px]  p-6">
        <DashSidebar />
      </div>
    
        <div className='flex-1   p-6' >
        {tab === 'overview' && <Overview />}
        {tab === 'all-transactions' && <AllTransaction />}
        {tab === 'user-management' && <UserManagement />}
        {tab === 'make-transactions' && <TransactMoney />}
       {/*  {tab === 'manage-users' && <ManageUsers />}
        {tab === 'add-products' && <AddProducts />}
        {tab === 'manage-products' && <ManageProducts />}
        {tab === 'app-customization' && <AppCustomization />}
 */}

        </div>

    </div>
  )
}

export default Dashboard