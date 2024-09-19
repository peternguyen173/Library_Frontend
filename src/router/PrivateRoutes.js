// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ role, element }) => {
    const userRole = useSelector(state => state.authReducer.admin); // Lấy role của người dùng từ Redux store

    if (userRole !== role) {
        return <Navigate to="/unauthorized" />; // Điều hướng đến trang không được phép nếu không có quyền
    }

    return element;
};

export default PrivateRoute;
