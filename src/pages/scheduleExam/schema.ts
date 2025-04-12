
import * as z from 'zod';

export const examFormSchema = z.object({
  schemeName: z.string().min(1, { message: 'Scheme name is required' }),
  batchId: z.string().min(1, { message: 'Batch ID is required' }),
  sectorName: z.string().min(1, { message: 'Sector name is required' }),
  jobRole: z.string().min(1, { message: 'Job role is required' }),
  qpCode: z.string().min(1, { message: 'QP code is required' }),
  tpName: z.string().min(1, { message: 'TP name is required' }),
  tcName: z.string().min(1, { message: 'TC name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  district: z.string().min(1, { message: 'District is required' }),
  candidates: z.string().min(1, { message: 'Number of candidates is required' })
    .refine((val) => !isNaN(Number(val)), { message: 'Must be a number' }),
  scheduled: z.string().min(1, { message: 'Scheduled count is required' })
    .refine((val) => !isNaN(Number(val)), { message: 'Must be a number' }),
  assessorName: z.string().min(1, { message: 'Assessor name is required' }),
  assessorId: z.string().min(1, { message: 'Assessor ID is required' }),
  examDate: z.date({ required_error: 'Exam date is required' })
});

export type ExamFormValues = z.infer<typeof examFormSchema>;
