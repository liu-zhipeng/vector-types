import { Type } from "@sinclair/typebox";
import { ChannelRpcMethods } from "../vectorProvider";
import { TBasicMeta, TAddress, TBytes32, TPublicIdentifier, TChainId, TIntegerString, TransferResolverSchema, WithdrawalQuoteSchema, TransferQuoteSchema, } from "./basic";
const GetWithdrawalQuoteParamsSchema = Type.Object({
    amount: TIntegerString,
    assetId: TAddress,
    channelAddress: TAddress,
    receiveExactAmount: Type.Optional(Type.Boolean()),
});
const GetTransferQuoteParamsSchema = Type.Object({
    routerIdentifier: TPublicIdentifier,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    recipient: Type.Optional(TPublicIdentifier),
    recipientChainId: Type.Optional(TChainId),
    recipientAssetId: Type.Optional(TAddress),
    receiveExactAmount: Type.Optional(Type.Boolean()),
});
const GetRouterConfigParamsSchema = Type.Object({
    routerIdentifier: TPublicIdentifier,
});
const GetTransferStateByRoutingIdParamsSchema = Type.Object({
    channelAddress: TAddress,
    routingId: TBytes32,
});
const GetTransferStatesByRoutingIdParamsSchema = Type.Object({
    routingId: TBytes32,
});
const GetChannelStateParamsSchema = Type.Object({ channelAddress: TAddress });
const GetChannelStatesParamsSchema = Type.Object({});
const GetChannelStateByParticipantsParamsSchema = Type.Object({
    alice: TPublicIdentifier,
    bob: TPublicIdentifier,
    chainId: TChainId,
});
const GetActiveTransfersParamsSchema = Type.Object({
    channelAddress: TAddress,
});
const GetTransferStateParamsSchema = Type.Object({
    transferId: TBytes32,
});
export const GetTransfersFilterOptsSchema = Type.Object({
    channelAddress: Type.Optional(TAddress),
    startDate: Type.Optional(Type.Any()),
    endDate: Type.Optional(Type.Any()),
    active: Type.Optional(Type.Boolean()),
    routingId: Type.Optional(TBytes32),
    transferDefinition: Type.Optional(TAddress),
});
const GetTransfersParamsSchema = Type.Object({
    filterOpts: Type.Optional(GetTransfersFilterOptsSchema),
});
const GetRegisteredTransfersParamsSchema = Type.Object({
    chainId: TChainId,
});
const GetWithdrawalCommitmentParamsSchema = Type.Object({
    transferId: TBytes32,
});
const GetWithdrawalCommitmentByTransactionHashParamsSchema = Type.Object({
    transactionHash: TBytes32,
});
const SetupEngineParamsSchema = Type.Object({
    counterpartyIdentifier: TPublicIdentifier,
    chainId: TChainId,
    timeout: Type.Optional(TIntegerString),
    meta: Type.Optional(TBasicMeta),
});
const DepositEngineParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    meta: Type.Optional(TBasicMeta),
});
const RequestCollateralEngineParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    amount: Type.Optional(TIntegerString),
});
const CreateConditionalTransferParamsSchema = Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    recipient: Type.Optional(TPublicIdentifier),
    recipientChainId: Type.Optional(TChainId),
    recipientAssetId: Type.Optional(TAddress),
    timeout: Type.Optional(TIntegerString),
    meta: Type.Optional(TBasicMeta),
    type: Type.String(),
    details: Type.Dict(Type.Any()),
    quote: Type.Optional(TransferQuoteSchema),
});
const ResolveTransferParamsSchema = Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
    meta: Type.Optional(TBasicMeta),
    transferResolver: TransferResolverSchema,
});
const WithdrawParamsSchema = Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    recipient: TAddress,
    timeout: Type.Optional(TIntegerString),
    quote: Type.Optional(WithdrawalQuoteSchema),
    callTo: Type.Optional(TAddress),
    callData: Type.Optional(Type.String()),
    meta: Type.Optional(TBasicMeta),
    initiatorSubmits: Type.Optional(Type.Boolean()),
});
const WithdrawRetryParamsSchema = Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
});
const AddTransactionToCommitmentParamsSchema = Type.Object({
    transactionHash: TBytes32,
    channelAddress: TAddress,
    transferId: TBytes32,
});
const DisputeChannelParamsSchema = Type.Object({
    channelAddress: TAddress,
});
const DefundChannelParamsSchema = Type.Object({
    channelAddress: TAddress,
});
const GetChannelDisputeParamsSchema = Type.Object({
    channelAddress: TAddress,
});
const DisputeTransferParamsSchema = Type.Object({
    transferId: TBytes32,
});
const DefundTransferParamsSchema = Type.Object({
    transferId: TBytes32,
});
const GetTransferDisputeParamsSchema = Type.Object({
    transferId: TBytes32,
});
const ExitChannelParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetIds: Type.Array(TAddress),
    recipient: Type.Optional(TAddress),
    owner: Type.Optional(TAddress),
});
const SignUtilityMessageParamsSchema = Type.Object({
    message: Type.String(),
});
const SendIsAliveParamsSchema = Type.Object({ channelAddress: TAddress, skipCheckIn: Type.Boolean() });
const RestoreStateParamsSchema = Type.Object({
    counterpartyIdentifier: TPublicIdentifier,
    chainId: TChainId,
});
const RpcRequestEngineParamsSchema = Type.Object({
    id: Type.Number({ minimum: 1 }),
    jsonrpc: Type.Literal("2.0"),
    method: Type.Union(Object.values(ChannelRpcMethods).map((methodName) => Type.Literal(methodName))),
    params: Type.Optional(Type.Any()),
});
export var EngineParams;
(function (EngineParams) {
    EngineParams.RpcRequestSchema = RpcRequestEngineParamsSchema;
    EngineParams.GetRouterConfigSchema = GetRouterConfigParamsSchema;
    EngineParams.SignUtilityMessageSchema = SignUtilityMessageParamsSchema;
    EngineParams.SendIsAliveSchema = SendIsAliveParamsSchema;
    EngineParams.GetTransferStateByRoutingIdSchema = GetTransferStateByRoutingIdParamsSchema;
    EngineParams.GetTransferStatesByRoutingIdSchema = GetTransferStatesByRoutingIdParamsSchema;
    EngineParams.GetChannelStatesSchema = GetChannelStatesParamsSchema;
    EngineParams.GetChannelStateSchema = GetChannelStateParamsSchema;
    EngineParams.GetChannelStateByParticipantsSchema = GetChannelStateByParticipantsParamsSchema;
    EngineParams.GetActiveTransfersSchema = GetActiveTransfersParamsSchema;
    EngineParams.GetTransferStateSchema = GetTransferStateParamsSchema;
    EngineParams.GetTransfersSchema = GetTransfersParamsSchema;
    EngineParams.GetRegisteredTransfersSchema = GetRegisteredTransfersParamsSchema;
    EngineParams.GetWithdrawalCommitmentSchema = GetWithdrawalCommitmentParamsSchema;
    EngineParams.GetWithdrawalCommitmentByTransactionHashSchema = GetWithdrawalCommitmentByTransactionHashParamsSchema;
    EngineParams.SetupSchema = SetupEngineParamsSchema;
    EngineParams.RestoreStateSchema = RestoreStateParamsSchema;
    EngineParams.DepositSchema = DepositEngineParamsSchema;
    EngineParams.RequestCollateralSchema = RequestCollateralEngineParamsSchema;
    EngineParams.ConditionalTransferSchema = CreateConditionalTransferParamsSchema;
    EngineParams.ResolveTransferSchema = ResolveTransferParamsSchema;
    EngineParams.WithdrawSchema = WithdrawParamsSchema;
    EngineParams.WithdrawRetrySchema = WithdrawRetryParamsSchema;
    EngineParams.AddTransactionToCommitmentSchema = AddTransactionToCommitmentParamsSchema;
    EngineParams.DisputeChannelSchema = DisputeChannelParamsSchema;
    EngineParams.DefundChannelSchema = DefundChannelParamsSchema;
    EngineParams.GetChannelDisputeSchema = GetChannelDisputeParamsSchema;
    EngineParams.DisputeTransferSchema = DisputeTransferParamsSchema;
    EngineParams.DefundTransferSchema = DefundTransferParamsSchema;
    EngineParams.GetTransferDisputeSchema = GetTransferDisputeParamsSchema;
    EngineParams.ExitChannelSchema = ExitChannelParamsSchema;
    EngineParams.GetTransferQuoteSchema = GetTransferQuoteParamsSchema;
    EngineParams.GetWithdrawalQuoteSchema = GetWithdrawalQuoteParamsSchema;
})(EngineParams || (EngineParams = {}));
//# sourceMappingURL=engine.js.map