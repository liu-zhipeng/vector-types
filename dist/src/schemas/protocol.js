import { Type } from "@sinclair/typebox";
import { TAddress, TBalance, TBasicMeta, TBytes32, TIntegerString, TNetworkContext, TPublicIdentifier, TransferResolverSchema, TransferStateSchema, } from "./basic";
const SetupProtocolParamsSchema = Type.Object({
    timeout: TIntegerString,
    networkContext: TNetworkContext,
    counterpartyIdentifier: TPublicIdentifier,
    meta: Type.Optional(TBasicMeta),
});
const DepositProtocolParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    meta: Type.Optional(TBasicMeta),
});
const CreateProtocolParamsSchema = Type.Object({
    channelAddress: TAddress,
    balance: TBalance,
    assetId: TAddress,
    transferDefinition: TAddress,
    transferInitialState: TransferStateSchema,
    timeout: TIntegerString,
    meta: Type.Optional(TBasicMeta),
});
const ResolveProtocolParamsSchema = Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
    transferResolver: TransferResolverSchema,
    meta: Type.Optional(TBasicMeta),
});
export var ProtocolParams;
(function (ProtocolParams) {
    ProtocolParams.SetupSchema = SetupProtocolParamsSchema;
    ProtocolParams.DepositSchema = DepositProtocolParamsSchema;
    ProtocolParams.CreateSchema = CreateProtocolParamsSchema;
    ProtocolParams.ResolveSchema = ResolveProtocolParamsSchema;
})(ProtocolParams || (ProtocolParams = {}));
//# sourceMappingURL=protocol.js.map