/* tslint:disable */
import { StackService } from './stack-service';
export interface Stack {
  id?: string;
  key?: string;
  name?: string;
  services?: Array<StackService>;
  status?: string;
  action?: string;
  createTime?: number;
  updateTime?: number;
}
