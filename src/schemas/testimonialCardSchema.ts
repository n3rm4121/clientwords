// src/schemas/testimonialSchema.ts
import { z } from 'zod';


export const  testimonialCardSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyURL: z.string().url('Invalid URL format'),
  companyLogo: z.string().min(1, 'Company logo is required').optional(),
  promptText: z.string().min(1, 'Prompt text is required'),
  placeholder: z.string().min(1, 'Placeholder is required'),
  spaceId: z.string().min(1, 'Space ID is required'),
  spaceName: z.string().min(1, 'Space name is required'),
});
