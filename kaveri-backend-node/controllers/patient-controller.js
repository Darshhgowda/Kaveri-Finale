const {
    patientModel
} = require('../model/patient-model');

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");



const Aws = require("aws-sdk");
const jwt = require("jsonwebtoken");
const mime = require("mime");

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
});

const getAllPatient = async (req, res, next) => {
    try {
        const response = await patientModel.find();
        res.status(200).json({
            error: false,
            message: "Record Found",
            response,
        });
    } catch (err) {
        next(err);
    }
};

const getPatient = async (req, res, next) => {
    try {
        let id = req.params.id
        const response = await patientModel.findById({
            _id: id,
        });
        res.status(200).json({
            error: false,
            message: "Record Found",
            response,
        });
    } catch (err) {
        next(err);
    }
};

const addPatient = async (req, res, next) => {
    try {
        const {
            patientName,
            // patientId,
            phoneNo,
            billDate,
            dateOfAdmission,
            billNo,
            dateOfDischarge,
            ipNo,
            bplCardNo,
            refNo,
            address,
            age,
            sex,
            department,
            doctor,
            doctorId,
            taluk,
            district,
            packages,
            packageCode,
            packageName,
            totalPackageCostAmount,
            totalClaimAmount,
            dateOfSurgery,
            preAuthIssueDate,
            travellingAllowance,
            amountCollected,
            amountRefund,
            dischargeMedicinesProvided,
            freeFoodGiven,
            patientFeedback,
            ambulanceProvided,
            complaints,
            otNote,
            postInvestigations,
            clinicalPhoto,
            remarks,
            arogyaMitraName,
            patientSignature
        } = req.body;
        if (req.file !== null && req.file !== undefined) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `images/patient/${req.file.originalname}`,
                Body: req.file.buffer,
                ACL: "public-read-write",
                ContentType: "image/jpeg",
            };
            await s3.upload(params, async (error, data) => {
                if (error) {
                    res.status(404).json({
                        error: true,
                        message: "Error in Uploading Photo",
                        response,
                    });
                } else {
                    const response = await patientModel.insertMany([{
                        patientName,
                        // patientId,
                        phoneNo,
                        billDate,
                        dateOfAdmission,
                        billNo,
                        dateOfDischarge,
                        ipNo,
                        bplCardNo,
                        refNo,
                        address,
                        age,
                        sex,
                        department,
                        doctor,
                        doctorId,
                        taluk,
                        district,
                        packageCode,
                        packageName,
                        totalPackageCostAmount,
                        totalClaimAmount,
                        dateOfSurgery,
                        preAuthIssueDate,
                        travellingAllowance,
                        amountCollected,
                        amountRefund,
                        dischargeMedicinesProvided,
                        freeFoodGiven,
                        patientFeedback,
                        ambulanceProvided,
                        complaints,
                        otNote,
                        postInvestigations,
                        clinicalPhoto,
                        remarks,
                        arogyaMitraName,
                        patientSignature: data.Location
                    }, ]);
                    res.status(200).json({
                        error: false,
                        message: "Registered Successfully",
                        response:response[0],
                    });
                }
            });
        }

    } catch (err) {
        next(err);
    }
};

const editPatient = async (req, res, next) => {
    try {
        const {
            patientName,
            // patientId,
            phoneNo,
            billDate,
            dateOfAdmission,
            billNo,
            dateOfDischarge,
            ipNo,
            bplCardNo,
            refNo,
            address,
            age,
            sex,
            department,
            doctor,
            doctorId,
            taluk,
            district,
            packageCode,
            packageName,
            totalPackageCostAmount,
            totalClaimAmount,
            dateOfSurgery,
            preAuthIssueDate,
            travellingAllowance,
            amountCollected,
            amountRefund,
            dischargeMedicinesProvided,
            freeFoodGiven,
            patientFeedback,
            ambulanceProvided,
            complaints,
            otNote,
            postInvestigations,
            clinicalPhoto,
            remarks,
            arogyaMitraName,
            patientSignature
        } = req.body;
        await patientModel.updateOne({
            _id: req.params.id,
        }, {
            $set: {
                patientName,
                // patientId,
                phoneNo,
                billDate,
                dateOfAdmission,
                billNo,
                dateOfDischarge,
                ipNo,
                bplCardNo,
                refNo,
                address,
                age,
                sex,
                department,
                doctor,
                doctorId,
                taluk,
                district,
                packageCode,
                packageName,
                totalPackageCostAmount,
                totalClaimAmount,
                dateOfSurgery,
                preAuthIssueDate,
                travellingAllowance,
                amountCollected,
                amountRefund,
                dischargeMedicinesProvided,
                freeFoodGiven,
                patientFeedback,
                ambulanceProvided,
                complaints,
                otNote,
                postInvestigations,
                clinicalPhoto,
                remarks,
                arogyaMitraName,
                patientSignature
            },
        });
        const response = await patientModel.findOne({
            _id: req.params.id,
        });
        res.status(200).json({
            error: false,
            message: "Details Updated Successfully",
            _id: req.params.id,
            response,
        });
    } catch (err) {
        next(err);
    }
};

const deletePatient = async (req, res, next) => {
    try {
        await patientModel.deleteOne({
            _id: req.params.id,
        });
        res.status(200).json({
            error: false,
            message: "Patient Deleted Successfully",
            _id: req.params.id,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllPatient,
    getPatient,
    addPatient,
    editPatient,
    deletePatient
};