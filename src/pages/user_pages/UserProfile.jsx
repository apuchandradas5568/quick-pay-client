import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const {user} = useContext(AuthContext)


  const photo = user?.photoURL


    return (
        <div className=" p-4 ring-1 rounded ring-orange-400">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className=" p-4 rounded ">
                <p className="text-lg font-semibold">Name: {user?.displayName}</p>
                <p className="text-lg font-semibold">Email: {user?.email}</p>
                <img src={photo} alt="Profile" className="w-32 h-32 object-cover rounded-full m-4" />
            </div>
        </div>
    );
};

export default UserProfile;