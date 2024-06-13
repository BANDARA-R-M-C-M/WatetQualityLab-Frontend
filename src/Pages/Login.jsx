import React from "react";
import { useAuth } from "../Context/useAuth";
import { Button } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required")
        .max(30, 'Name should not exceed 30 characters'),
    password: yup.string().required("Password is required")
        .min(8, 'Password should be at least 8 characters')
        .max(12, 'Password should not exceed 12 characters'),
});

const Login = () => {
    const { loginUser } = useAuth();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await loginUser(values.username, values.password);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-100">
            <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-3/4 max-w-4xl">
                <div className="w-1/2 p-12 flex flex-col justify-center items-start bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Water Quality Testing Laboratory</h2>
                    <p className="text-lg mb-4">
                        Our mission is to ensure the safety and quality of your water through comprehensive testing and detailed reports. Join us in making the environment healthier and safer.
                    </p>
                </div>
                <div className="w-1/2 p-12 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                                    {...formik.getFieldProps('username')}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <Button type="submit" color="blue" className="w-full">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
