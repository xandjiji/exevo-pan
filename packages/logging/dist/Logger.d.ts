import { Broadcaster } from './types';
declare class Logger {
    private stream;
    log: (message: string) => void;
    broadcast: Broadcaster;
    tabBroadcast: Broadcaster;
    setFooterText: (value: string) => void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=Logger.d.ts.map