const applicationService = require("../services/application.service");

const createApplication = async (req, res) => {
    try {
        const { email, subject, content } = req.body;

        if (!email || !subject || !content) {
            return res.status(400).json({
                success: false,
                message: "Email, subject and content fields are required.",
            });
        }

        const newApplication = await applicationService.create({
            email, subject, content
        })

        res.status(201).json({
            success: true,
            message: "The application has been created successfully.",
            data: newApplication,
        });
    } catch (error) {
        console.error("Error while creating application:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Application creation failed.",
        });
    }
};

const myApplicationStatus = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email, alanı zorunludur.",
            });
        }

        const applications = await applicationService.findAll({ email })

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Bu e-posta ile ilişkili herhangi bir başvuru bulunamadı.",
            });
        }

        res.status(200).json({
            success: true,
            data: applications,
        });

    } catch (error) {
        console.error("Başvuru sorgulanırken hata:", error);
        res.status(500).json({
            success: false,
            message: "Sunucu hatası. Başvuru bulunamadı.",
        });
    }
}

module.exports = {
    createApplication, myApplicationStatus
};