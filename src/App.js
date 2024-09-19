import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import Sidebar from "./components/Navbar/Sidebar";
import LoginForm from "./pages/account/Login/LoginForm";
import RegisterForm from "./pages/account/Register/ResigterForm";
import Profile from "./pages/profile/Profile";
import DashBoard from "./pages/DashBoard/DashBoard";
import CreateBook from "./pages/book/createbook/CreateBook";
import ViewBook from "./pages/book/viewbook/ViewBook";
import ManageBook from "./pages/book/managebook/ManageBook";
import EditBook from "./pages/book/updatebook/EditBook";
import EmailVerificationNotice from "./pages/account/Register/EmailVerificationNotice";
import { useSelector } from 'react-redux';
import Home from "./pages/Home/Home";
import Cookies from "js-cookie"; // Import to access Redux store

function App() {
    // Get isLoggedIn from the Redux store
    const isLoggedIn = Cookies.get('auth') !== undefined;
    console.log("applog",isLoggedIn);

    return (
        <Router>
            <Routes>
                {/* Always allow access to the signin and signup routes */}
                <Route path="/signin" element={<LoginForm />} />
                <Route path="/signup" element={<RegisterForm />} />
                <Route path="/verify-email" element={<EmailVerificationNotice />} />

                <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                </Route>
                {/* Only render protected routes if the user is logged in */}
                {isLoggedIn ? (
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/profile/" element={<Profile />} />
                        <Route path="/book/addbook" element={<CreateBook />} />
                        <Route path="/book/:id" element={<ViewBook />} />
                        <Route path="/book/managebook" element={<ManageBook />} />
                        <Route path="/book/editbook/:id" element={<EditBook />} />
                    </Route>
                ) : (
                    // Redirect to signin if not logged in and trying to access a protected route

                    <Route path="*" element={<Navigate to="/" />} />
                )
                }
            </Routes>
        </Router>
    );
}

export default App;
