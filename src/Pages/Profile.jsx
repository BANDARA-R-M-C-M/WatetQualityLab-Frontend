import React, { useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../Service/AuthServices';
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { useAuth } from '../Context/useAuth';
import { storage } from '../Util/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaPlusCircle } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";

function Profile() {
    const [userDetails, setUserDetails] = useState({});
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);

    const { token } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(token);
            setUserDetails(response.data);
            setImageUrl(response.data.imageUrl || 'https://via.placeholder.com/150');
        };
        fetchUserDetails();
    }, [token]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        let updatedImageUrl = imageUrl;

        if (image) {
            const storageRef = ref(storage, 'images/' + Date.now() + '_' + image.name);
            await uploadBytes(storageRef, image);
            updatedImageUrl = await getDownloadURL(storageRef);
        }

        const success = await updateUserDetails(
            userDetails.userId,
            userDetails.username,
            userDetails.email,
            userDetails.phoneNumber,
            updatedImageUrl,
            token
        );

        if (success) {
            alert('User details updated successfully');
            setImageUrl(updatedImageUrl); // Update local state with the new image URL
            setUserDetails({ ...userDetails, imageUrl: updatedImageUrl });
        } else {
            alert('User details not updated');
        }

        setOpenEditModal(false);
    };

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
                            <MdEdit size={25} className="cursor-pointer text-gray-600" onClick={() => setOpenEditModal(true)} />
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

            {openEditModal && (
                <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                    <Modal.Header>Update Profile</Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
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
                                <TextInput
                                    id="username"
                                    type="text"
                                    value={userDetails.username || ''}
                                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={userDetails.email || ''}
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="phoneNumber" value="Phone Number" />
                                <TextInput
                                    id="phoneNumber"
                                    type="tel"
                                    value={userDetails.phoneNumber || ''}
                                    onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit">Update</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
}

export default Profile;
