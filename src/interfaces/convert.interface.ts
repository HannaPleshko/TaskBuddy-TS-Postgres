import { ResumeDto } from '@/dto/resume.dto';

export interface IConvertService {
  readonly resume: ResumeDto;
  convertToDocx(): Promise<Buffer>;
}
