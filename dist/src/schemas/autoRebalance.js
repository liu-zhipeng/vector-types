import { Type } from "@sinclair/typebox";
import { TAddress, TChainId, TIntegerString, TBytes32 } from "./basic";
export const ApproveParamsSchema = Type.Object({
    amount: TIntegerString,
    assetId: TAddress,
    signer: TAddress,
    fromProvider: Type.String({ format: "uri" }),
    toProvider: Type.String({ format: "uri" }),
    fromChainId: TChainId,
    toChainId: TChainId,
});
export const ApproveResponseSchema = {
    200: Type.Object({
        allowance: Type.String(),
        transaction: Type.Optional(Type.Object({
            to: Type.String(),
            data: Type.String(),
        })),
    }),
};
export const ExecuteParamsSchema = ApproveParamsSchema;
export const ExecuteResponseSchema = {
    200: Type.Object({
        transaction: Type.Optional(Type.Object({
            to: Type.String(),
            data: Type.String(),
        })),
    }),
};
export const CheckStatusParamsSchema = Type.Object({
    txHash: TBytes32,
    fromProvider: Type.String({ format: "uri" }),
    toProvider: Type.String({ format: "uri" }),
    fromChainId: TChainId,
    toChainId: TChainId,
    signer: TAddress,
});
export const CheckStatusResponseSchema = {
    200: Type.Object({
        status: Type.Object({ completed: Type.Boolean() }),
        transaction: Type.Optional(Type.Object({
            to: Type.String(),
            data: Type.String(),
        })),
    }),
};
//# sourceMappingURL=autoRebalance.js.map