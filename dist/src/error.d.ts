import { UpdateParams, FullChannelState, ChannelUpdate } from "./channel";
export declare const jsonifyError: (error: VectorError | Error) => VectorErrorJson;
export declare class Result<T, Y extends Error = any> {
    private value?;
    private error?;
    isError: boolean;
    private constructor();
    getValue(): T;
    getError(): Y | undefined;
    toJson(): ResultJson;
    static fromJson<U, Y extends Error>(json: ResultJson<U, Y>): Result<U, Y>;
    static fail<U, Y extends Error>(error: Y): Result<U, Y>;
    static ok<T>(result: T): Result<T>;
}
export declare type ResultJson<U = any, Y = any> = {
    isError: true;
    error: Y;
} | {
    isError: false;
    value: U;
};
export declare type Values<E> = E[keyof E];
export declare type VectorErrorJson = {
    message: string;
    context: any;
    type: string;
    stack?: string;
};
export declare class VectorError extends Error {
    readonly msg: Values<typeof VectorError.reasons>;
    readonly context: any;
    readonly type: string;
    static readonly reasons: {
        [key: string]: string;
    };
    constructor(msg: Values<typeof VectorError.reasons>, context?: any, type?: string);
    toJson(): VectorErrorJson;
    static fromJson(json: VectorErrorJson): VectorError;
}
export declare class MessagingError extends VectorError {
    readonly message: Values<typeof MessagingError.reasons>;
    readonly context: any;
    readonly type: string;
    static readonly reasons: {
        readonly Timeout: "Request timed out";
        readonly Unknown: "Unknown messaging error";
    };
    constructor(message: Values<typeof MessagingError.reasons>, context?: any, type?: string);
}
export declare type ProtocolErrorContext = {
    state?: FullChannelState;
    params?: UpdateParams<any>;
    update?: ChannelUpdate;
} & any;
export declare abstract class ProtocolError extends VectorError {
    readonly msg: string;
    readonly type: string;
    readonly context: ProtocolErrorContext;
    constructor(msg: string, state?: FullChannelState, update?: ChannelUpdate, params?: UpdateParams<any>, context?: any, type?: string);
}
export declare type EngineErrorContext = {
    channelAddress: string;
    publicIdentifier: string;
} & any;
export declare abstract class EngineError extends VectorError {
    readonly msg: string;
    readonly type: string;
    readonly context: EngineErrorContext;
    constructor(msg: string, channelAddress: string, publicIdentifier: string, context?: any, type?: string);
}
export declare type NodeErrorContext = any;
export declare abstract class NodeError extends VectorError {
    readonly msg: string;
    readonly type: string;
    readonly context: NodeErrorContext;
    constructor(msg: string, context?: any, type?: string);
}
export declare type RouterErrorContext = any;
export declare abstract class RouterError extends VectorError {
    readonly msg: string;
    readonly type: string;
    readonly context: RouterErrorContext;
    constructor(msg: string, context?: any, type?: string);
}
//# sourceMappingURL=error.d.ts.map