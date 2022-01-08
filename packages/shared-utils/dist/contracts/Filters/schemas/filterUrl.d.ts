/// <reference types="exevo-pan" />
export declare const filterSchema: ({
    key: string;
    defaultValue: string;
    encode?: undefined;
    decode?: undefined;
} | {
    key: string;
    defaultValue: Set<VocationOptions>;
    encode: (set: Set<boolean | number | string>) => string;
    decode: (encodedValue: string) => Set<number>;
} | {
    key: string;
    defaultValue: Set<boolean>;
    encode: (set: Set<boolean | number | string>) => string;
    decode: (encodedValue: string) => Set<boolean>;
} | {
    key: string;
    defaultValue: Set<string>;
    encode: (set: Set<boolean | number | string>) => string;
    decode: (encodedValue: string) => Set<string>;
} | {
    key: string;
    defaultValue: number;
    decode: (encodedValue: string) => number;
    encode?: undefined;
} | {
    key: string;
    defaultValue: boolean;
    decode: (encodedValue: string) => boolean;
    encode?: undefined;
})[];
//# sourceMappingURL=filterUrl.d.ts.map