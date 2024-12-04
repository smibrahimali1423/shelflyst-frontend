import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function TermsModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
<Modal.Header closeButton>
    <Modal.Title style={{ textAlign: 'center' }}>Terms of Service</Modal.Title>
</Modal.Header>
            <Modal.Body>
                <h5>Effective Date: September 15, 2024</h5>
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <ol style={{ listStyleType: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '2rem' }}>
                            <strong>Acceptance of Terms</strong><br />
                            By accessing or using the Service, you agree to comply with and be legally bound by these Terms and all applicable laws and regulations. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                        </li>
                        <li style={{ marginBottom: '2rem' }}>
                            <strong>Changes to the Terms</strong><br />
                            We reserve the right to modify these Terms at any time. We will notify you of any significant changes by posting the new Terms on our website and updating the effective date. Continued use of the Service after such changes constitutes acceptance of the revised Terms.
                        </li>
                        <li style={{ marginBottom: '2rem' }}>
                            <strong>Password Security</strong><br />
                            All passwords provided to Shelflyst are stored in an encrypted format using industry-standard encryption methods to protect your privacy and data. We ensure that your personal data will not be used for marketing, spam emails, promotions, or sold to third parties.
                        </li>
                        <li style={{ marginBottom: '2rem' }}>
                            <strong>Use of the Service</strong><br />
                            You agree to use the Service only for lawful purposes and in compliance with all applicable laws and regulations. You may not:
                            <ul style={{ listStyleType: 'none', paddingLeft: '1em' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Use the Service in any way that violates applicable laws or regulations.</li>
                                <li style={{ marginBottom: '0.5rem' }}>Engage in any unauthorized use of the Service, including collecting users' personal information.</li>
                                <li style={{ marginBottom: '0.5rem' }}>Attempt to interfere with or compromise the integrity or security of the Service.</li>
                            </ul>
                            The software and platform have been developed by <strong>Syed Mohammed Ibrahim Ali</strong> and are intended for free use by the public, unless otherwise specified.
                        </li>
                        <li style={{ marginBottom: '2rem' }}>
                            <strong>Termination</strong><br />
                            We reserve the right to suspend or terminate your access to the Service at any time, without notice, if you violate these Terms or engage in any activity that we deem harmful to the Service or other users.
                        </li>
                        <li style={{ marginBottom: '2rem' }}>
                            <strong>Limitation of Liability</strong><br />
                            To the maximum extent permitted by law, Shelflyst shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use or inability to use the Service, even if we have been advised of the possibility of such damages.
                        </li>
                        <li>
                            <strong>Contact Us</strong><br />
                            If you have any questions about these Terms, please contact us at:<br />
                            <a href="mailto:sm.ibrahimali1423@gmail.com">sm.ibrahimali1423@gmail.com</a>
                        </li>
                    </ol>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TermsModal;
