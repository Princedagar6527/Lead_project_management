import { Request, Response } from 'express';
import Lead from '../models/Lead';

// 1. CREATE LEAD
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: newLead });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. GET LEADS (With Advanced Filtering & Pagination)
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, source, search, sort, page = '1' } = req.query;
    const limit = 10; 
    const skip = (Number(page) - 1) * limit;

    const query: any = {};
    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const sortConfig: any = sort === 'Oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const leads = await Lead.find(query).sort(sortConfig).skip(skip).limit(limit);
    const totalRecords = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// 3. UPDATE LEAD
export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLead) { res.status(404).json({ success: false, message: 'Lead not found' }); return; }
    res.status(200).json({ success: true, data: updatedLead });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. DELETE LEAD
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) { res.status(404).json({ success: false, message: 'Lead not found' }); return; }
    res.status(200).json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};