import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import ProductCards from "./Components/ProductCards"
import Testimonials from "./Components/Testimonials"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GetAllProudcts from "./Components/GetAllProudcts"
import ProductInfo from "./Components/ProductInfo"
import CartPage from "./Components/CartPage"
import AddAddress from "./Components/AddAddress"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyState from "./context/myState"
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import UserDashboard from "./Components/UserDashboard"
import AdminDashboard from "./Components/AdminDashboard"
import ProtectedRouteForUser from "./Components/ProtectedRouteForUser"
import ProtectedRouteForAdmin from "./Components/ProtectedRouteForAdmin"
import AddProduct from "./Components/AddProduct"
import UpdateProduct from "./Components/UpdateProduct"
import Category from "./Components/Category"
import CategoryPage from "./Components/CategoryPage"
import OrderDetail from "./Components/OrderDetail"
import HamburgerMenu from "./Components/HamburgerMenu"

function App() {

  return (
    <>
      <MyState>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<GetAllProudcts/>}/>
            <Route path="/product/:id" element={<ProductInfo/>}/>
            <Route path="/cart" element={
              <ProtectedRouteForUser>
                <CartPage/>
              </ProtectedRouteForUser>
            }/>
            <Route path="/address" element={<AddAddress/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/user-dashboard" element={
              <ProtectedRouteForUser>
                <UserDashboard/>
              </ProtectedRouteForUser>
            }/>
            <Route path="/admin-dashboard" element={
              <ProtectedRouteForAdmin>
                <AdminDashboard/>
              </ProtectedRouteForAdmin>
            }/>
            <Route path="/addProduct" element={
              <ProtectedRouteForAdmin>
                <AddProduct/>
              </ProtectedRouteForAdmin>
            }/>
            <Route path="/update/:id" element={
              <ProtectedRouteForAdmin>
                <UpdateProduct/>
              </ProtectedRouteForAdmin>
            }/>
            <Route path="/category/:categoryname" element={<CategoryPage/>}/>
            <Route path="/order" element={<OrderDetail/>}/>
          </Routes>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        </BrowserRouter>
      </MyState>
    </>
  )
}

export default App