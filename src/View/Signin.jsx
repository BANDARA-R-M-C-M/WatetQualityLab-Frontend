import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import base_url from '../Util/base_url.js';

const LOGIN_URL = '/User/Login';

function Signin() {
    const navigate = useNavigate();

    const userRef = useRef();
    const passwordRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [user, password]);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    useEffect(() => {
        if (success) {
            if (role === 'ADMIN'){
                navigate('/admin');
            }else if (role === 'MLT'){
                navigate('/mlt');
            }else if (role === 'PHI'){
                navigate('/phi');
            }else if (role === 'MOHSupervisor'){
                navigate('/mohsupervisor');
            }else{
                alert('Invalid role');
            }
        }
    }, [success, role, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

            const response = await axios.post(`${base_url}/User/Login`, {
                    username: user,
                    password: password
                }
            ).then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('username', response.data.username);

                // localStorage.setItem('token', response.data.token);
                // dispatch(loginSuccess(response.data.token));
                // navigate('/'); 

                setUser('');
                setPassword('');

                setSuccess(true);
            }).catch((error) => {
                if (!error.response) {
                    setError('No server response');
                    console.log(error);
                } else if (error.response.status === 401) {
                    setError('Invalid username or password');
                } else if (error.response.status === 400) {
                    setError('User not found');
                } else {
                    setError('Login failed');
                }
                errorRef.current.focus();
                // dispatch(loginFailure('Invalid username or password'));
            });
    };

    return (
        <section>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="mt-1 p-2 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={user}
                                ref={userRef}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={password}
                                ref={passwordRef}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-md"
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="mb-4">
                            <p ref={errorRef} className="text-red-500 text-sm">{error}</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Signin;