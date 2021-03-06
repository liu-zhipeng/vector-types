export declare type JsonRpcRequest<T = any> = {
    id: number;
    jsonrpc: "2.0";
    method: string;
    params: T;
};
export declare type JsonRpcResponse<T = any> = {
    id: number;
    jsonrpc: "2.0";
    result: T;
};
export declare type Rpc = {
    id?: number;
    methodName: string;
    parameters: {
        [key: string]: any;
    } | any[];
};
//# sourceMappingURL=rpc.d.ts.map