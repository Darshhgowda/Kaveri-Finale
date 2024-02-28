const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patient-controller');
const storage = require('../helpers/storage-patient');

router.get('/get-all-patient', patientController.getAllPatient);
router.get('/get-patient/:id', patientController.getPatient);
router.post('/add-patient', storage, patientController.addPatient);
router.put('/edit-patient/:id', patientController.editPatient);
router.delete('/delete-patient/:id', patientController.deletePatient);

module.exports = router;