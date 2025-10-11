import React, { useContext } from 'react';
import myContext from '../context/myContext';
import ProductsTable from './ProductsTable';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import OrderDetail from './OrderDetail';
import UserDetails from './UserDetails';
import Loading from './Loading';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { myUsers, getAllProducts, myOrder, loading } = context;

  if (loading) return <Loading />;

  return (
    <div className="p-4 lg:p-8">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            className="w-24 sm:w-32"
            src="https://www.svgrepo.com/show/192244/man-user.svg"
            alt="Admin"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Tabs */}
      <Tabs>
        <TabList className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Tab className="cursor-pointer">
            <div className="bg-white p-6 rounded-lg border text-center hover:shadow-md transition-all">
              <i className="ri-shopping-basket-2-line text-3xl text-emerald-500 mb-3"></i>
              <p className="text-2xl font-bold">{getAllProducts?.length}</p>
              <p className="text-gray-600">Products</p>
            </div>
          </Tab>

          <Tab className="cursor-pointer">
            <div className="bg-white p-6 rounded-lg border text-center hover:shadow-md transition-all">
              <i className="ri-list-ordered text-3xl text-emerald-500 mb-3"></i>
              <p className="text-2xl font-bold">{myOrder?.length}</p>
              <p className="text-gray-600">Orders</p>
            </div>
          </Tab>

          <Tab className="cursor-pointer">
            <div className="bg-white p-6 rounded-lg border text-center hover:shadow-md transition-all">
              <i className="ri-group-fill text-3xl text-emerald-500 mb-3"></i>
              <p className="text-2xl font-bold">{myUsers.length}</p>
              <p className="text-gray-600">Users</p>
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <ProductsTable />
        </TabPanel>

        <TabPanel>
          <OrderDetail />
        </TabPanel>

        <TabPanel>
          <UserDetails />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;