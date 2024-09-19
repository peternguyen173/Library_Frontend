import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        // Check if the auth cookie exists
        const data = Cookies.get('auth');
        let username;
        if(data){
         username = JSON.parse(data).username;}

        if (username) {
            // If the cookie exists, redirect to /dashboard
            navigate('/dashboard');
        } else {
            // If the cookie does not exist, redirect to /signin
            navigate('/signin');
        }
    };

    return (
        <div className="home-container">
            <div className="welcome-box">
                <h1 className="welcome-heading">Chào mừng đến với thư viện ABC</h1>
                <p className="welcome-message">
                    Chúng tôi cung cấp hàng ngàn cuốn sách cho bạn đọc. Khám phá ngay và tận hưởng thế giới tri thức!
                </p>
                <button onClick={handleExploreClick} className="explore-button">
                    Khám Phá Ngay
                </button>
            </div>
        </div>
    );
};

export default Home;
