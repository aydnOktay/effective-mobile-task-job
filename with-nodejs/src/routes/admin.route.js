const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const { allApplications, deleteApplications, progressApplications, completeApplications,
    cancelApplications, cancelAllInProgresApplications, getApplicationsByDate, login, register } = require("../controllers/admin.controller");

/**
 * @swagger
 * /admin/all-applications:
 *   get:
 *     summary: Admin - Lists all applications
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Applications successfully listed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Successful transaction status
 *                 data:
 *                   type: array
 *                   description: List of applications
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: Email of the applicant
 *                       subject:
 *                         type: string
 *                         description: Subject of application
 *                       content:
 *                         type: string
 *                         description: Content of application
 *                       status:
 *                         type: string
 *                         enum: [NEW, IN_PROGRESS, COMPLETED, CANCELLED]
 *                         description: Application Status
 *                       description:
 *                         type: string
 *                         description: Application description
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Application creation date
 *       500:
 *         description: Server error
 */
router.get("/all-applications", authMiddleware, allApplications);

/**
 * @swagger
 * /admin/delete-application/{id}:
 *   delete:
 *     summary: Admin - Deletes application
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the application to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates that the deletion was successful
 *                 data:
 *                   type: object
 *                   description: Deleted application data
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Email address of the applicant
 *                     subject:
 *                       type: string
 *                       description: Subject of the application
 *                     content:
 *                       type: string
 *                       description: Content of the application
 *                     status:
 *                       type: string
 *                       enum: [NEW, IN_PROGRESS, COMPLETED, CANCELLED]
 *                       description: Application status
 *                     description:
 *                       type: string
 *                       description: Description of the application
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Application creation date
 *       500:
 *         description: Server Error
 */
router.delete("/delete-application/:id", authMiddleware, deleteApplications);

/**
 * @swagger
 * /admin/progress-application/{id}:
 *   patch:
 *     summary: Admin - Changes application status (Progress)
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the application whose status is to be changed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application successfully placed under preogress
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates that the status was changed successfully
 *                 message:
 *                   type: string
 *                   description: Message indicating that the application status has changed
 *                 data:
 *                   type: string
 *                   description: Updated application status
 *       400:
 *         description: The application is already in the specified state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates that the status of the application has not been changed
 *                 message:
 *                   type: string
 *                   description: Information about the current status of the application
 *       500:
 *         description: Server Error
 */
router.patch("/progress-application/:id", authMiddleware, progressApplications);

/**
 * @swagger
 * /admin/completed/{id}:
 *   put:
 *     summary: Changes application status (Complete)
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     description: If the reference is in `IN_PROGRESS` state, sets the reference to `COMPLETED` state and adds a comment.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Application ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Explanation to be entered when the application is completed
 *             required:
 *               - description
 *     responses:
 *       200:
 *         description: The application has been completed successfully.
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
 *                   example: Application Updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: COMPLETED
 *                     description:
 *                       type: string
 *                       example: "The application has been completed successfully."
 */
router.put("/completed/:id", authMiddleware, completeApplications);

/**
 * @swagger
 * /admin/cancel/{id}:
 *   put:
 *     summary: Changes application status (Cancel)
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     description: If the reference is in `IN_PROGRESS` state, sets the reference to `CANCELLED` state and adds a comment.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Application ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Text explaining the reason for cancellation of the application
 *             required:
 *               - description
 *     responses:
 *       200:
 *         description: The application was successfully cancelled.
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
 *                   example: Application Updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: CANCELLED
 *                     description:
 *                       type: string
 *                       example: "Application cancelled"
 *       404:
 *         description: Application not found or application status is not `IN_PROGRESS`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Application not found or Application is not in `UNDER REVIEW` status
 *       500:
 *         description: Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error. Application Cancellation Failed.
 */
router.put("/cancel/:id", authMiddleware, cancelApplications);

/**
 * @swagger
 * /admin/cancel-all-in-progress:
 *   put:
 *     summary: Cancels all applications (in processing status)
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     description: Changes all `IN_PROGRESS` state references to `CANCELLED` state.
 *     responses:
 *       200:
 *         description:All applications have been successfully cancelled.
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
 *                   example: All IN_PROGRESS applications have been successfully cancelled.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c85
 *                       status:
 *                         type: string
 *                         example: CANCELLED
 *       404:
 *         description: No application found to be cancelled.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No application found to be cancelled
 *       500:
 *         description: Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error. Applications could not be cancelled.
 */
router.put("/cancel-all-in-progress", authMiddleware, cancelAllInProgresApplications);

/**
 * @swagger
 * /admin/applications/by-date:
 *   get:
 *     summary: Lists Applications by date range
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     description: Filters and lists applications based on the specified date range
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start Date (YYYY-MM-DD formatında)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End Date (YYYY-MM-DD formatında)
 *     responses:
 *       200:
 *         description: Applications filtered successfully
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
 *                   example: Applications were listed successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 68249d73a81c70c3edc86f68
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       subject:
 *                         type: string
 *                         example: Job Application
 *                       content:
 *                         type: string
 *                         example: Detailed application content is available here.
 *                       status:
 *                         type: string
 *                         example: COMPLETED
 *                       admin:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       createdAt:
 *                         type: string 
 *                         format: date-time
 *                         example: 2025-05-14T13:41:07.411Z
 *                       description:
 *                         type: string
 *                         example: success
 *                 count:
 *                   type: integer
 *                   example: 5
 *       404:
 *         description: No applications found within the specified date range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No applications found within the specified date range
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server Error. Applications could not be listed.
 */
router.get("/applications/by-date", authMiddleware, getApplicationsByDate);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     description: Logs in as admin with email and password, returns JWT token if successful
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin username
 *                 example: testadmin
 *               password:
 *                 type: string
 *                 description: Admin password
 *                 example: admin
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
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
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     admin:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 60d21b4667d0d8992e610c85
 *                         username:
 *                           type: string
 *                           example: testadmin
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDIxYjQ2NjdkMGQ4OTkyZTYxMGM4NSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2MjQzMDYwMDAsImV4cCI6MTYyNDMwOTYwMH0.7VB2YFxS9mB5B1nGCwmxb2NdOjKTxcF3V4X3MzJGdd8
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Username and password are required
 *       401:
 *         description:Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid user information
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid user information
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server error. Login failed.
 */
router.post('/login', login);

/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Admin Register
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: testadmin
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: There is already an admin with this username
 *       500:
 *         description: Server error
 */
router.post('/signup', register);



module.exports = router;