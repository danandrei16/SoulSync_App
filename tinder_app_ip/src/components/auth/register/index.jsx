import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../auth';
import './register.css'; // Import the specific CSS file for the Register

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home'); // Navigate after successful registration
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to="/home" replace />}
            <main className="register-main">
                <div className="register-card">
                    <img src="https://i.ibb.co/7RfGh8N/Whats-App-Image-2024-05-11-at-19-47-30-9884f067.jpg" alt="Logo" className="register-logo"/>
                    <h3 className="register-title">Create a New Account</h3>
                    <form onSubmit={onSubmit}>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                        <button type="submit" disabled={isRegistering} className="register-btn">
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="register-link">Already have an account? <Link to="/login">Log in</Link></div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;


