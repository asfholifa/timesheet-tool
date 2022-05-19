export interface ITask extends ITaskNames, ITaskWeeks {}

export interface ITaskNames {
  projectName: string;
  taskName: string;
  remainingTime: number;
}

export interface ITaskWeeks {
  mon: number | undefined;
  tue: number | undefined;
  wed: number | undefined;
  thu: number | undefined;
  fri: number | undefined;
  sat: number | undefined;
  sun: number | undefined;
  total: number | undefined;
}
