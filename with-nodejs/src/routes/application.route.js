const express = require("express");
const router = express.Router();
const { createApplication, myApplicationStatus } = require("../controllers/application.controller");

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - subject
 *               - content
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               subject:
 *                 type: string
 *                 example: Job Application
 *               content:
 *                 type: string
 *                 example: Detailed application content is available here.
 *     responses:
 *       201:
 *         description: Application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: The application has been created successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Application'
 *       400:
 *         description: Mandatory fields are missing
 *       500:
 *         description: Server error
 */
router.post("/", createApplication);


/**
 * @swagger
 * /applications/status/{email}:
 *   get:
 *     summary: Get application status for specific email address
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Applicant's email address
 *     responses:
 *       200:
 *         description: Application was found successful
 *       400:
 *         description: Email parameter is missing
 *       500:
 *         description: Server error
 */
router.get("/status/:email", myApplicationStatus);

module.exports = router;