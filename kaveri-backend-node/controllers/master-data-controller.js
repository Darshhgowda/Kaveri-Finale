const {
    packageModel,
    departmentModel,
    doctorModel
} = require('../model/master-data-model');
// import { S3Client } from '@aws-sdk/client-s3';

var Aws = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// const S3Client = require("S3Client");
// const Aws = require("aws-sdk");
const jwt = require("jsonwebtoken");
const mime = require("mime");
// const s3 = new S3Client({ region: 'Asia Pacific (Mumbai) ap-south-1',
// accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
// secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
//  });

const s3 = new Aws.S3({
    // region: 'Asia Pacific (Mumbai) ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
});


const getAllPackages = async (req, res, next) => {
    try {
        const response = await packageModel.find();
        res.status(200).json({
            error: false,
            message: "Record Found",
            response,
        });
    } catch (err) {
        next(err);
    }
};

const getPackage = async (req, res, next) => {
    try {
        let id = req.params.id
        const response = await packageModel.findById({
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

const getPackageByCode = async (req, res, next) => {
    try {
        let id = req.params.id
        const response = await packageModel.find({
            pkgCode: id,
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

const addPackage = async (req, res, next) => {
    try {
        const {
            pkgName,
            pkgCode
        } = req.body;
        const package = await packageModel.findOne({
            pkgCode,
        });
        if (!package) {
            const response = await packageModel.insertMany([{
                pkgName,
                pkgCode
            }, ]);
            res.status(200).json({
                error: false,
                message: "Registered Successfully",
                response,
            });
        } else {
            res.status(401).json({
                error: true,
                message: "Package already exists!",
            });
        }
    } catch (err) {
        next(err);
    }
};

const editPackage = async (req, res, next) => {
    try {
        const {
            pkgName,
            pkgCode
        } = req.body;
        await packageModel.updateOne({
            _id: req.params.id,
        }, {
            $set: {
                pkgName,
                pkgCode
            },
        });
        const response = await packageModel.findOne({
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

const deletePackage = async (req, res, next) => {
    try {
        await packageModel.deleteOne({
            _id: req.params.id,
        });
        res.status(200).json({
            error: false,
            message: "Package Deleted Successfully",
            _id: req.params.id,
        });
    } catch (err) {
        next(err);
    }
};




const getAllDepartment = async (req, res, next) => {
    try {
        const response = await departmentModel.find();
        res.status(200).json({
            error: false,
            message: "Record Found",
            response,
        });
    } catch (err) {
        next(err);
    }
};

const getDepartment = async (req, res, next) => {
    try {
        let id = req.params.id
        const response = await departmentModel.findById({
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

const addDepartment = async (req, res, next) => {
    try {
        const {
            deptName
        } = req.body;
        const department = await departmentModel.findOne({
            deptName,
        });
        if (!department) {
            const response = await departmentModel.insertMany([{
                deptName
            }, ]);
            res.status(200).json({
                error: false,
                message: "Department added Successfully",
                response,
            });
        } else {
            res.status(401).json({
                error: true,
                message: "Department already exists!",
            });
        }
    } catch (err) {
        next(err);
    }
};

const editDepartment = async (req, res, next) => {
    try {
        const {
            deptName
        } = req.body;
        await departmentModel.updateOne({
            _id: req.params.id,
        }, {
            $set: {
                deptName
            },
        });
        const response = await departmentModel.findOne({
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

const deleteDepartment = async (req, res, next) => {
    try {
        await departmentModel.deleteOne({
            _id: req.params.id,
        });
        res.status(200).json({
            error: false,
            message: "Department Deleted Successfully",
            _id: req.params.id,
        });
    } catch (err) {
        next(err);
    }
};




const getAllDoctor = async (req, res, next) => {
    try {
        const response = await doctorModel.find();
        res.status(200).json({
            error: false,
            message: "Record Found",
            response,
        });
    } catch (err) {
        next(err);
    }
};

const getDoctor = async (req, res, next) => {
    try {
        let id = req.params.id
        const response = await doctorModel.findById({
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

const addDoctor = async (req, res, next) => {
    try {
        const {
            deptId,
            doctorName,
            doctorImage,
            doctorSignature
        } = req.body;
        // const doctor = await doctorModel.findOne({
        //     doctorName,
        // });
        // if (!doctor) {
console.log(req.body);
        const deptResp = await departmentModel.findById({
            _id: deptId,
        });
        if (req.file !== null && req.file !== undefined) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `images/doctors/${req.file.originalname}`,
                Body: req.file.buffer,
                ACL: "public-read-write",
                ContentType: "image/jpeg",
            };
            await s3.upload(params, async (error, data) => {
                if (error) {
                    res.status(404).json({
                        error: true,
                        message: "Error in Uploading Photo",
                        response: error
                    });
                } else {
                    const response = await doctorModel.insertMany([{
                        deptName: deptResp.deptName,
                        deptId: deptResp._id,
                        doctorName,
                        doctorImage,
                        doctorSignature: data.Location
                    }, ]);
                    res.status(200).json({
                        error: false,
                        message: "Department added Successfully",
                        response,
                    });
                }
            });
        }

    } catch (err) {
        next(err);
    }
};

const editDoctor = async (req, res, next) => {
    try {
        const {
            deptName,
            deptId,
            doctorName,
            doctorImage,
            doctorSignature
        } = req.body;
        await doctorModel.updateOne({
            _id: req.params.id,
        }, {
            $set: {
                deptName,
                deptId,
                doctorName,
                doctorImage,
                doctorSignature
            },
        });
        const response = await doctorModel.findOne({
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

const deleteDoctor = async (req, res, next) => {
    try {
        await doctorModel.deleteOne({
            _id: req.params.id,
        });
        res.status(200).json({
            error: false,
            message: "Department Deleted Successfully",
            _id: req.params.id,
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getAllPackages,
    getPackage,
    addPackage,
    editPackage,
    deletePackage,
    getPackageByCode,

    getAllDepartment,
    getDepartment,
    addDepartment,
    editDepartment,
    deleteDepartment,

    getAllDoctor,
    getDoctor,
    addDoctor,
    editDoctor,
    deleteDoctor
};