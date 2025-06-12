import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import moment from "moment"; // For formatting dates
import toast from "react-hot-toast";
import AddTourModal from "./AddTourModal";

const Agency = () => {
  const [tours, setTours] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTours = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tour/${user._id}`
      );
      setTours(response.data.tours);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    fetchTours();
  };

  useEffect(() => {
    fetchTours();
  }, [user._id]);

  const handleOpen = (tourId) => {
    setModalOpen(true);
  };

  const handleDelete = async (tourId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tour/${tourId}`);
      setTours(tours.filter((tour) => tour._id !== tourId));
      toast.success("Tour deleted successfully");
    } catch (err) {
      toast.error("Error deleting tour.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Tour List
          </h2>
          <button
            onClick={() => handleOpen()}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Add Tour
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Source</th>
                <th className="py-3 px-6 text-left">Destination</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Days</th>
                <th className="py-3 px-6 text-left">Travel Mode</th>
                <th className="py-3 px-6 text-left">Departure Date</th>
                <th className="py-3 px-6 text-left">Total Seats</th>
                <th className="py-3 px-6 text-left">Meals Included</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {tours.map((tour) => (
                <tr
                  key={tour._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{tour.source}</td>
                  <td className="py-3 px-6 text-left">{tour.destination}</td>
                  <td className="py-3 px-6 text-left">${tour.price}</td>
                  <td className="py-3 px-6 text-left">{tour.days}</td>
                  <td className="py-3 px-6 text-left">{tour.travelMode}</td>
                  <td className="py-3 px-6 text-left">
                    {moment(tour.departureDate).format("MMMM Do YYYY, h:mm A")}
                  </td>
                  <td className="py-3 px-6 text-left">{tour.totalSeats}</td>
                  <td className="py-3 px-6 text-left">
                    {tour.mealIncluded ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center items-center space-x-4">
                      {/* <FaEdit
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleEdit(tour._id)}
                      /> */}
                      <FaTrashAlt
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => handleDelete(tour._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tours.length === 0 && (
          <p className="text-gray-500 text-center mt-6">No tours found.</p>
        )}
      </div>

      <AddTourModal isOpen={modalOpen} onClose={handleClose} />
    </div>
  );
};

export default Agency;
