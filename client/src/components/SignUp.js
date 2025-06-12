import React, { useState } from 'react';
import { signup } from '../service/api'; // Assuming API integration is done here
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    agencyDetails: {
      companyName: '',
      location: '',
      monthlyPackages: '',
      minPackageRate: ''
    }
  });
  const navigate = useNavigate();


  // Handling changes for both user and agency inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('agencyDetails')) {
      const detailName = name.split('.')[1]; // Extracting the specific agency detail
      setFormData({
        ...formData,
        agencyDetails: {
          ...formData.agencyDetails,
          [detailName]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Submit form data based on role (user/agency)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If the role is agency, we include additional agencyDetails in the payload
      if (formData.role === 'agency') {
        await signup({
          ...formData,
          agencyDetails: {
            companyName: formData.agencyDetails.companyName,
            location: formData.agencyDetails.location,
            monthlyPackages: formData.agencyDetails.monthlyPackages,
            minPackageRate: formData.agencyDetails.minPackageRate,
          }
        });
      } else {
        await signup(formData); // call signup API for a user
      }

    } catch (error) {
      console.error('Error during signup', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="user">User</option>
              <option value="agency">Agency</option>
            </select>
          </div>

          {/* Conditional rendering for Agency fields */}
          {formData.role === 'agency' && (
            <div>
              <div>
                <label htmlFor="agencyDetails.companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  id="agencyDetails.companyName"
                  name="agencyDetails.companyName"
                  value={formData.agencyDetails.companyName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="agencyDetails.location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="agencyDetails.location"
                  name="agencyDetails.location"
                  value={formData.agencyDetails.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="agencyDetails.monthlyPackages" className="block text-sm font-medium text-gray-700">Monthly Packages</label>
                <input
                  type="number"
                  id="agencyDetails.monthlyPackages"
                  name="agencyDetails.monthlyPackages"
                  value={formData.agencyDetails.monthlyPackages}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="agencyDetails.minPackageRate" className="block text-sm font-medium text-gray-700">Min Package Rate</label>
                <input
                  type="number"
                  id="agencyDetails.minPackageRate"
                  name="agencyDetails.minPackageRate"
                  value={formData.agencyDetails.minPackageRate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          )}

          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
