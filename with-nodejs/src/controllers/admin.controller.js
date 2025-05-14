const adminService = require("../services/admin.service");
const applicationService = require("../services/application.service");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const allApplications = async (req, res) => {
    try {
        const allApplications = await applicationService.findAll();
        res.status(500).json({
            status: true,
            data: allApplications
        })
    } catch (error) {
        console.error("An error occurred while listing applications:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Applications could not be listed.",
        });
    }
}

const deleteApplications = async (req, res) => {
    try {
        const { id } = req.params;

        if (! await applicationService.findById(id)) {
            res.status(500).json({
                success: false,
                message: "There is no such application"
            })
        }

        const deletedApplication = await applicationService.deleteById(id);


        res.status(200).json({
            success: true,
            message: "Application deleted",
            data: deletedApplication
        })

    } catch (error) {
        console.error("An error occurred while deleting the application:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Application could not be deleted.",
        });
    }
}

const progressApplications = async (req, res) => {
    try {
        const { id } = req.params;

        if (! await applicationService.findById(id)) {
            res.status(500).json({
                success: false,
                message: "There is no such application"
            })
        }

        const application = await applicationService.findById(id);
        if (application.status === "NEW") {
            await applicationService.updateById(id, {
                status: "IN_PROGRESS"
            })

            await applicationService.updateById(id, { admin: req.user.id });
            await adminService.updateById(req.user.id, {
                $addToSet: { applications: application._id },
            });

            return res.status(500).json({
                success: true,
                message: `Application ın_progress Status`,
            })

        } else {
            return res.status(400).json({
                success: false,
                message: `Başvuru zaten ${application.status} durumunda`,
                data: application,
            });
        }

    } catch (error) {
        console.error("An error occurred while changing the application status:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Status Change Failed",
        });
    }
}

const completeApplications = async (req, res) => {

    try {
        const { id } = req.params
        const data = req.body;
        const application = await applicationService.findById(id);

        if (!application || application.status !== "IN_PROGRESS") {
            return res.status(404).json({
                success: false,
                message: "Application not found or Application is not in `IN_PROGRESS` status",
            });
        }

        const newApp = await applicationService.updateById(id, {
            status: "COMPLETED",
            description: data.description
        })

        await applicationService.updateById(id, { admin: req.user.id });
        await adminService.updateById(req.user.id, {
            $addToSet: { applications: application._id },
        });

        return res.status(200).json({
            success: true,
            message: "Application Updated",
            data: newApp
        })

    } catch (error) {
        console.error("An error occurred while completing the application:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Application could not be completed.",
        });
    }
}

const cancelApplications = async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body;
        const application = await applicationService.findById(id);

        if (!application || application.status !== "IN_PROGRESS") {
            return res.status(404).json({
                success: false,
                message: "Application not found or Application is not in `IN_PROGRESS` status",
            });
        }

        const newApp = await applicationService.updateById(id, {
            status: "CANCELLED",
            description
        })

        await applicationService.updateById(id, { admin: req.user.id });
        await adminService.updateById(req.user.id, {
            $addToSet: { applications: application._id },
        });

        return res.status(200).json({
            success: true,
            message: "Application Updated",
            data: newApp
        })
    } catch (error) {
        console.error("An error occurred while canceling the application:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Application Cancellation Failed.",
        });
    }
}

const cancelAllInProgresApplications = async (req, res) => {
    try {
        const applications = await applicationService.findAll({ status: "IN_PROGRESS" });

        if (applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No application found to be cancelled",
            });
        }

        const updatedApplications = await Promise.all(
            applications.map(async (application) => {
                await applicationService.updateById(application._id, {
                    status: "CANCELLED",
                    admin: req.user.id,
                });
                return application._id;
            })
        );

        await adminService.updateById(req.user.id, {
            $addToSet: { applications: { $each: updatedApplications } },
        });

        return res.status(200).json({
            success: true,
            message: "All IN_PROGRESS applications have been successfully cancelled.",
            data: updatedApplications,
        });
    } catch (error) {
        console.error("An error occurred while canceling applications:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Applications could not be cancelled.",
        });
    }
}

const getApplicationsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const query = {};

        if (startDate || endDate) {
            query.createdAt = {};

            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                query.createdAt.$gte = start;
            }


            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                query.createdAt.$lte = end;
            }
        }

        
        const applications = await applicationService.findAll(query);

        
        if (applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found within the specified date range",
            });
        }

        
        return res.status(200).json({
            success: true,
            message: "Applications were listed successfully",
            data: applications,
            count: applications.length
        });

    } catch (error) {
        console.error("An error occurred while listing applications:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Applications could not be listed.",
        });
    }
}

const register = async (req, res) => {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required.",
            });
        }

        const existingAdmin = await adminService.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "There is already an admin with this username.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await adminService.create({
            username,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Admin created successfully.",
        });
    } catch (error) {
        console.error("An error occurred while creating the admin:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Could not create admin.",
        });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const admin = await adminService.findOne({ username });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Invalid user information",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid user information",
            });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            success: true,
            message: "Successfuly Login",
            data: {
                admin: {
                    username: admin.username,
                },
                token
            }
        });

    } catch (error) {
        console.error("An error occurred while logging in:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Login failed.",
        });
    }
}


module.exports = {
    allApplications, deleteApplications, progressApplications, completeApplications,
    cancelApplications, cancelAllInProgresApplications, getApplicationsByDate, login, register
};