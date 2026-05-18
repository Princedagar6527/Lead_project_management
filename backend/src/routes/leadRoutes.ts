import express from 'express';
import { createLead, getLeads, updateLead, deleteLead } from '../controllers/leadController';
import { authenticateJWT, requireAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// All routes are protected with JWT
router.use(authenticateJWT);

router.route('/')
  .get(getLeads)
  .post(createLead);

router.route('/:id')
  .put(updateLead)
  .delete(requireAdmin, deleteLead); // Only Admins can delete

export default router;