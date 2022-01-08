export declare const MILLISECONDS_IN_A_SECOND = 1000;
export declare const MILLISECONDS_IN_A_MINUTE: number;
export declare const MILLISECONDS_IN_AN_HOUR: number;
export declare const colors: {
    readonly reset: "\u001B[0m";
    readonly fail: "\u001B[31m";
    readonly success: "\u001B[32m";
    readonly highlight: "\u001B[33m";
    readonly system: "\u001B[35m";
    readonly neutral: "\u001B[36m";
    readonly control: "\u001B[90m";
};
export declare const bgColors: {
    readonly reset: "\u001B[0m";
    readonly fail: "\u001B[41m";
    readonly success: "\u001B[42m";
    readonly highlight: "\u001B[43m";
    readonly system: "\u001B[45m";
    readonly neutral: "\u001B[46m";
    readonly control: "\u001B[47m";
};
export declare type ColorKey = keyof typeof colors;
export declare type BGColorKey = keyof typeof bgColors;
export declare type TimeObject = {
    hours: number;
    minutes: number;
    seconds: number;
};
export declare type Broadcaster = (text: string | number, color: ColorKey) => void;
//# sourceMappingURL=types.d.ts.map