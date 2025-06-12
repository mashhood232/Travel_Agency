import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const AddTourModal = ({ isOpen, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    mealIncluded: false,
    price: "",
    days: "",
    travelMode: "bus",
    departureDate: "",
    totalSeats: "",
    selected: false,
    agencyId:user._id ,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tour", formData);
      toast.success("Tour created successfully!");
      onClose();
    } catch (err) {
      toast.error("Error creating tour: " + err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Tour"
      ariaHideApp={false}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Add New Tour
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex  space-x-2">
          <div>
            <label className="block text-gray-600 mb-1">Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="mealIncluded"
              checked={formData.mealIncluded}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
            />
            <label className="text-gray-600">Meal Included</label>
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

        <div className="flex  space-x-2">
          <div>
            <label className="block text-gray-600 mb-1">Days</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Travel Mode</label>
            <select
              name="travelMode"
              value={formData.travelMode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="bus">Bus</option>
              <option value="plane">Plane</option>
            </select>
          </div>
        </div>

        <div className="flex  space-x-2">
          <div>
            <label className="block text-gray-600 mb-1">Departure Date</label>
            <input
              type="datetime-local"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Total Seats</label>
            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            Add Tour
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTourModal;
