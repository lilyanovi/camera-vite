import { StatusLoading } from '../const';
import { TCamera } from './camera';

export type CamerasProcess = {
  cameras: TCamera[];
  statusLoading: StatusLoading;
};
