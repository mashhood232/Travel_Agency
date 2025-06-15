const User = require("../models/auth");
const Tour = require("../models/tour");

exports.createTour = async (req, res) => {
  try {
    const {
      source,
      destination,
      mealIncluded,
      price,
      days,
      travelMode,
      departureDate,
      totalSeats,
      agencyId,
    } = req.body;

    const newTour = new Tour({
      source,
      destination,
      mealIncluded,
      price,
      days,
      travelMode,
      departureDate,
      totalSeats,
      agencyId,
    });

    const savedTour = await newTour.save();
    res
      .status(201)
      .json({ message: "Tour created successfully", tour: savedTour });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating tour", error: err.message });
  }
};

exports.getTours = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user to check their role
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let tours;

    if (user.role === "user") {
      // For users, find tours linked to this agency
      tours = await Tour.find({ agencyId: userId });
    } else if (user.role === "agency") {
      // For agencies, find tours linked to their ID
      tours = await Tour.find({ agencyId: userId });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!tours || tours.length === 0) {
      return res.status(404).json({ message: "No tours found" });
    }

    return res.status(200).json({ tours });
  } catch (err) {
    console.error("Error fetching tours:", err.message);
    res.status(500).json({
      message: "Error fetching tours",
      error: err.message,
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    let tours;

    tours = await Tour.find();

    if (!tours || tours.length === 0) {
      return res.status(404).json({ message: "No tours found" });
    }

    return res.status(200).json({ tours });
  } catch (err) {
    console.error("Error fetching tours:", err.message);
    res.status(500).json({
      message: "Error fetching tours",
      error: err.message,
    });
  }
};

exports.editTour = async (req, res) => {
  const { tourId } = req.params;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      { ...req.body },
      { new: true }
    );
    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res
      .status(200)
      .json({ message: "Tour updated successfully", tour: updatedTour });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating tour", error: err.message });
  }
};

// Delete a tour
exports.deleteTour = async (req, res) => {
  const { tourId } = req.params;
  try {
    const deletedTour = await Tour.findByIdAndDelete(tourId);
    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting tour", error: err.message });
  }
};

exports.selectTour = async (req, res) => {
  const { tourId } = req.params;
  const { userId } = req.body; 

  try {
    const tour = await Tour.findById(tourId);
    
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    if (tour.totalSeats <= 0) {
      return res.status(400).json({ message: "No available seats for this tour" });
    }

    tour.totalSeats -= 1;

    await tour.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { selectedTours: tourId } }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Tour selected successfully",
      user,
      updatedTour: tour, 
    });
  } catch (err) {
    res.status(500).json({
      message: "Error selecting tour",
      error: err.message,
    });
  }
};

exports.addReview = async (req, res) => {
  const { tourId } = req.params; // ID of the tour to add a review to
  const { review } = req.body;  // Review object

  try {
    // Find the tour by ID and add the review to the reviews array
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Add the review object to the reviews array
    tour.reviews.push(review);

    // Save the updated tour
    await tour.save();

    res.status(200).json({
      message: "Review added successfully",
      tour,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding review",
      error: err.message,
    });
  }
};


exports.getReviews = async (req, res) => {
  const { tourId } = req.params; // ID of the tour to get reviews for

  try {
    // Find the tour by ID and retrieve the reviews
    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Return the reviews
    res.status(200).json({
      reviews: tour.reviews,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving reviews",
      error: err.message,
    });
  }
};
