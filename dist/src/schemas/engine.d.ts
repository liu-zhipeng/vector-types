import { Static, TLiteral } from "@sinclair/typebox";
import { ChannelRpcMethod } from "../vectorProvider";
declare const GetWithdrawalQuoteParamsSchema: import("@sinclair/typebox").TObject<{
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    channelAddress: import("@sinclair/typebox").TString;
    receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
declare const GetTransferQuoteParamsSchema: import("@sinclair/typebox").TObject<{
    routerIdentifier: import("@sinclair/typebox").TString;
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    chainId: import("@sinclair/typebox").TNumber;
    recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    recipientChainId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    recipientAssetId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
declare const GetRouterConfigParamsSchema: import("@sinclair/typebox").TObject<{
    routerIdentifier: import("@sinclair/typebox").TString;
}>;
declare const GetTransferStateByRoutingIdParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    routingId: import("@sinclair/typebox").TString;
}>;
declare const GetTransferStatesByRoutingIdParamsSchema: import("@sinclair/typebox").TObject<{
    routingId: import("@sinclair/typebox").TString;
}>;
declare const GetActiveTransfersParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
}>;
declare const GetTransferStateParamsSchema: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
}>;
export declare const GetTransfersFilterOptsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    endDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    active: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    routingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    transferDefinition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare type GetTransfersFilterOpts = Static<typeof GetTransfersFilterOptsSchema>;
declare const GetTransfersParamsSchema: import("@sinclair/typebox").TObject<{
    filterOpts: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        endDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        active: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        routingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        transferDefinition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
}>;
declare const GetRegisteredTransfersParamsSchema: import("@sinclair/typebox").TObject<{
    chainId: import("@sinclair/typebox").TNumber;
}>;
declare const GetWithdrawalCommitmentParamsSchema: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
}>;
declare const GetWithdrawalCommitmentByTransactionHashParamsSchema: import("@sinclair/typebox").TObject<{
    transactionHash: import("@sinclair/typebox").TString;
}>;
declare const SetupEngineParamsSchema: import("@sinclair/typebox").TObject<{
    counterpartyIdentifier: import("@sinclair/typebox").TString;
    chainId: import("@sinclair/typebox").TNumber;
    timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
}>;
declare const DepositEngineParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
}>;
declare const RequestCollateralEngineParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    amount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
declare const CreateConditionalTransferParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    recipientChainId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    recipientAssetId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    type: import("@sinclair/typebox").TString;
    details: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
    quote: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        routerIdentifier: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        recipient: import("@sinclair/typebox").TString;
        recipientChainId: import("@sinclair/typebox").TNumber;
        recipientAssetId: import("@sinclair/typebox").TString;
        fee: import("@sinclair/typebox").TString;
        expiry: import("@sinclair/typebox").TString;
        signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
}>;
declare const ResolveTransferParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    transferId: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    transferResolver: import("@sinclair/typebox").TAny;
}>;
declare const DisputeChannelParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
}>;
declare const DefundChannelParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
}>;
declare const GetChannelDisputeParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
}>;
declare const DisputeTransferParamsSchema: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
}>;
declare const DefundTransferParamsSchema: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
}>;
declare const GetTransferDisputeParamsSchema: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
}>;
declare const ExitChannelParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    assetIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    owner: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
declare const SignUtilityMessageParamsSchema: import("@sinclair/typebox").TObject<{
    message: import("@sinclair/typebox").TString;
}>;
declare const SendIsAliveParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    skipCheckIn: import("@sinclair/typebox").TBoolean;
}>;
declare const RestoreStateParamsSchema: import("@sinclair/typebox").TObject<{
    counterpartyIdentifier: import("@sinclair/typebox").TString;
    chainId: import("@sinclair/typebox").TNumber;
}>;
declare const RpcRequestEngineParamsSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    jsonrpc: TLiteral<"2.0">;
    method: import("@sinclair/typebox").TUnion<[TLiteral<ChannelRpcMethod>]>;
    params: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
}>;
export declare namespace EngineParams {
    const RpcRequestSchema: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TNumber;
        jsonrpc: TLiteral<"2.0">;
        method: import("@sinclair/typebox").TUnion<[TLiteral<ChannelRpcMethod>]>;
        params: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    }>;
    type RpcRequest = Static<typeof RpcRequestEngineParamsSchema>;
    const GetRouterConfigSchema: import("@sinclair/typebox").TObject<{
        routerIdentifier: import("@sinclair/typebox").TString;
    }>;
    type GetRouterConfig = Static<typeof GetRouterConfigParamsSchema>;
    const SignUtilityMessageSchema: import("@sinclair/typebox").TObject<{
        message: import("@sinclair/typebox").TString;
    }>;
    type SignUtilityMessage = Static<typeof SignUtilityMessageParamsSchema>;
    const SendIsAliveSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        skipCheckIn: import("@sinclair/typebox").TBoolean;
    }>;
    type SendIsAlive = Static<typeof SendIsAliveParamsSchema>;
    const GetTransferStateByRoutingIdSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        routingId: import("@sinclair/typebox").TString;
    }>;
    type GetTransferStateByRoutingId = Static<typeof GetTransferStateByRoutingIdParamsSchema>;
    const GetTransferStatesByRoutingIdSchema: import("@sinclair/typebox").TObject<{
        routingId: import("@sinclair/typebox").TString;
    }>;
    type GetTransferStatesByRoutingId = Static<typeof GetTransferStatesByRoutingIdParamsSchema>;
    const GetChannelStatesSchema: import("@sinclair/typebox").TObject<{}>;
    type GetChannelStates = Static<typeof GetChannelStatesSchema>;
    const GetChannelStateSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>;
    type GetChannelState = Static<typeof GetChannelStateSchema>;
    const GetChannelStateByParticipantsSchema: import("@sinclair/typebox").TObject<{
        alice: import("@sinclair/typebox").TString;
        bob: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
    }>;
    type GetChannelStateByParticipants = Static<typeof GetChannelStateByParticipantsSchema>;
    const GetActiveTransfersSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>;
    type GetActiveTransfers = Static<typeof GetActiveTransfersParamsSchema>;
    const GetTransferStateSchema: import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>;
    type GetTransferState = Static<typeof GetTransferStateParamsSchema>;
    const GetTransfersSchema: import("@sinclair/typebox").TObject<{
        filterOpts: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            startDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            endDate: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            active: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
            routingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            transferDefinition: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
    }>;
    type GetTransfers = Static<typeof GetTransfersParamsSchema>;
    const GetRegisteredTransfersSchema: import("@sinclair/typebox").TObject<{
        chainId: import("@sinclair/typebox").TNumber;
    }>;
    type GetRegisteredTransfers = Static<typeof GetRegisteredTransfersParamsSchema>;
    const GetWithdrawalCommitmentSchema: import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>;
    type GetWithdrawalCommitment = Static<typeof GetWithdrawalCommitmentParamsSchema>;
    const GetWithdrawalCommitmentByTransactionHashSchema: import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
    }>;
    type GetWithdrawalCommitmentByTransactionHash = Static<typeof GetWithdrawalCommitmentByTransactionHashParamsSchema>;
    const SetupSchema: import("@sinclair/typebox").TObject<{
        counterpartyIdentifier: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>;
    type Setup = Static<typeof SetupEngineParamsSchema>;
    const RestoreStateSchema: import("@sinclair/typebox").TObject<{
        counterpartyIdentifier: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
    }>;
    type RestoreState = Static<typeof RestoreStateParamsSchema>;
    const DepositSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>;
    type Deposit = Static<typeof DepositEngineParamsSchema>;
    const RequestCollateralSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
    type RequestCollateral = Static<typeof RequestCollateralEngineParamsSchema>;
    const ConditionalTransferSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        recipientChainId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        recipientAssetId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
        type: import("@sinclair/typebox").TString;
        details: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        quote: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            routerIdentifier: import("@sinclair/typebox").TString;
            amount: import("@sinclair/typebox").TString;
            assetId: import("@sinclair/typebox").TString;
            chainId: import("@sinclair/typebox").TNumber;
            recipient: import("@sinclair/typebox").TString;
            recipientChainId: import("@sinclair/typebox").TNumber;
            recipientAssetId: import("@sinclair/typebox").TString;
            fee: import("@sinclair/typebox").TString;
            expiry: import("@sinclair/typebox").TString;
            signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
    }>;
    type ConditionalTransfer = Static<typeof CreateConditionalTransferParamsSchema>;
    const ResolveTransferSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
        transferResolver: import("@sinclair/typebox").TAny;
    }>;
    type ResolveTransfer = Static<typeof ResolveTransferParamsSchema>;
    const WithdrawSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        recipient: import("@sinclair/typebox").TString;
        timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        quote: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
            amount: import("@sinclair/typebox").TString;
            assetId: import("@sinclair/typebox").TString;
            fee: import("@sinclair/typebox").TString;
            expiry: import("@sinclair/typebox").TString;
            signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
        callTo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        callData: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
        initiatorSubmits: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>;
    type Withdraw = Static<typeof WithdrawSchema>;
    const WithdrawRetrySchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
    }>;
    type WithdrawRetry = Static<typeof WithdrawRetrySchema>;
    const AddTransactionToCommitmentSchema: import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
    }>;
    type AddTransactionToCommitment = Static<typeof AddTransactionToCommitmentSchema>;
    const DisputeChannelSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>;
    type DisputeChannel = Static<typeof DisputeChannelParamsSchema>;
    const DefundChannelSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>;
    type DefundChannel = Static<typeof DefundChannelParamsSchema>;
    const GetChannelDisputeSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>;
    type GetChannelDispute = Static<typeof GetChannelDisputeParamsSchema>;
    const DisputeTransferSchema: import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>;
    type DisputeTransfer = Static<typeof DisputeTransferParamsSchema>;
    const DefundTransferSchema: import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>;
    type DefundTransfer = Static<typeof DefundTransferParamsSchema>;
    const GetTransferDisputeSchema: import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>;
    type GetTransferDispute = Static<typeof GetTransferDisputeParamsSchema>;
    const ExitChannelSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        assetIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        owner: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
    type ExitChannel = Static<typeof ExitChannelParamsSchema>;
    const GetTransferQuoteSchema: import("@sinclair/typebox").TObject<{
        routerIdentifier: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        recipientChainId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        recipientAssetId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>;
    type GetTransferQuote = Static<typeof GetTransferQuoteParamsSchema>;
    const GetWithdrawalQuoteSchema: import("@sinclair/typebox").TObject<{
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>;
    type GetWithdrawalQuote = Static<typeof GetWithdrawalQuoteParamsSchema>;
}
export {};
//# sourceMappingURL=engine.d.ts.map