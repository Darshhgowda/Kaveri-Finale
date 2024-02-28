const express = require('express');
const router = express.Router();

const masterController = require('../controllers/master-data-controller');
const storage = require('../helpers/storage');

router.get('/get-all-package', masterController.getAllPackages);
router.get('/get-package/:id', masterController.getPackage);
router.post('/add-package', masterController.addPackage);
router.put('/edit-package/:id', masterController.editPackage);
router.delete('/delete-package/:id', masterController.deletePackage);
router.get('/get-package-byCode/:id', masterController.getPackageByCode);

router.get('/get-all-department', masterController.getAllDepartment);
router.get('/get-department/:id', masterController.getDepartment);
router.post('/add-department', masterController.addDepartment);
router.put('/edit-department/:id', masterController.editDepartment);
router.delete('/delete-department/:id', masterController.deleteDepartment);

router.get('/get-all-doctor', masterController.getAllDoctor);
router.get('/get-doctor/:id', masterController.getDoctor);
router.post('/add-doctor', storage, masterController.addDoctor);
router.put('/edit-doctor/:id', masterController.editDoctor);
router.delete('/delete-doctor/:id', masterController.deleteDoctor);

module.exports = router;