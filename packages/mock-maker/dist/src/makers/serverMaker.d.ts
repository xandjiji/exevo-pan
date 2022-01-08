/// <reference types="exevo-pan" />
export declare const randomServerId: () => number;
export declare const randomServer: () => ServerObject;
export declare const randomServerList: (amount: number) => ServerObject[];
export declare const randomServerData: (amount: number) => {
    rawServerData: Record<string, ServerObject>;
    serverList: ServerObject[];
};
//# sourceMappingURL=serverMaker.d.ts.map