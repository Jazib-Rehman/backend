const express = require('express');
const auth = require('../middleware/auth');

const {
  adminController,
  serviceController
} = require('./../controllers');

const adminRoutes = express.Router();
// adminRoutes.get('/services', adminController.fetchAllServicesByArtist);
// adminRoutes.get('/fetch-all', auth, adminController.fetchAllArtists);
// adminRoutes.get('/fetch/:id', auth, adminController.fetchArtistById);
// adminRoutes.get('/fetch-reviews/:id', auth, adminController.fetchAllReviewsByArtist);
adminRoutes.post('/login', adminController.login);
adminRoutes.post('/create', adminController.signUp);
// adminRoutes.post('/create-review', auth, adminController.createReview);
// adminRoutes.post('/upload-image', upload.single("image"), auth, adminController.uploadImage);
// adminRoutes.post('/payment', auth, adminController.stripePayment);
// adminRoutes.post('/reset-password', auth, adminController.artistResetPassword);
// adminRoutes.post('/verify-password', auth, adminController.verifyPassword);
// adminRoutes.post('/update-password', auth, adminController.updatePassword);
// adminRoutes.put('/gallery-images/:id', auth, adminController.galleryImages);
// adminRoutes.put('/update-profile/:id', auth, adminController.updateProfileImage);
// adminRoutes.put('/appointment-settings/:id', auth, adminController.appointmentBooking);
// adminRoutes.post('/delete-all-data', auth, adminController.deleteAllData);


const serviceRoutes = express.Router();
serviceRoutes.get('/fetch-artist/:id', auth, serviceController.fetchAllServicesByArtist)
serviceRoutes.get('/fetch/:id', auth, serviceController.fetchServiceById)
serviceRoutes.post('/create', auth, serviceController.createService)
serviceRoutes.put('/update/:id', auth, serviceController.updateService)
serviceRoutes.delete('/remove/:id', auth, serviceController.removeServiceById)


module.exports = {
  adminRoutes,
  serviceRoutes
}