export interface ILevelData {
  id: number;
  level_id: number;
  verifier_id: number;
  place: number;
  score: number;
  minimal_percent: number;
  length: number;
  objects: number;
  name: string;
  description: string;
  verifier: string;
  creator: string;
  holder: string;
  video: string;
  song: string;
  created_in: string;
  password: string;
  need_new_label: boolean;
}

export interface ILevel {
  success: boolean;
  message: string;
  data: ILevelData[];
}
