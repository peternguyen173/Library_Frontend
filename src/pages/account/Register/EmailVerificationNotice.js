import React from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
//import './EmailVerificationNotice.css'; // Optional CSS for styling

function EmailVerificationNotice() {

    return (
        <MDBContainer fluid className="bg-dark" style={{ height: '100vh' }}>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol md="6" lg="4" xl="3">
                    <MDBCard className="bg-secondary text-white" style={{ borderRadius: '1rem' }}>
                        <MDBCardBody className="p-4 text-center">
                            <h2 className="fw-bold mb-4 text-uppercase">Xác thực email của bạn
                            </h2>
                            <p className="text-white-50 mb-5">
                                Một email xác thực đã được gửi đến địa chỉ email đã đăng ký của bạn. Vui lòng kiểm tra email và làm theo hướng dẫn để kích hoạt tài khoản của bạn!                            </p>
                            <a href="/"><p>Quay lại trang chủ</p> {/* Button to go back to home */}</a>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default EmailVerificationNotice;
