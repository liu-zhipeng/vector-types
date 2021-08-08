import { Static } from "@sinclair/typebox";
export declare const ApproveParamsSchema: import("@sinclair/typebox").TObject<{
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    signer: import("@sinclair/typebox").TString;
    fromProvider: import("@sinclair/typebox").TString;
    toProvider: import("@sinclair/typebox").TString;
    fromChainId: import("@sinclair/typebox").TNumber;
    toChainId: import("@sinclair/typebox").TNumber;
}>;
export declare type ApproveParams = Static<typeof ApproveParamsSchema>;
export declare const ApproveResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        allowance: import("@sinclair/typebox").TString;
        transaction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TString;
            data: import("@sinclair/typebox").TString;
        }>>;
    }>;
};
export declare type ApproveResponse = Static<typeof ApproveResponseSchema["200"]>;
export declare const ExecuteParamsSchema: import("@sinclair/typebox").TObject<{
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    signer: import("@sinclair/typebox").TString;
    fromProvider: import("@sinclair/typebox").TString;
    toProvider: import("@sinclair/typebox").TString;
    fromChainId: import("@sinclair/typebox").TNumber;
    toChainId: import("@sinclair/typebox").TNumber;
}>;
export declare type ExecuteParams = Static<typeof ExecuteParamsSchema>;
export declare const ExecuteResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        transaction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TString;
            data: import("@sinclair/typebox").TString;
        }>>;
    }>;
};
export declare type ExecuteResponse = Static<typeof ExecuteResponseSchema["200"]>;
export declare const CheckStatusParamsSchema: import("@sinclair/typebox").TObject<{
    txHash: import("@sinclair/typebox").TString;
    fromProvider: import("@sinclair/typebox").TString;
    toProvider: import("@sinclair/typebox").TString;
    fromChainId: import("@sinclair/typebox").TNumber;
    toChainId: import("@sinclair/typebox").TNumber;
    signer: import("@sinclair/typebox").TString;
}>;
export declare type CheckStatusParams = Static<typeof CheckStatusParamsSchema>;
export declare const CheckStatusResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        status: import("@sinclair/typebox").TObject<{
            completed: import("@sinclair/typebox").TBoolean;
        }>;
        transaction: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TString;
            data: import("@sinclair/typebox").TString;
        }>>;
    }>;
};
export declare type CheckStatusResponse = Static<typeof CheckStatusResponseSchema["200"]>;
//# sourceMappingURL=autoRebalance.d.ts.map