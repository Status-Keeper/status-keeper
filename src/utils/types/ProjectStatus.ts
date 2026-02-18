import { Stage } from "./Stage";

export class ProjectStatus {
	id: string  = '';
	progress: number = 0;
	stages: Stage[] = [];
	deadline: Date = new Date();
	finishDate?: Date | null;
	objectTitle: string = '';
}