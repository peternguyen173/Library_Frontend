import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { clearUserInfo } from "../../redux/auth/Action";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const dispatch = useDispatch();

    // Kiểm tra nếu người dùng đã đăng nhập
    const isLoggedIn = Cookies.get('auth') !== undefined;

    // Lấy thông tin từ cookie và phân tích cú pháp để lấy role
    const getRoleFromCookies = () => {
        const authCookie = Cookies.get('auth');
        if (authCookie) {
            try {
                const authData = JSON.parse(authCookie);
                return authData.userRole || null; // Lấy role từ cookie
            } catch (error) {
                console.error("Không thể phân tích cú pháp cookie 'auth':", error);
                return null;
            }
        }
        return null;
    };

    const role = getRoleFromCookies();

    // Kiểm tra nếu token tồn tại trong cookie
    useEffect(() => {
        const token = Cookies.get('authToken');
    }, []); // Empty dependency array to run only on mount

    const toggleSidebar = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const logout = () => {
        Cookies.remove('authToken');
        Cookies.remove('auth');

        console.log('Đăng xuất');
        dispatch(clearUserInfo());
        window.location.href = "/";
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <h3 className={`sidebar-title ${isOpen ? 'hidden' : ''}`}>Thư viện ABC</h3>
                <div className="toggle-btn" onClick={toggleSidebar}>
                    <i className={`fas ${isOpen ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                </div>
            </div>
            {!isLoggedIn &&
                <ul className="list-unstyled components">
                    <li>
                        <a href="/signin" className="sidebar-link">
                            <i className={`fas fa-sign-in ${isOpen ? 'hidden' : ''}`}></i>
                            <span className={`link-text ${isOpen ? 'hidden' : ''}`}>Đăng nhập</span>
                        </a>
                    </li>
                </ul>
            }
            {isLoggedIn &&
                <ul className="list-unstyled components">
                    <li>
                        <a href="/" className="sidebar-link">
                            <i className={`fas fa-home ${isOpen ? 'hidden' : ''}`}></i>
                            <span className={`link-text ${isOpen ? 'hidden' : ''}`}>Trang chủ</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard" className="sidebar-link">
                            <i className={`fas fa-book ${isOpen ? 'hidden' : ''}`}></i>
                            <span className={`link-text ${isOpen ? 'hidden' : ''}`}>Danh sách sách</span>
                        </a>
                    </li>
                    <li>
                        <a href="/profile" className="sidebar-link">
                            <i className={`fas fa-user ${isOpen ? 'hidden' : ''}`}></i>
                            <span className={`link-text ${isOpen ? 'hidden' : ''}`}>Tài khoản</span>
                        </a>
                    </li>
                    {role === 'admin' && (
                        <li>
                            <a href="#" onClick={() => toggleDropdown('book')} className="sidebar-link">
                                <div className="link-wrapper">
                                    <i className={`fas fa-book ${isOpen ? 'hidden' : ''}`}></i>
                                    <span className={`link-text ${isOpen ? 'hidden' : ''}`}>Quản lý sách</span>
                                </div>
                                <i className={`fas fa-chevron-down dropdown-icon ${activeDropdown === 'book' ? 'rotate' : ''} ${isOpen ? 'hidden' : ''}`}></i>
                            </a>
                            <ul className={`list-unstyled ${activeDropdown === 'book' ? 'show' : ''}`}>
                                <li><a href="/book/addbook" className={`dropdown-item ${isOpen ? 'hidden' : ''}`}>Thêm
                                    sách</a></li>
                                <li><a href="/book/managebook" className={`dropdown-item ${isOpen ? 'hidden' : ''}`}>Quản
                                    lý sách</a></li>
                            </ul>
                        </li>
                    )}
                    <li>
                        <a href="#" className="sidebar-link" onClick={logout}>
                            <i className={`fas fa-power-off ${isOpen ? 'hidden' : ''}`}></i>
                            <span className={`link-text ${isOpen ? 'hidden' : ''}`}>Đăng xuất</span>
                        </a>
                    </li>
                </ul>
            }
        </div>
    );
};

export default Sidebar;
