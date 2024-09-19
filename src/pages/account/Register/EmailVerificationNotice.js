import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './EmailVerificationNotice.css'; // Optional CSS for styling

function EmailVerificationNotice() {
    return (
        <MDBContainer fluid className="bg-dark" style={{ height: '100vh' }}>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol md="6" lg="4" xl="3">
                    <MDBCard className="bg-secondary text-white" style={{ borderRadius: '1rem' }}>
                        <MDBCardBody className="p-4 text-center">
                            <h2 className="fw-bold mb-4 text-uppercase">Verify Your Email</h2>
                            <p className="text-white-50 mb-5">
                                A verification email has been sent to your registered email address. Please check your email and follow the instructions to activate your account.
                            </p>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default EmailVerificationNotice;
