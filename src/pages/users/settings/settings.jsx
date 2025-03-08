import React, { useState, useEffect } from 'react';
import { Nav } from '../../../components/Nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = localStorage.getItem('uid');
      const token = localStorage.getItem('idToken');

      if (!uid || !token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`https://bala-canvas.onrender.com/customers/${uid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        setMessage({ type: 'error', content: 'Failed to fetch user data' });
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem('uid');
    const token = localStorage.getItem('idToken');

    try {
      await axios.put(
        `https://bala-canvas.onrender.com/customer/${uid}`,
        {
          phone: userData.phone,
          address: userData.address
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage({ type: 'success', content: 'Profile updated successfully' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', content: 'Failed to update profile' });
    }
  };

return (
  <div style={{ 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '16px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }}>
    <div style={{ 
      padding: '1.5rem',
      borderRadius: '8px',
      backgroundColor: 'white',
      margin: '0 auto'
    }}>
      <Nav />
      <div className="max-w-6xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Account Settings</h2>
          
          {message.content && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.content}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Username - Read only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={userData.username}
                  disabled
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
                />
              </div>

              {/* Email - Read only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
                />
              </div>

              {/* Phone - Editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={userData.phonenumber}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
                />
              </div>

              {/* Address - Editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-white dark:text-gray-800 dark:border-gray-400"
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4 pt-6">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};