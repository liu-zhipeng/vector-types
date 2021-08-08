import { Type } from "@sinclair/typebox";
import { EngineEvents } from "../engine";
import { EngineParams } from "./engine";
import { TUrl, TAddress, TPublicIdentifier, TIntegerString, TBytes32, TFullTransferState, TFullChannelState, TChainId, AllowedSwapSchema, TContractAddresses, TransferQuoteSchema, WithdrawalQuoteSchema, TSignature, TBytes, TransferDisputeSchema, ChannelDisputeSchema, TVectorErrorJson, } from "./basic";
const BasicChannelServerResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
    }),
};
const BasicTransferServerResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        routingId: Type.Optional(TBytes32),
    }),
};
const PostWithdrawalQuoteParamsSchema = Type.Intersect([
    EngineParams.GetWithdrawalQuoteSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const PostWithdrawalQuoteResponseSchema = {
    200: WithdrawalQuoteSchema,
};
const PostTransferQuoteParamsSchema = Type.Intersect([
    EngineParams.GetTransferQuoteSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const PostTransferQuoteResponseSchema = {
    200: TransferQuoteSchema,
};
const GetRouterConfigParamsSchema = Type.Intersect([
    EngineParams.GetRouterConfigSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetRouterConfigResponseSchema = {
    200: Type.Object({
        supportedChains: Type.Array(TChainId),
        allowedSwaps: Type.Array(AllowedSwapSchema),
    }),
};
const GetTransferStateByRoutingIdParamsSchema = Type.Intersect([
    EngineParams.GetTransferStateByRoutingIdSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetTransferStateByRoutingIdResponseSchema = {
    200: Type.Union([Type.Undefined(), TFullTransferState]),
};
const GetTransferStatesByRoutingIdParamsSchema = Type.Intersect([
    EngineParams.GetTransferStatesByRoutingIdSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetTransferStatesByRoutingIdResponseSchema = {
    200: Type.Array(TFullTransferState),
};
const GetActiveTransfersByChannelAddressParamsSchema = Type.Intersect([
    EngineParams.GetActiveTransfersSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetActiveTransfersByChannelAddressResponseSchema = {
    200: Type.Array(TFullTransferState),
};
const GetTransferStateParamsSchema = Type.Intersect([
    EngineParams.GetTransferStateSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetTransferStateResponseSchema = {
    200: Type.Union([Type.Undefined(), TFullTransferState]),
};
const GetTransfersParamsSchema = Type.Object({ publicIdentifier: TPublicIdentifier });
const GetTransfersResponseSchema = {
    200: Type.Array(TFullTransferState),
};
const GetChannelStateParamsSchema = Type.Intersect([
    EngineParams.GetChannelStateSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelStateResponseSchema = {
    200: Type.Union([Type.Undefined(), TFullChannelState]),
};
const GetChannelStatesParamsSchema = Type.Intersect([
    EngineParams.GetChannelStatesSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelStatesResponseSchema = {
    200: Type.Array(TAddress),
};
const GetChannelStateByParticipantsParamsSchema = Type.Object({
    publicIdentifier: TPublicIdentifier,
    counterparty: TPublicIdentifier,
    chainId: TChainId,
});
const GetChannelStateByParticipantsResponseSchema = GetChannelStateResponseSchema;
const GetConfigResponseSchema = {
    200: Type.Array(Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        index: Type.Integer(),
        chainAddresses: Type.Dict(TContractAddresses),
    })),
};
const GetStatusResponseSchema = {
    200: Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        providerSyncing: Type.Dict(Type.Union([
            Type.Boolean(),
            Type.Object({
                startingBlock: Type.String(),
                currentBlock: Type.String(),
                highestBlock: Type.String(),
            }),
            Type.String(),
            Type.Undefined(),
        ])),
        version: Type.String(),
    }),
};
const GetListenerParamsSchema = Type.Object({
    eventName: Type.Union(Object.values(EngineEvents).map((e) => Type.Literal(e))),
    publicIdentifier: TPublicIdentifier,
});
const GetListenerResponseSchema = {
    200: Type.Object({ url: TUrl }),
};
const GetListenersParamsSchema = Type.Object({ publicIdentifier: TPublicIdentifier });
const GetListenersResponseSchema = {
    200: Type.Dict(TUrl),
};
const GetRegisteredTransfersParamsSchema = Type.Intersect([
    EngineParams.GetRegisteredTransfersSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetRegisteredTransfersResponseSchema = {
    200: Type.Array(Type.Object({
        name: Type.String(),
        stateEncoding: Type.String(),
        resolverEncoding: Type.String(),
        definition: TAddress,
        encodedCancel: Type.String(),
    })),
};
const GetWithdrawalCommitmentParamsSchema = Type.Intersect([
    EngineParams.GetWithdrawalCommitmentSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetWithdrawalCommitmentResponseSchema = {
    200: Type.Union([
        Type.Undefined(),
        Type.Object({
            aliceSignature: Type.Optional(TSignature),
            bobSignature: Type.Optional(TSignature),
            channelAddress: TAddress,
            alice: TAddress,
            bob: TAddress,
            recipient: TAddress,
            assetId: TAddress,
            amount: TIntegerString,
            nonce: TIntegerString,
            callTo: TAddress,
            callData: TBytes,
            transactionHash: Type.Optional(TBytes32),
        }),
    ]),
};
const GetWithdrawalCommitmentByTransactionHashParamsSchema = Type.Intersect([
    EngineParams.GetWithdrawalCommitmentByTransactionHashSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetWithdrawalCommitmentByTransactionHashResponseSchema = {
    200: Type.Union([
        Type.Undefined(),
        Type.Object({
            aliceSignature: Type.Optional(TSignature),
            bobSignature: Type.Optional(TSignature),
            channelAddress: TAddress,
            alice: TAddress,
            bob: TAddress,
            recipient: TAddress,
            assetId: TAddress,
            amount: TIntegerString,
            nonce: TIntegerString,
            callTo: TAddress,
            callData: TBytes,
            transactionHash: Type.Optional(TBytes32),
        }),
    ]),
};
const PostRegisterListenerBodySchema = Type.Object({
    publicIdentifier: TPublicIdentifier,
    events: Type.Dict(Type.String()),
});
const PostRegisterListenerResponseSchema = {
    200: Type.Object({
        message: Type.String(),
    }),
};
const PostSetupBodySchema = Type.Intersect([
    EngineParams.SetupSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSetupResponseSchema = BasicChannelServerResponseSchema;
const PostRequestSetupBodySchema = PostSetupBodySchema;
const PostRequestSetupResponseSchema = BasicChannelServerResponseSchema;
const PostDepositBodySchema = Type.Intersect([
    EngineParams.DepositSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostDepositResponseSchema = BasicChannelServerResponseSchema;
const PostRequestCollateralBodySchema = Type.Intersect([
    EngineParams.RequestCollateralSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostRequestCollateralResponseSchema = BasicChannelServerResponseSchema;
const PostSendDepositTxBodySchema = Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    publicIdentifier: TPublicIdentifier,
});
const PostSendDepositTxResponseSchema = {
    200: Type.Object({
        txHash: TBytes32,
    }),
};
const PostConditionalTransferBodySchema = Type.Intersect([
    EngineParams.ConditionalTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostConditionalTransferResponseSchema = BasicTransferServerResponseSchema;
const PostResolveTransferBodySchema = Type.Intersect([
    EngineParams.ResolveTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostResolveTransferResponseSchema = BasicTransferServerResponseSchema;
const PostWithdrawTransferBodySchema = Type.Intersect([
    EngineParams.WithdrawSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostWithdrawTransferResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        transactionHash: Type.Optional(TBytes32),
        transaction: Type.Object({
            to: TAddress,
            value: TIntegerString,
            data: Type.String(),
        }),
    }),
};
const PostWithdrawRetryTransferBodySchema = Type.Intersect([
    EngineParams.WithdrawRetrySchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostWithdrawRetryTransferResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        transactionHash: Type.Optional(TBytes32),
    }),
};
const PostAddTransactionToCommitmentTransferBodySchema = Type.Intersect([
    EngineParams.AddTransactionToCommitmentSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSignUtilityMessageBodySchema = Type.Intersect([
    EngineParams.SignUtilityMessageSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSignUtilityMessageResponseSchema = {
    200: Type.Object({
        signedMessage: Type.String(),
    }),
};
const PostRestoreStateBodySchema = Type.Intersect([
    EngineParams.RestoreStateSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostRestoreStateResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
    }),
};
const PostCreateNodeBodySchema = Type.Object({
    index: Type.Integer({ minimum: 0, maximum: 2147483647 }),
    mnemonic: Type.Optional(Type.String()),
    skipCheckIn: Type.Optional(Type.Boolean()),
});
const PostCreateNodeResponseSchema = {
    200: Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        index: Type.Integer(),
    }),
};
const PostAdminBodySchema = Type.Object({
    adminToken: Type.String({
        example: "cxt1234",
        description: "Admin token",
    }),
});
const PostAdminResponseSchema = {
    200: Type.Object({
        message: Type.String(),
    }),
};
const PostAdminSubmitWithdrawalsBodySchema = Type.Object({
    adminToken: Type.String(),
});
const PostAdminSubmitWithdrawalsResponseSchema = {
    200: Type.Dict(Type.Union([
        Type.Array(Type.Object({
            transactionHash: Type.String(),
            transferId: TBytes32,
            channelAddress: TAddress,
        })),
        Type.Object({
            message: Type.String(),
            type: Type.String(),
            context: Type.Dict(Type.Any()),
            stack: Type.String(),
        }),
    ])),
};
const GetChannelDisputeParamsSchema = Type.Intersect([
    EngineParams.GetChannelDisputeSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelDisputeResponseSchema = {
    200: Type.Union([Type.Undefined(), ChannelDisputeSchema]),
};
const PostSendDisputeChannelTxBodySchema = Type.Intersect([
    EngineParams.DisputeChannelSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDisputeChannelTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendDefundChannelTxBodySchema = Type.Intersect([
    EngineParams.DefundChannelSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDefundChannelTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const GetTransferDisputeParamsSchema = Type.Intersect([
    EngineParams.GetTransferDisputeSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetTransferDisputeResponseSchema = {
    200: Type.Union([Type.Undefined(), TransferDisputeSchema]),
};
const PostSendDisputeTransferTxBodySchema = Type.Intersect([
    EngineParams.DisputeTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDisputeTransferTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendDefundTransferTxBodySchema = Type.Intersect([
    EngineParams.DefundTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDefundTransferTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendExitChannelTxBodySchema = Type.Intersect([
    EngineParams.ExitChannelSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendExitChannelTxResponseSchema = {
    200: Type.Array(Type.Object({
        assetId: TAddress,
        transactionHash: Type.Optional(TBytes32),
        error: Type.Optional(TVectorErrorJson),
    })),
};
const PostSendIsAliveBodySchema = Type.Intersect([
    EngineParams.SendIsAliveSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendIsAliveResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
    }),
};
export var NodeParams;
(function (NodeParams) {
    NodeParams.GetStatusSchema = Type.Object({});
    NodeParams.WithdrawalQuoteSchema = PostWithdrawalQuoteParamsSchema;
    NodeParams.TransferQuoteSchema = PostTransferQuoteParamsSchema;
    NodeParams.GetRouterConfigSchema = GetRouterConfigParamsSchema;
    NodeParams.GetTransferStateByRoutingIdSchema = GetTransferStateByRoutingIdParamsSchema;
    NodeParams.GetTransferStatesByRoutingIdSchema = GetTransferStatesByRoutingIdParamsSchema;
    NodeParams.GetTransferStateSchema = GetTransferStateParamsSchema;
    NodeParams.GetTransfersSchema = GetTransfersParamsSchema;
    NodeParams.GetActiveTransfersByChannelAddressSchema = GetActiveTransfersByChannelAddressParamsSchema;
    NodeParams.GetChannelStateSchema = GetChannelStateParamsSchema;
    NodeParams.GetChannelStatesSchema = GetChannelStatesParamsSchema;
    NodeParams.GetChannelStateByParticipantsSchema = GetChannelStateByParticipantsParamsSchema;
    NodeParams.GetListenerSchema = GetListenerParamsSchema;
    NodeParams.GetListenersSchema = GetListenersParamsSchema;
    NodeParams.GetRegisteredTransfersSchema = GetRegisteredTransfersParamsSchema;
    NodeParams.GetWithdrawalCommitmentSchema = GetWithdrawalCommitmentParamsSchema;
    NodeParams.GetWithdrawalCommitmentByTransactionHashSchema = GetWithdrawalCommitmentByTransactionHashParamsSchema;
    NodeParams.GetConfigSchema = Type.Object({});
    NodeParams.SetupSchema = PostSetupBodySchema;
    NodeParams.RequestSetupSchema = PostRequestSetupBodySchema;
    NodeParams.DepositSchema = PostDepositBodySchema;
    NodeParams.RequestCollateralSchema = PostRequestCollateralBodySchema;
    NodeParams.SendDepositTxSchema = PostSendDepositTxBodySchema;
    NodeParams.ConditionalTransferSchema = PostConditionalTransferBodySchema;
    NodeParams.ResolveTransferSchema = PostResolveTransferBodySchema;
    NodeParams.WithdrawSchema = PostWithdrawTransferBodySchema;
    NodeParams.WithdrawRetrySchema = PostWithdrawRetryTransferBodySchema;
    NodeParams.AddTransactionToCommitmentSchema = PostAddTransactionToCommitmentTransferBodySchema;
    NodeParams.RegisterListenerSchema = PostRegisterListenerBodySchema;
    NodeParams.SignUtilityMessageSchema = PostSignUtilityMessageBodySchema;
    NodeParams.RestoreStateSchema = PostRestoreStateBodySchema;
    NodeParams.AdminSchema = PostAdminBodySchema;
    NodeParams.CreateNodeSchema = PostCreateNodeBodySchema;
    NodeParams.GetChannelDisputeSchema = GetChannelDisputeParamsSchema;
    NodeParams.SendDisputeChannelTxSchema = PostSendDisputeChannelTxBodySchema;
    NodeParams.SendDefundChannelTxSchema = PostSendDefundChannelTxBodySchema;
    NodeParams.GetTransferDisputeSchema = GetTransferDisputeParamsSchema;
    NodeParams.SendDisputeTransferTxSchema = PostSendDisputeTransferTxBodySchema;
    NodeParams.SendDefundTransferTxSchema = PostSendDefundTransferTxBodySchema;
    NodeParams.SendExitChannelTxSchema = PostSendExitChannelTxBodySchema;
    NodeParams.SendIsAliveSchema = PostSendIsAliveBodySchema;
    NodeParams.SubmitWithdrawalsSchema = PostAdminSubmitWithdrawalsBodySchema;
})(NodeParams || (NodeParams = {}));
export var NodeResponses;
(function (NodeResponses) {
    NodeResponses.WithdrawalQuoteSchema = PostWithdrawalQuoteResponseSchema;
    NodeResponses.TransferQuoteSchema = PostTransferQuoteResponseSchema;
    NodeResponses.GetRouterConfigSchema = GetRouterConfigResponseSchema;
    NodeResponses.GetTransferStateByRoutingIdSchema = GetTransferStateByRoutingIdResponseSchema;
    NodeResponses.GetTransferStatesByRoutingIdSchema = GetTransferStatesByRoutingIdResponseSchema;
    NodeResponses.GetTransferStateSchema = GetTransferStateResponseSchema;
    NodeResponses.GetTransfersSchema = GetTransfersResponseSchema;
    NodeResponses.GetActiveTransfersByChannelAddressSchema = GetActiveTransfersByChannelAddressResponseSchema;
    NodeResponses.GetChannelStateSchema = GetChannelStateResponseSchema;
    NodeResponses.GetChannelStateByParticipantsSchema = GetChannelStateByParticipantsResponseSchema;
    NodeResponses.GetChannelStatesSchema = GetChannelStatesResponseSchema;
    NodeResponses.GetListenerSchema = GetListenerResponseSchema;
    NodeResponses.GetListenersSchema = GetListenersResponseSchema;
    NodeResponses.GetConfigSchema = GetConfigResponseSchema;
    NodeResponses.GetStatusSchema = GetStatusResponseSchema;
    NodeResponses.GetRegisteredTransfersSchema = GetRegisteredTransfersResponseSchema;
    NodeResponses.GetWithdrawalCommitmentSchema = GetWithdrawalCommitmentResponseSchema;
    NodeResponses.GetWithdrawalCommitmentByTransactionHashSchema = GetWithdrawalCommitmentByTransactionHashResponseSchema;
    NodeResponses.SetupSchema = PostSetupResponseSchema;
    NodeResponses.RequestSetupSchema = PostRequestSetupResponseSchema;
    NodeResponses.DepositSchema = PostDepositResponseSchema;
    NodeResponses.RequestCollateralSchema = PostRequestCollateralResponseSchema;
    NodeResponses.SendDepositTxSchema = PostSendDepositTxResponseSchema;
    NodeResponses.ConditionalTransferSchema = PostConditionalTransferResponseSchema;
    NodeResponses.ResolveTransferSchema = PostResolveTransferResponseSchema;
    NodeResponses.WithdrawSchema = PostWithdrawTransferResponseSchema;
    NodeResponses.WithdrawRetrySchema = PostWithdrawRetryTransferResponseSchema;
    NodeResponses.RegisterListenerSchema = PostRegisterListenerResponseSchema;
    NodeResponses.SignUtilityMessageSchema = PostSignUtilityMessageResponseSchema;
    NodeResponses.RestoreStateSchema = PostRestoreStateResponseSchema;
    NodeResponses.AdminSchema = PostAdminResponseSchema;
    NodeResponses.CreateNodeSchema = PostCreateNodeResponseSchema;
    NodeResponses.GetChannelDisputeSchema = GetChannelDisputeResponseSchema;
    NodeResponses.SendDisputeChannelTxSchema = PostSendDisputeChannelTxResponseSchema;
    NodeResponses.SendDefundChannelTxSchema = PostSendDefundChannelTxResponseSchema;
    NodeResponses.GetTransferDisputeSchema = GetTransferDisputeResponseSchema;
    NodeResponses.SendDisputeTransferTxSchema = PostSendDisputeTransferTxResponseSchema;
    NodeResponses.SendDefundTransferTxSchema = PostSendDefundTransferTxResponseSchema;
    NodeResponses.SendExitChannelTxSchema = PostSendExitChannelTxResponseSchema;
    NodeResponses.SendIsAliveSchema = PostSendIsAliveResponseSchema;
    NodeResponses.SubmitWithdrawalsSchema = PostAdminSubmitWithdrawalsResponseSchema;
})(NodeResponses || (NodeResponses = {}));
//# sourceMappingURL=node.js.map