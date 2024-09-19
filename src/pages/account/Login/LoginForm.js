import React, { useState } from 'react';
import Cookies from "js-cookie";
import { signIn, signInAdmin } from '../../../api/auth'; // Import signInAdmin
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleToggleChange = (e) => setIsAdmin(e.target.checked);

    const validateInputs = () => {
        let valid = true;
        let emailError = '';
        let passwordError = '';

        if (!email) {
            emailError = 'Email is required';
            valid = false;
        }

        if (!password) {
            passwordError = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            passwordError = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors({ email: emailError, password: passwordError });
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            try {
                const response = isAdmin ? await signInAdmin(email, password) : await signIn(email, password);
                console.log("res", response);
                if (response && response.jwt) {
                    const role = isAdmin ? 'admin' : 'user';
                    const username = response.email;

                    // Store user data in cookies
                    const userData = { userRole: role, username };
                    Cookies.set('auth', JSON.stringify(userData), { expires: 1 });
                    Cookies.set('authToken', response.jwt, { expires: 1 });

                    toast.success("Đăng nhập thành công!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    toast.error("Login failed. Please try again.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            } catch (e) {
                toast.error(e.response?.data || "Login failed. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setApiError(e.response?.data || "Login failed. Please try again.");
            }
        }
    };

    return (
        <MDBContainer fluid className="bg-dark" style={{ height: "100vh" }}>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol md='6' lg='4' xl='3'>
                    <MDBCard className='bg-secondary text-white' style={{ borderRadius: '1rem' }}>
                        <MDBCardBody className='p-4'>
                            <h2 className="fw-bold mb-4 text-uppercase text-center">Đăng nhập</h2>
                            <p className="text-white-50 text-center mb-5">Vui lòng nhập email và mật khẩu!</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 w-100">
                                    <label htmlFor="email" className="form-label text-white">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                </div>

                                <div className="mb-4 w-100">
                                    <label htmlFor="password" className="form-label text-white">Mật khẩu</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                </div>
                                {apiError && <div className="text-danger mb-3">{apiError}</div>}

                                <div className="toggle-container mb-4">
                                    <input
                                        type="checkbox"
                                        id="isAdmin"
                                        className="toggle-input"
                                        checked={isAdmin}
                                        onChange={handleToggleChange}
                                    />
                                    <label className="toggle-label1" htmlFor="isAdmin">
                                        Đăng nhập với tư cách Admin?
                                    </label>
                                </div>

                                <button type="submit" className="custom-login-button btn btn-primary">
                                    Đăng nhập
                                </button>
                            </form>

                            <p className="text-center mt-4">
                                Chưa có tài khoản? <a href="/signup" className="text-info">Đăng ký</a>
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <ToastContainer />
        </MDBContainer>
    );
}

export default LoginForm;
