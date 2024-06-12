import React, { useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../Service/AuthServices';
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { useAuth } from '../Context/useAuth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { storage } from '../Util/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaPlusCircle } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';

function Profile() {
    const [userDetails, setUserDetails] = useState({});
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);

    const { token } = useAuth();

    const validationSchema = yup.object({
        userName: yup.string().required('Name is required')
            .max(30, 'Name should not exceed 30 characters'),
        email: yup.string().required('Email is required')
            .email('Invalid email address'),
        phoneNumber: yup.string().required('Telephone is required')
            .matches(/^\d{10}$/, 'Invalid phone number format')
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(token);
            setUserDetails(response.data);
            setImageUrl(response.data.imageUrl || 'https://via.placeholder.com/150');
        };
        fetchUserDetails();
    }, [openEditModal]);

    const formikEdit = useFormik({
        initialValues: {
            userName: '',
            email: '',
            phoneNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let updatedImageUrl = imageUrl;

            if (image) {
                const storageRef = ref(storage, 'images/' + Date.now() + '_' + image.name);
                await uploadBytes(storageRef, image);
                updatedImageUrl = await getDownloadURL(storageRef);
                setImageUrl(updatedImageUrl);
            }
            await updateUserDetails(
                userDetails.userId,
                values.userName,
                values.email,
                values.phoneNumber,
                updatedImageUrl,
                token
            );

            formikEdit.resetForm();
            setOpenEditModal(false);
        },
    });

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="flex">
            <div className="flex-grow p-6 flex justify-center">
                <div className="w-2/3 bg-white flex-col items-center shadow-md rounded-lg p-6 flex">
                    <div className="relative w-80 h-80 mr-6">
                        <img className="w-80 h-80 rounded-full object-cover" src={imageUrl} alt="Profile" />
                    </div>
                    <div className="flex flex-col justify-center text-left flex-grow">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-semibold">User Profile</h2>
                            <MdEdit size={25} className="cursor-pointer text-gray-600" onClick={() => {
                                setOpenEditModal(true);
                                formikEdit.setValues({
                                    userName: userDetails.username,
                                    email: userDetails.email,
                                    phoneNumber: userDetails.phoneNumber
                                });
                            }} />
                        </div>
                        <div className="flex mt-4">
                            <div className="grid grid-rows-3 gap-4 w-full">
                                <div className="flex flex-col">
                                    <span className="text-gray-600 font-bold">Username</span>
                                    <span className="text-gray-800">{userDetails.username}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-600 font-bold">Mobile</span>
                                    <span className="text-gray-800">{userDetails.phoneNumber}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-600 font-bold">E - mail</span>
                                    <span className="text-gray-800">{userDetails.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Update Profile</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formikEdit.handleSubmit} className="flex flex-col gap-4">
                        <div className="flex justify-center mb-4">
                            <div className="relative w-40 h-40">
                                <img className="w-40 h-40 rounded-full border-4 border-white" src={imageUrl} alt="Profile" />
                                <FaPlusCircle
                                    className="absolute bottom-0 right-0 text-blue-500 text-3xl cursor-pointer"
                                    onClick={() => document.getElementById('fileInput').click()}
                                />
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="username" value="Username" />
                            <input
                                id="userName"
                                type="text"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.userName && formikEdit.errors.userName ? 'border-red-500' : ''}`}
                                {...formikEdit.getFieldProps('userName')}
                            />
                            {formikEdit.touched.userName && formikEdit.errors.userName ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.userName}</p>
                            ) : null}
                        </div>
                        <div>
                            <Label htmlFor="email" value="Email" />
                            <input
                                id="email"
                                type="email"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.email && formikEdit.errors.email ? 'border-red-500' : ''}`}
                                {...formikEdit.getFieldProps('email')}
                            />
                            {formikEdit.touched.email && formikEdit.errors.email ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.email}</p>
                            ) : null}
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber" value="Phone Number" />
                            <input
                                id="phoneNumber"
                                type="tel"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formikEdit.touched.phoneNumber && formikEdit.errors.phoneNumber ? 'border-red-500' : ''}`}
                                {...formikEdit.getFieldProps('phoneNumber')}
                            />
                            {formikEdit.touched.phoneNumber && formikEdit.errors.phoneNumber ? (
                                <p className="text-red-500 text-xs italic">{formikEdit.errors.phoneNumber}</p>
                            ) : null}
                        </div>
                        <Button type="submit">Update</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Profile;
