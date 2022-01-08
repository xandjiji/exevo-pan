export declare const buildSchema: (orderByDefault: number, descendingDefault: boolean) => ({
    key: string;
    defaultValue: number;
    decode: (value: string) => number;
} | {
    key: string;
    defaultValue: boolean;
    decode: (value: string) => boolean;
})[];
//# sourceMappingURL=sortUrl.d.ts.map