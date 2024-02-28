const mongoose = require("mongoose");
const Schema = mongoose.Schema

const packageCodeSchema = new mongoose.Schema({
    pkgName: {
        type: String,
        required: true,
        unique: true
    },
    pkgCode: {
        type: String,
        required: true,
        unique: true
    }
   
});
packageCodeSchema.set('timestamps', true);

const departmentSchema = new mongoose.Schema({
    deptName: {
        type: String,
        required: true,
        unique: true
    }
});
departmentSchema.set('timestamps', true);

const doctorSchema = new mongoose.Schema({
    deptName: {
        type: String,
        required: true
    },
    deptId: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorSignature: {
        type: String,
        required: true
    }
});
doctorSchema.set('timestamps', true);


const packageModel = mongoose.model('packageCode', packageCodeSchema);
const departmentModel = mongoose.model('department', departmentSchema);
const doctorModel = mongoose.model('doctors', doctorSchema);


module.exports = {
    packageModel,
    departmentModel,
    doctorModel
};