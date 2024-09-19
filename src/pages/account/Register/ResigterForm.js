import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./RegisterForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { signUp } from '../../../api/auth'; // Import the signup function

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState(''); // New state for name
    const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
    const [address, setAddress] = useState(''); // New state for address
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', name: '', phoneNumber: '', address: '' });
    const [apiError, setApiError] = useState(''); // State for API error handling
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state for button disable
    const navigate = useNavigate(); // Initialize the navigate function

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const validateInputs = () => {
        let valid = true;
        let emailError = '';
        let passwordError = '';
        let confirmPasswordError = '';
        let nameError = '';
        let phoneNumberError = '';

        // Validate email
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!email) {
            emailError = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(email)) {
            emailError = 'Email address is invalid';
            valid = false;
        }

        // Validate password
        if (!password) {
            passwordError = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            passwordError = 'Password must be at least 6 characters';
            valid = false;
        }

        // Validate confirm password
        if (confirmPassword !== password) {
            confirmPasswordError = 'Passwords do not match';
            valid = false;
        }

        // Validate name
        if (!name) {
            nameError = 'Name is required';
            valid = false;
        }

        // Validate phone number
        const phoneNumberRegex = /^\d+$/;
        if (!phoneNumber) {
            phoneNumberError = 'Phone number is required';
            valid = false;
        } else if (!phoneNumberRegex.test(phoneNumber)) {
            phoneNumberError = 'Phone number is invalid';
            valid = false;
        }

        // Validate address

        setErrors({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError, name: nameError, phoneNumber: phoneNumberError });
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            try {
                // Disable the button
                setIsButtonDisabled(true);

                // Calling the signUp function with all the user's data
                const response = await signUp({ email, password, name, phoneNumber });

                // Show success toast and redirect
                toast.success("Email xác thực đã được gửi!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                // Clear form fields
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setName('');
                setPhoneNumber('');
                setAddress(''); // Reset address field if used

                // Redirect to home page after a short delay
                setTimeout(() => {
                    navigate('/verify-email');
                }, 3000);

            } catch (error) {
                // Handle API errors
                toast.error(error.response?.data?.jwt, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setApiError(error.response?.data?.jwt || "Registration failed. Please try again.");
                console.error("Error during signup:", error);
            } finally {
                // Re-enable the button after 2 seconds
                setTimeout(() => {
                    setIsButtonDisabled(false);
                }, 3000);
            }
        }
    };

    return (
        <MDBContainer fluid className="bg-dark" style={{ height: "100vh" }}>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol md='6' lg='4' xl='3'>
                    <MDBCard className='bg-secondary text-white' style={{ borderRadius: '1rem' }}>
                        <MDBCardBody className='p-4'>
                            <h2 className="fw-bold mb-4 text-uppercase text-center">Đăng ký</h2>
                            <p className="text-white-50 text-center ">Nhập thông tin để đăng ký!</p>
                            <form onSubmit={handleSubmit}>
                                <div className="w-100">
                                    <label htmlFor="name" className="form-label text-white">Tên</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                </div>

                                <div className="w-100">
                                    <label htmlFor="phoneNumber" className="form-label text-white">Số điện thoại</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        className={`form-control form-control-lg ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                    />
                                    {errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber}</div>}
                                </div>

                                <div className="w-100">
                                    <label htmlFor="email" className="form-label text-white">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                </div>

                                <div className="w-100">
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

                                <div className="w-100">
                                    <label htmlFor="confirmPassword" className="form-label1 text-white">Xác nhận mật khẩu</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                                </div>

                                {apiError && <div className="text-danger mb-3">{apiError}</div>}

                                <button type="submit" className="custom-register-button" disabled={isButtonDisabled}>
                                    Đăng ký
                                </button>
                            </form>

                            <br />

                            <div className='text-center'>
                                <p className="mb-0">Đã có tài khoản? <a href="/signin" className="text-white-50 fw-bold">Đăng nhập</a></p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <ToastContainer />
        </MDBContainer>
    );
}

export default RegisterForm;
