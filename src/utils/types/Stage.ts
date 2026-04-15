export type Stage = {
  id: string;
  title: string;
  status: string;
  deadline?: Date;
  finishDate: Date | null;
  isCompleted: boolean;
  isCurrent: boolean;
  isPrevious: boolean;
  acceptanceHint?: string;
  nextStageHint?: string;
}