import React, { useEffect, useState } from 'react';
import { getCurrentUserInfo, setNewPassword2 } from '../../api/account';
import Cookies from 'js-cookie';
import './Profile.css';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSuccess, setPasswordSuccess] = useState(null);
    const [showChangePassword, setShowChangePassword] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = Cookies.get('authToken');
                const data = await getCurrentUserInfo(token);
                console.log("data",data)
                setUserInfo(data);
            } catch (error) {
                setError('Lấy thông tin người dùng thất bại');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handlePasswordChange = async (e) => {}
;
    const handleCheckboxChange = () => {
        setShowChangePassword(!showChangePassword);
    };
    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile">
            <h1>Hồ sơ</h1>
            <div className="profile-section">
                <h2>Thông Tin Cơ Bản</h2>
                <p><strong>Họ và tên:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Địa chỉ:</strong> {userInfo.address}</p>
                <p><strong>Số điện thoại:</strong> {userInfo.phoneNumber}</p>

            </div>
            <div className="profile-section">
                <h2>Chi Tiết Tài Khoản</h2>
                <p><strong>Vai trò:</strong> {userInfo.role}</p>
            </div>

        </div>
    );
};

export default Profile;
