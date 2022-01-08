import { ColorKey } from './types';
export declare class TrackETA {
    constructor(totalTasks: number, taskName?: string);
    private taskName;
    private startTimestamp;
    private currentTask;
    private totalTasks;
    private percentageCompleted;
    private getReadablePercentage;
    private setText;
    private updateETA;
    setCurrentTask: (newTask: number) => void;
    incTask: () => void;
    getProgress: (color?: ColorKey) => string;
    finish: () => void;
}
//# sourceMappingURL=TrackETA.d.ts.map