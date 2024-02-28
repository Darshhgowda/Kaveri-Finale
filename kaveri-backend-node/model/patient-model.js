const mongoose = require("mongoose");
const Schema = mongoose.Schema

const patientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    // patientId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // phoneNo: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    billDate: {
        type: String,
        required: true
    },
    dateOfAdmission: {
        type: String,
        required: true
    },
    billNo: {
        type: String,
        required: true
    },
    dateOfDischarge: {
        type: String,
        required: true
    },
    ipNo: {
        type: String,
        required: true
    },
    bplCardNo: {
        type: String,
        required: true
    },
    refNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    taluk: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    packageCode: {
        type: [String], // Define it as an array of strings
        required: true
      },
    // packageName: {
    //     type: String,
    //     required: true
    // },
    totalPackageCostAmount: {
        type: String,
        required: true
    },
    totalClaimAmount: {
        type: String,
        required: true
    },
    dateOfSurgery: {
        type: String,
        required: true
    },
    preAuthIssueDate: {
        type: String,
        required: true
    },
    travellingAllowance: {
        type: String,
        required: true
    },
    amountCollected: {
        type: String,
        required: true
    },
    amountRefund: {
        type: String,
        required: true
    },
    dischargeMedicinesProvided: {
        type: String,
        required: true
    },
    freeFoodGiven: {
        type: String,
        required: true
    },
    patientFeedback: {
        type: String,
        required: true
    },
    ambulanceProvided: {
        type: String,
        required: true
    },
    complaints: {
        type: String,
        required: true
    },
    otNote: {
        type: String,
        required: true
    },
    postInvestigations: {
        type: String,
        required: true
    },
    clinicalPhoto: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    arogyaMitraName: {
        type: String,
        required: true
    },
    patientSignature: {
        type: String,
        required: true
    },
});
patientSchema.set('timestamps', true);

const patientModel = mongoose.model('patient', patientSchema);
module.exports = {
    patientModel
};