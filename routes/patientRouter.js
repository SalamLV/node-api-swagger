import express from 'express';
const router = express.Router();

import { createNewPatient, getAllPatients, getPatientById, upadatePatient, deletePatient } from '../services/patientService.js';

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all patients from the database
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: Successfully retrieved list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the patient
 *                     example: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99"
 *                   patient_id:
 *                     type: string
 *                     description: Patient ID number
 *                     example: "P1002"
 *                   patient_name:
 *                     type: string
 *                     description: Full name of the patient
 *                     example: "Jane Smith"
 *                   gender:
 *                     type: string
 *                     description: Gender of the patient
 *                     example: "Female"
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 *                     description: Patient's date of birth
 *                     example: "1990-09-28"
 *                   visit_date:
 *                     type: string
 *                     format: date
 *                     description: Date of the visit
 *                     example: "2023-01-05"
 *                   symptoms:
 *                     type: string
 *                     description: Reported symptoms
 *                     example: "Cough and Sore Throat"
 *                   diagnosis:
 *                     type: string
 *                     description: Medical diagnosis
 *                     example: "Bronchitis"
 *                   medication:
 *                     type: string
 *                     description: Prescribed medication
 *                     example: "Amoxicillin"
 *                   dosage:
 *                     type: string
 *                     description: Medication dosage
 *                     example: "500mg"
 *             examples:
 *               success:
 *                 value:
 *                   - id: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99"
 *                     patient_id: "P1002"
 *                     patient_name: "Jane Smith"
 *                     gender: "Female"
 *                     date_of_birth: "1990-09-28"
 *                     visit_date: "2023-01-05"
 *                     symptoms: "Cough and Sore Throat"
 *                     diagnosis: "Bronchitis"
 *                     medication: "Amoxicillin"
 *                     dosage: "500mg"
 *                   - id: "4aff6cbc-892b-4dbf-bfa7-ad0f0a346eb1"
 *                     patient_id: "P1003"
 *                     patient_name: "Michael Johnson"
 *                     gender: "Male"
 *                     date_of_birth: "1978-06-15"
 *                     visit_date: "2023-01-08"
 *                     symptoms: "Headache"
 *                     diagnosis: "Migraine"
 *                     medication: "Ibuprofen"
 *                     dosage: "400mg"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *             examples:
 *               error:
 *                 value:
 *                   error: "Failed to retrieve patients"
 */
router.get('/patients', async (req,res, next) => {
    try {
        const patients = await getAllPatients();
        res.status(200).json(patients);
    } catch(error){
        next(error);
    }
});

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     description: Retrieve a specific patient by their unique identifier
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the patient
 *         example: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99"
 *     responses:
 *       200:
 *         description: Successfully retrieved patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the patient
 *                   example: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99"
 *                 patient_id:
 *                   type: string
 *                   description: Patient ID number
 *                   example: "P1002"
 *                 patient_name:
 *                   type: string
 *                   description: Full name of the patient
 *                   example: "Jane Smith"
 *                 gender:
 *                   type: string
 *                   description: Gender of the patient
 *                   example: "Female"
 *                 date_of_birth:
 *                   type: string
 *                   format: date
 *                   description: Patient's date of birth
 *                   example: "1990-09-28"
 *                 visit_date:
 *                   type: string
 *                   format: date
 *                   description: Date of the visit
 *                   example: "2023-01-05"
 *                 symptoms:
 *                   type: string
 *                   description: Reported symptoms
 *                   example: "Cough and Sore Throat"
 *                 diagnosis:
 *                   type: string
 *                   description: Medical diagnosis
 *                   example: "Bronchitis"
 *                 medication:
 *                   type: string
 *                   description: Prescribed medication
 *                   example: "Amoxicillin"
 *                 dosage:
 *                   type: string
 *                   description: Medication dosage
 *                   example: "500mg"
 *             examples:
 *               success:
 *                 value:
 *                   id: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99"
 *                   patient_id: "P1002"
 *                   patient_name: "Jane Smith"
 *                   gender: "Female"
 *                   date_of_birth: "1990-09-28"
 *                   visit_date: "2023-01-05"
 *                   symptoms: "Cough and Sore Throat"
 *                   diagnosis: "Bronchitis"
 *                   medication: "Amoxicillin"
 *                   dosage: "500mg"
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Patient not found"
 *             examples:
 *               notFound:
 *                 value:
 *                   error: "Patient not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *             examples:
 *               error:
 *                 value:
 *                   error: "Failed to retrieve patient"
 */
router.get('/patients/:id', async (req,res, next) => {
    try {
        const patient = await getPatientById(req.params.id);
        res.status(200).json(patient);
    } catch(error){
        next(error);
    }
});

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     description: Add a new patient record to the database
 *     tags:
 *       - Patients
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Patient object that needs to be added
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - patient_id
 *             - patient_name
 *             - gender
 *             - date_of_birth
 *             - visit_date
 *             - symptoms
 *             - diagnosis
 *             - medication
 *             - dosage
 *           properties:
 *             patient_id:
 *               type: string
 *               description: Patient ID number
 *               example: "P1010"
 *             patient_name:
 *               type: string
 *               description: Full name of the patient
 *               example: "John Doe"
 *             gender:
 *               type: string
 *               description: Gender of the patient
 *               example: "Male"
 *             date_of_birth:
 *               type: string
 *               format: date
 *               description: Patient's date of birth
 *               example: "1985-05-15"
 *             visit_date:
 *               type: string
 *               format: date
 *               description: Date of the visit
 *               example: "2026-01-12"
 *             symptoms:
 *               type: string
 *               description: Reported symptoms
 *               example: "Fever and Fatigue"
 *             diagnosis:
 *               type: string
 *               description: Medical diagnosis
 *               example: "Flu"
 *             medication:
 *               type: string
 *               description: Prescribed medication
 *               example: "Tamiflu"
 *             dosage:
 *               type: string
 *               description: Medication dosage
 *               example: "75mg"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Unique identifier generated for the patient
 *               example: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"
 *             patient_id:
 *               type: string
 *               example: "P1010"
 *             patient_name:
 *               type: string
 *               example: "John Doe"
 *             gender:
 *               type: string
 *               example: "Male"
 *             date_of_birth:
 *               type: string
 *               format: date
 *               example: "1985-05-15"
 *             visit_date:
 *               type: string
 *               format: date
 *               example: "2026-01-12"
 *             symptoms:
 *               type: string
 *               example: "Fever and Fatigue"
 *             diagnosis:
 *               type: string
 *               example: "Flu"
 *             medication:
 *               type: string
 *               example: "Tamiflu"
 *             dosage:
 *               type: string
 *               example: "75mg"
 *       400:
 *         description: Bad request - Invalid input data
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Missing required fields"
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Failed to create patient"
 */
router.post('/patients', async (req, res, next) => {
    try {
        const patient = await createNewPatient(req.body);
        res.status(201).json(patient);
    } catch(error){
        next(error);
    }
});

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update patient information
 *     description: Update an existing patient record by ID
 *     tags:
 *       - Patients
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: The unique identifier of the patient to update
 *       - in: body
 *         name: body
 *         description: Patient fields to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             patient_id:
 *               type: string
 *               description: Patient ID number
 *               example: "P1002"
 *             patient_name:
 *               type: string
 *               description: Full name of the patient
 *               example: "Jane Smith-Johnson"
 *             gender:
 *               type: string
 *               description: Gender of the patient
 *               example: "Female"
 *             date_of_birth:
 *               type: string
 *               format: date
 *               description: Patient's date of birth
 *               example: "1990-09-28"
 *             visit_date:
 *               type: string
 *               format: date
 *               description: Date of the visit
 *               example: "2026-01-12"
 *             symptoms:
 *               type: string
 *               description: Reported symptoms
 *               example: "Cough and Sore Throat"
 *             diagnosis:
 *               type: string
 *               description: Medical diagnosis
 *               example: "Bronchitis"
 *             medication:
 *               type: string
 *               description: Prescribed medication
 *               example: "Azithromycin"
 *             dosage:
 *               type: string
 *               description: Medication dosage
 *               example: "250mg"
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99"
 *             patient_id:
 *               type: string
 *               example: "P1002"
 *             patient_name:
 *               type: string
 *               example: "Jane Smith-Johnson"
 *             gender:
 *               type: string
 *               example: "Female"
 *             date_of_birth:
 *               type: string
 *               format: date
 *               example: "1990-09-28"
 *             visit_date:
 *               type: string
 *               format: date
 *               example: "2026-01-12"
 *             symptoms:
 *               type: string
 *               example: "Cough and Sore Throat"
 *             diagnosis:
 *               type: string
 *               example: "Bronchitis"
 *             medication:
 *               type: string
 *               example: "Azithromycin"
 *             dosage:
 *               type: string
 *               example: "250mg"
 *       404:
 *         description: Patient not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Patient not found"
 *       400:
 *         description: Bad request - Invalid input data
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Invalid data format"
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Failed to update patient"
 */
router.put('/patients/:id', async (req, res, next) => {
    try {
        const updatedPatient = await upadatePatient(req.params.id, req.body);
        res.status(200).json(updatedPatient);
    } catch(error) {
        next(error);
    }
});

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Remove a patient record from the database by ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the patient to delete
 *         example: "621c7f80-cefb-47d5-b2b4-01f7c3f25b99"
 *     responses:
 *       204:
 *         description: Patient deleted successfully (No Content)
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Patient not found"
 *             examples:
 *               notFound:
 *                 value:
 *                   error: "Patient not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *             examples:
 *               error:
 *                 value:
 *                   error: "Failed to delete patient"
 */
router.delete('/patients/:id', async (req, res, next) => {
    try {
        await deletePatient(req.params.id);
        res.status(204).end();
    } catch(error) {
        next(error);
    }
});

export default router;