import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // For formatting dates
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Users = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [review, setReview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTours = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tour`);
      setTours(response.data.tours);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const selectTour = async (tourId, userId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tour/select/${tourId}`,
        { userId }
      );
      toast.success("Tour selected successfully!");
      fetchTours(); // Refresh the tour list
    } catch (err) {
      console.error("Error selecting tour:", err.message);
    }
  };

  const handleAddReview = async (tourId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/tour/${tourId}/review`,
        { review: { username: user.name, reviewText: review } }
      );
      toast.success("Review added successfully!");
      setShowModal(false);
      fetchTours(); // Refresh the tour list
    } catch (err) {
      console.error("Error adding review:", err);
      toast.error("Error adding review.");
    }
  };

  const getReviews = (tourId) => {
    const tour = tours.find((tour) => tour._id === tourId);
    return tour ? tour.reviews : [];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tour List</h2>
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
                      <button
                        onClick={() => selectTour(tour._id, user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium px-2 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        Select Tour
                      </button>

                      {/* Review Button */}
                      <button
                        onClick={() => {
                          setSelectedTour(tour._id);
                          setShowModal(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-2 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Add Review
                      </button>
                    </div>

                    {/* Show reviews */}
                    <div className="mt-4">
                      <h4 className="font-semibold">Reviews:</h4>
                      {getReviews(tour._id).length === 0 && (
                        <p>No reviews yet.</p>
                      )}
                      {getReviews(tour._id).map((review, index) => (
                        <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
                          <p className="font-semibold">{review.username}:</p>
                          <p>{review.reviewText}</p>
                        </div>
                      ))}
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

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Add Review</h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Write your review here..."
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={() => handleAddReview(selectedTour)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
