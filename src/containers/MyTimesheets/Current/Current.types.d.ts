import { Moment } from "moment";

export interface ITask extends ITaskNames, ITaskWeeks {}

export interface ITaskNames {
  id: number;
  projectName: string;
  taskName: string;
  remainingTime: number;
}

export interface ICurrentDate {
  startDate: Moment;
  endDate: Moment;
}

export interface ITaskWeeks {
  mon: number | null;
  tue: number | null;
  wed: number | null;
  thu: number | null;
  fri: number | null;
  sat: number | null;
  sun: number | null;
  total: number | null;
}
