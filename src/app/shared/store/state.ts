import { FrameworkState } from '@framework/store';

export interface State extends FrameworkState {
  theme?: string;
  language?: string;
  returnRoute?: string;
  token?: string;
  user?: any;
}
