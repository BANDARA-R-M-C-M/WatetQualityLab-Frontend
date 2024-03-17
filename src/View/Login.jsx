import React, {useState} from "react";

function Login(){
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [validate, setValidate] = useState(false);
      
        const handleLogin = (e) => {
          e.preventDefault();
          // Here you can add your login logic, such as authentication with backend
          console.log('Logging in with username:', username, 'and password:', password);
    };

    return(
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                    <input
                    type="text"
                    id="username"
                    className="mt-1 p-2 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                    type="password"
                    id="password"
                    className="mt-1 p-2 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                >
                    Login
                </button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Login