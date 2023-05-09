import { ResumeDto } from '@/dto/resume.dto';
import ConversionService from '@/services/conversion.service';

export interface IResumeService {
  conversionService: ConversionService;
  save(resumeDto: ResumeDto): Promise<string>;
  getResumes(): Promise<ResumeDto[]>;
  getResumeById(resumeId: string): Promise<ResumeDto>;
}
