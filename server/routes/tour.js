const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour');

router.get('/', tourController.getAllTours); 
router.get('/:userId', tourController.getTours); 
router.post('/', tourController.createTour); 
router.put('/:tourId', tourController.editTour); 
router.delete('/:tourId',  tourController.deleteTour); 
router.put('/select/:tourId', tourController.selectTour);
router.post('/:tourId/review', tourController.addReview);  
router.get('/:tourId/reviews', tourController.getReviews); 
module.exports = router;
