import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from "./components/shared/header/Header.component.jsx";
import Footer from "./components/shared/footer/Footer.component.jsx";
import HomePage from "./pages/home-page/HomePage.component.jsx";
import BookPage from "./pages/book-page/BookPage.component.jsx";
import SignupPage from "./pages/signup-page/SignupPage.component.jsx";
import LoginPage from "./pages/login- page/LoginPage.component.jsx";
import CartPage from "./pages/cart-page/CartPage.component.jsx";
import PageNotFound from "./pages/page-not-found/PageNotFound.component.jsx";
import AdminPage from "./pages/admin-page/AdminPage.component.jsx";
import AdminDashboardPage from "./pages/admin-dashboard-page/AdminDashboardPage.component.jsx";

import AuthContextProvider from "./contexts/Auth.context.jsx";
import CartContextProvider from "./contexts/Cart.context.jsx";
import AdminContextProvider from "./contexts/Admin.context.jsx";
import BookContextProvider from "./contexts/Book.context.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <BookContextProvider>
            <AdminContextProvider>
              <Header/>

              <Routes>
                <Route path="" element={<HomePage/>}/>
                <Route path="books/:bookID" element={<BookPage/>}/>
                <Route path="signup" element={<SignupPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="cart" element={<CartPage/>}/>
                <Route path="admin" element={<AdminPage/>}/>
                <Route path="admin/dashboard" element={<AdminDashboardPage/>}/>
                <Route path="*" element={<PageNotFound/>}/>        
              </Routes>

              <Footer/>
            </AdminContextProvider>
          </BookContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
