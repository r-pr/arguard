///<reference path="arguard" />

export interface IStringResult {
    oneOf: (arr: string[])=> void;
    nonempty: ()=> void;
}

export interface INumberResult {
    positive: ()=> void;
}

export declare function string(param: any, paramName: string): IStringResult;

export declare function number(param: any, paramName: string): INumberResult;

export declare function bool(param: any, paramName: string): void;

export declare function func(param: any, paramName: string): void;

export declare function object(param: any, paramName: string): void;

export declare function array(param: any, paramName: string): void;

export declare var names = {
    params: 'params',
    options: 'options',
    cb: 'cb'
}