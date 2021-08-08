import { Static, TLiteral } from "@sinclair/typebox";
import { EngineEvent } from "../engine";
declare const PostWithdrawalQuoteParamsSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    channelAddress: import("@sinclair/typebox").TString;
    receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>, import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>]>;
declare const PostWithdrawalQuoteResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        fee: import("@sinclair/typebox").TString;
        expiry: import("@sinclair/typebox").TString;
        signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
};
declare const PostTransferQuoteParamsSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    routerIdentifier: import("@sinclair/typebox").TString;
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    chainId: import("@sinclair/typebox").TNumber;
    recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    recipientChainId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    recipientAssetId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>, import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>]>;
declare const PostTransferQuoteResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
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
    }>;
};
declare const GetRouterConfigParamsSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    routerIdentifier: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>]>;
declare const GetRouterConfigResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        supportedChains: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
        allowedSwaps: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            fromChainId: import("@sinclair/typebox").TNumber;
            toChainId: import("@sinclair/typebox").TNumber;
            fromAssetId: import("@sinclair/typebox").TString;
            toAssetId: import("@sinclair/typebox").TString;
            priceType: import("@sinclair/typebox").TUnion<[TLiteral<"hardcoded">]>;
            hardcodedRate: import("@sinclair/typebox").TString;
            rebalancerUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            rebalanceThresholdPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            percentageFee: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            flatFee: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            gasSubsidyPercentage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        }>>;
    }>;
};
declare const GetTransferStateByRoutingIdParamsSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    routingId: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>]>;
declare const GetTransferStateByRoutingIdResponseSchema: {
    200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
        balance: import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        }>;
        assetId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        inDispute: import("@sinclair/typebox").TBoolean;
        transferId: import("@sinclair/typebox").TString;
        transferDefinition: import("@sinclair/typebox").TString;
        transferTimeout: import("@sinclair/typebox").TString;
        initialStateHash: import("@sinclair/typebox").TString;
        initiator: import("@sinclair/typebox").TString;
        responder: import("@sinclair/typebox").TString;
        channelFactoryAddress: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            createdAt: import("@sinclair/typebox").TNumber;
            resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
        channelNonce: import("@sinclair/typebox").TInteger;
        initiatorIdentifier: import("@sinclair/typebox").TString;
        responderIdentifier: import("@sinclair/typebox").TString;
    }>]>;
};
declare const GetTransferStatesByRoutingIdParamsSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    routingId: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>]>;
declare const GetTransferStatesByRoutingIdResponseSchema: {
    200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        balance: import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        }>;
        assetId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        inDispute: import("@sinclair/typebox").TBoolean;
        transferId: import("@sinclair/typebox").TString;
        transferDefinition: import("@sinclair/typebox").TString;
        transferTimeout: import("@sinclair/typebox").TString;
        initialStateHash: import("@sinclair/typebox").TString;
        initiator: import("@sinclair/typebox").TString;
        responder: import("@sinclair/typebox").TString;
        channelFactoryAddress: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            createdAt: import("@sinclair/typebox").TNumber;
            resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
        channelNonce: import("@sinclair/typebox").TInteger;
        initiatorIdentifier: import("@sinclair/typebox").TString;
        responderIdentifier: import("@sinclair/typebox").TString;
    }>>;
};
declare const GetActiveTransfersByChannelAddressParamsSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>]>;
declare const GetActiveTransfersByChannelAddressResponseSchema: {
    200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        balance: import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        }>;
        assetId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        inDispute: import("@sinclair/typebox").TBoolean;
        transferId: import("@sinclair/typebox").TString;
        transferDefinition: import("@sinclair/typebox").TString;
        transferTimeout: import("@sinclair/typebox").TString;
        initialStateHash: import("@sinclair/typebox").TString;
        initiator: import("@sinclair/typebox").TString;
        responder: import("@sinclair/typebox").TString;
        channelFactoryAddress: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            createdAt: import("@sinclair/typebox").TNumber;
            resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
        channelNonce: import("@sinclair/typebox").TInteger;
        initiatorIdentifier: import("@sinclair/typebox").TString;
        responderIdentifier: import("@sinclair/typebox").TString;
    }>>;
};
declare const GetTransferStateParamsSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>]>;
declare const GetTransferStateResponseSchema: {
    200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
        balance: import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        }>;
        assetId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        inDispute: import("@sinclair/typebox").TBoolean;
        transferId: import("@sinclair/typebox").TString;
        transferDefinition: import("@sinclair/typebox").TString;
        transferTimeout: import("@sinclair/typebox").TString;
        initialStateHash: import("@sinclair/typebox").TString;
        initiator: import("@sinclair/typebox").TString;
        responder: import("@sinclair/typebox").TString;
        channelFactoryAddress: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            createdAt: import("@sinclair/typebox").TNumber;
            resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
        channelNonce: import("@sinclair/typebox").TInteger;
        initiatorIdentifier: import("@sinclair/typebox").TString;
        responderIdentifier: import("@sinclair/typebox").TString;
    }>]>;
};
declare const GetTransfersParamsSchema: import("@sinclair/typebox").TObject<{
    publicIdentifier: import("@sinclair/typebox").TString;
}>;
declare const GetTransfersResponseSchema: {
    200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        balance: import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        }>;
        assetId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        inDispute: import("@sinclair/typebox").TBoolean;
        transferId: import("@sinclair/typebox").TString;
        transferDefinition: import("@sinclair/typebox").TString;
        transferTimeout: import("@sinclair/typebox").TString;
        initialStateHash: import("@sinclair/typebox").TString;
        initiator: import("@sinclair/typebox").TString;
        responder: import("@sinclair/typebox").TString;
        channelFactoryAddress: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            createdAt: import("@sinclair/typebox").TNumber;
            resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
        channelNonce: import("@sinclair/typebox").TInteger;
        initiatorIdentifier: import("@sinclair/typebox").TString;
        responderIdentifier: import("@sinclair/typebox").TString;
    }>>;
};
declare const PostAdminSubmitWithdrawalsResponseSchema: {
    200: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
    }>>, import("@sinclair/typebox").TObject<{
        message: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TString;
        context: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        stack: import("@sinclair/typebox").TString;
    }>]>>;
};
declare const GetChannelDisputeResponseSchema: {
    200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
        channelStateHash: import("@sinclair/typebox").TString;
        nonce: import("@sinclair/typebox").TString;
        merkleRoot: import("@sinclair/typebox").TString;
        consensusExpiry: import("@sinclair/typebox").TString;
        defundExpiry: import("@sinclair/typebox").TString;
    }>]>;
};
declare const PostSendDisputeChannelTxResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
    }>;
};
declare const PostSendDefundChannelTxResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
    }>;
};
declare const GetTransferDisputeResponseSchema: {
    200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
        transferStateHash: import("@sinclair/typebox").TString;
        transferDisputeExpiry: import("@sinclair/typebox").TString;
        isDefunded: import("@sinclair/typebox").TBoolean;
    }>]>;
};
declare const PostSendDisputeTransferTxResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
    }>;
};
declare const PostSendDefundTransferTxResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
    }>;
};
declare const PostSendExitChannelTxResponseSchema: {
    200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        assetId: import("@sinclair/typebox").TString;
        transactionHash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        error: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            message: import("@sinclair/typebox").TString;
            context: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
            type: import("@sinclair/typebox").TString;
            stack: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
    }>>;
};
declare const PostSendIsAliveResponseSchema: {
    200: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>;
};
export declare namespace NodeParams {
    const GetStatusSchema: import("@sinclair/typebox").TObject<{}>;
    type GetStatus = Static<typeof GetStatusSchema>;
    const WithdrawalQuoteSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type WithdrawalQuote = Static<typeof PostWithdrawalQuoteParamsSchema>;
    const TransferQuoteSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        routerIdentifier: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        recipientChainId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
        recipientAssetId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        receiveExactAmount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type TransferQuote = Static<typeof PostTransferQuoteParamsSchema>;
    const GetRouterConfigSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        routerIdentifier: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetRouterConfig = Static<typeof GetRouterConfigParamsSchema>;
    const GetTransferStateByRoutingIdSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        routingId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetTransferStateByRoutingId = Static<typeof GetTransferStateByRoutingIdParamsSchema>;
    const GetTransferStatesByRoutingIdSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        routingId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetTransferStatesByRoutingId = Static<typeof GetTransferStatesByRoutingIdParamsSchema>;
    const GetTransferStateSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetTransferState = Static<typeof GetTransferStateParamsSchema>;
    const GetTransfersSchema: import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>;
    type GetTransfers = Static<typeof GetTransfersParamsSchema>;
    const GetActiveTransfersByChannelAddressSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetActiveTransfersByChannelAddress = Static<typeof GetActiveTransfersByChannelAddressParamsSchema>;
    const GetChannelStateSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetChannelState = Static<typeof GetChannelStateSchema>;
    const GetChannelStatesSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{}>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetChannelStates = Static<typeof GetChannelStatesSchema>;
    const GetChannelStateByParticipantsSchema: import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
        counterparty: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
    }>;
    type GetChannelStateByParticipants = Static<typeof GetChannelStateByParticipantsSchema>;
    const GetListenerSchema: import("@sinclair/typebox").TObject<{
        eventName: import("@sinclair/typebox").TUnion<[TLiteral<EngineEvent>]>;
        publicIdentifier: import("@sinclair/typebox").TString;
    }>;
    type GetListener = Static<typeof GetListenerSchema>;
    const GetListenersSchema: import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>;
    type GetListeners = Static<typeof GetListenersSchema>;
    const GetRegisteredTransfersSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        chainId: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetRegisteredTransfers = Static<typeof GetRegisteredTransfersSchema>;
    const GetWithdrawalCommitmentSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetWithdrawalCommitment = Static<typeof GetWithdrawalCommitmentSchema>;
    const GetWithdrawalCommitmentByTransactionHashSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetWithdrawalCommitmentByTransactionHash = Static<typeof GetWithdrawalCommitmentByTransactionHashSchema>;
    const GetConfigSchema: import("@sinclair/typebox").TObject<{}>;
    type GetConfig = Static<typeof GetConfigSchema>;
    const SetupSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        counterpartyIdentifier: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type Setup = Static<typeof SetupSchema>;
    const RequestSetupSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        counterpartyIdentifier: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type RequestSetup = Static<typeof RequestSetupSchema>;
    const DepositSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type Deposit = Static<typeof DepositSchema>;
    const RequestCollateralSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type RequestCollateral = Static<typeof RequestCollateralSchema>;
    const SendDepositTxSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        publicIdentifier: import("@sinclair/typebox").TString;
    }>;
    type SendDepositTx = Static<typeof SendDepositTxSchema>;
    const ConditionalTransferSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type ConditionalTransfer = Static<typeof ConditionalTransferSchema>;
    const ResolveTransferSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
        transferResolver: import("@sinclair/typebox").TAny;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type ResolveTransfer = Static<typeof ResolveTransferSchema>;
    const WithdrawSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
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
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type Withdraw = Static<typeof WithdrawSchema>;
    const WithdrawRetrySchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type WithdrawRetry = Static<typeof WithdrawRetrySchema>;
    const AddTransactionToCommitmentSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        transactionHash: import("@sinclair/typebox").TString;
        channelAddress: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type AddTransactionToCommitment = Static<typeof AddTransactionToCommitmentSchema>;
    const RegisterListenerSchema: import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
        events: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TString>;
    }>;
    type RegisterListener = Static<typeof RegisterListenerSchema>;
    const SignUtilityMessageSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        message: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type SignUtilityMessage = Static<typeof SignUtilityMessageSchema>;
    const RestoreStateSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        counterpartyIdentifier: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type RestoreState = Static<typeof RestoreStateSchema>;
    const AdminSchema: import("@sinclair/typebox").TObject<{
        adminToken: import("@sinclair/typebox").TString;
    }>;
    type Admin = Static<typeof AdminSchema>;
    const CreateNodeSchema: import("@sinclair/typebox").TObject<{
        index: import("@sinclair/typebox").TInteger;
        mnemonic: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        skipCheckIn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>;
    type CreateNode = Static<typeof CreateNodeSchema>;
    const GetChannelDisputeSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetChannelDispute = Static<typeof GetChannelDisputeSchema>;
    const SendDisputeChannelTxSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type SendDisputeChannelTx = Static<typeof SendDisputeChannelTxSchema>;
    const SendDefundChannelTxSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type SendDefundChannelTx = Static<typeof SendDefundChannelTxSchema>;
    const GetTransferDisputeSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type GetTransferDispute = Static<typeof GetTransferDisputeSchema>;
    const SendDisputeTransferTxSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type SendDisputeTransferTx = Static<typeof SendDisputeTransferTxSchema>;
    const SendDefundTransferTxSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        transferId: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type SendDefundTransferTx = Static<typeof SendDefundTransferTxSchema>;
    const SendExitChannelTxSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        assetIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        recipient: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        owner: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type SendExitChannelTx = Static<typeof SendExitChannelTxSchema>;
    const SendIsAliveSchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        skipCheckIn: import("@sinclair/typebox").TBoolean;
    }>, import("@sinclair/typebox").TObject<{
        publicIdentifier: import("@sinclair/typebox").TString;
    }>]>;
    type SendIsAlive = Static<typeof SendIsAliveSchema>;
    const SubmitWithdrawalsSchema: import("@sinclair/typebox").TObject<{
        adminToken: import("@sinclair/typebox").TString;
    }>;
    type SubmitWithdrawals = Static<typeof SubmitWithdrawalsSchema>;
}
export declare namespace NodeResponses {
    const WithdrawalQuoteSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
            amount: import("@sinclair/typebox").TString;
            assetId: import("@sinclair/typebox").TString;
            fee: import("@sinclair/typebox").TString;
            expiry: import("@sinclair/typebox").TString;
            signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>;
    };
    type WithdrawalQuote = Static<typeof PostWithdrawalQuoteResponseSchema["200"]>;
    const TransferQuoteSchema: {
        200: import("@sinclair/typebox").TObject<{
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
        }>;
    };
    type TransferQuote = Static<typeof PostTransferQuoteResponseSchema["200"]>;
    const GetRouterConfigSchema: {
        200: import("@sinclair/typebox").TObject<{
            supportedChains: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TNumber>;
            allowedSwaps: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                fromChainId: import("@sinclair/typebox").TNumber;
                toChainId: import("@sinclair/typebox").TNumber;
                fromAssetId: import("@sinclair/typebox").TString;
                toAssetId: import("@sinclair/typebox").TString;
                priceType: import("@sinclair/typebox").TUnion<[TLiteral<"hardcoded">]>;
                hardcodedRate: import("@sinclair/typebox").TString;
                rebalancerUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                rebalanceThresholdPct: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
                percentageFee: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
                flatFee: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
                gasSubsidyPercentage: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            }>>;
        }>;
    };
    type GetRouterConfig = Static<typeof GetRouterConfigResponseSchema["200"]>;
    const GetTransferStateByRoutingIdSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            balance: import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            }>;
            assetId: import("@sinclair/typebox").TString;
            channelAddress: import("@sinclair/typebox").TString;
            inDispute: import("@sinclair/typebox").TBoolean;
            transferId: import("@sinclair/typebox").TString;
            transferDefinition: import("@sinclair/typebox").TString;
            transferTimeout: import("@sinclair/typebox").TString;
            initialStateHash: import("@sinclair/typebox").TString;
            initiator: import("@sinclair/typebox").TString;
            responder: import("@sinclair/typebox").TString;
            channelFactoryAddress: import("@sinclair/typebox").TString;
            chainId: import("@sinclair/typebox").TNumber;
            transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
            transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                createdAt: import("@sinclair/typebox").TNumber;
                resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
            channelNonce: import("@sinclair/typebox").TInteger;
            initiatorIdentifier: import("@sinclair/typebox").TString;
            responderIdentifier: import("@sinclair/typebox").TString;
        }>]>;
    };
    type GetTransferStateByRoutingId = Static<typeof GetTransferStateByRoutingIdResponseSchema["200"]>;
    const GetTransferStatesByRoutingIdSchema: {
        200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            balance: import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            }>;
            assetId: import("@sinclair/typebox").TString;
            channelAddress: import("@sinclair/typebox").TString;
            inDispute: import("@sinclair/typebox").TBoolean;
            transferId: import("@sinclair/typebox").TString;
            transferDefinition: import("@sinclair/typebox").TString;
            transferTimeout: import("@sinclair/typebox").TString;
            initialStateHash: import("@sinclair/typebox").TString;
            initiator: import("@sinclair/typebox").TString;
            responder: import("@sinclair/typebox").TString;
            channelFactoryAddress: import("@sinclair/typebox").TString;
            chainId: import("@sinclair/typebox").TNumber;
            transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
            transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                createdAt: import("@sinclair/typebox").TNumber;
                resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
            channelNonce: import("@sinclair/typebox").TInteger;
            initiatorIdentifier: import("@sinclair/typebox").TString;
            responderIdentifier: import("@sinclair/typebox").TString;
        }>>;
    };
    type GetTransferStatesByRoutingId = Static<typeof GetTransferStatesByRoutingIdResponseSchema["200"]>;
    const GetTransferStateSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            balance: import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            }>;
            assetId: import("@sinclair/typebox").TString;
            channelAddress: import("@sinclair/typebox").TString;
            inDispute: import("@sinclair/typebox").TBoolean;
            transferId: import("@sinclair/typebox").TString;
            transferDefinition: import("@sinclair/typebox").TString;
            transferTimeout: import("@sinclair/typebox").TString;
            initialStateHash: import("@sinclair/typebox").TString;
            initiator: import("@sinclair/typebox").TString;
            responder: import("@sinclair/typebox").TString;
            channelFactoryAddress: import("@sinclair/typebox").TString;
            chainId: import("@sinclair/typebox").TNumber;
            transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
            transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                createdAt: import("@sinclair/typebox").TNumber;
                resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
            channelNonce: import("@sinclair/typebox").TInteger;
            initiatorIdentifier: import("@sinclair/typebox").TString;
            responderIdentifier: import("@sinclair/typebox").TString;
        }>]>;
    };
    type GetTransferState = Static<typeof GetTransferStateResponseSchema>;
    const GetTransfersSchema: {
        200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            balance: import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            }>;
            assetId: import("@sinclair/typebox").TString;
            channelAddress: import("@sinclair/typebox").TString;
            inDispute: import("@sinclair/typebox").TBoolean;
            transferId: import("@sinclair/typebox").TString;
            transferDefinition: import("@sinclair/typebox").TString;
            transferTimeout: import("@sinclair/typebox").TString;
            initialStateHash: import("@sinclair/typebox").TString;
            initiator: import("@sinclair/typebox").TString;
            responder: import("@sinclair/typebox").TString;
            channelFactoryAddress: import("@sinclair/typebox").TString;
            chainId: import("@sinclair/typebox").TNumber;
            transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
            transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                createdAt: import("@sinclair/typebox").TNumber;
                resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
            channelNonce: import("@sinclair/typebox").TInteger;
            initiatorIdentifier: import("@sinclair/typebox").TString;
            responderIdentifier: import("@sinclair/typebox").TString;
        }>>;
    };
    type GetTransfers = Static<typeof GetTransfersResponseSchema>;
    const GetActiveTransfersByChannelAddressSchema: {
        200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            balance: import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            }>;
            assetId: import("@sinclair/typebox").TString;
            channelAddress: import("@sinclair/typebox").TString;
            inDispute: import("@sinclair/typebox").TBoolean;
            transferId: import("@sinclair/typebox").TString;
            transferDefinition: import("@sinclair/typebox").TString;
            transferTimeout: import("@sinclair/typebox").TString;
            initialStateHash: import("@sinclair/typebox").TString;
            initiator: import("@sinclair/typebox").TString;
            responder: import("@sinclair/typebox").TString;
            channelFactoryAddress: import("@sinclair/typebox").TString;
            chainId: import("@sinclair/typebox").TNumber;
            transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            transferState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
            transferResolver: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
            meta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                createdAt: import("@sinclair/typebox").TNumber;
                resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
            }>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
            channelNonce: import("@sinclair/typebox").TInteger;
            initiatorIdentifier: import("@sinclair/typebox").TString;
            responderIdentifier: import("@sinclair/typebox").TString;
        }>>;
    };
    type GetActiveTransfersByChannelAddress = Static<typeof GetActiveTransfersByChannelAddressResponseSchema["200"]>;
    const GetChannelStateSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            assetIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            balances: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            }>>;
            channelAddress: import("@sinclair/typebox").TString;
            alice: import("@sinclair/typebox").TString;
            bob: import("@sinclair/typebox").TString;
            merkleRoot: import("@sinclair/typebox").TString;
            nonce: import("@sinclair/typebox").TNumber;
            processedDepositsA: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            processedDepositsB: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            timeout: import("@sinclair/typebox").TString;
            aliceIdentifier: import("@sinclair/typebox").TString;
            bobIdentifier: import("@sinclair/typebox").TString;
            latestUpdate: import("@sinclair/typebox").TObject<{
                channelAddress: import("@sinclair/typebox").TString;
                fromIdentifier: import("@sinclair/typebox").TString;
                toIdentifier: import("@sinclair/typebox").TString;
                type: import("@sinclair/typebox").TUnion<[TLiteral<import("..").UpdateType>]>;
                nonce: import("@sinclair/typebox").TNumber;
                balance: import("@sinclair/typebox").TObject<{
                    to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                    amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                }>;
                assetId: import("@sinclair/typebox").TString;
                details: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
                aliceSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
                bobSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            }>;
            networkContext: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                channelFactoryAddress: import("@sinclair/typebox").TString;
                transferRegistryAddress: import("@sinclair/typebox").TString;
            }>, import("@sinclair/typebox").TObject<{
                chainId: import("@sinclair/typebox").TNumber;
            }>]>;
            defundNonces: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            inDispute: import("@sinclair/typebox").TBoolean;
        }>]>;
    };
    type GetChannelState = Static<typeof GetChannelStateSchema["200"]>;
    const GetChannelStateByParticipantsSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            assetIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            balances: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            }>>;
            channelAddress: import("@sinclair/typebox").TString;
            alice: import("@sinclair/typebox").TString;
            bob: import("@sinclair/typebox").TString;
            merkleRoot: import("@sinclair/typebox").TString;
            nonce: import("@sinclair/typebox").TNumber;
            processedDepositsA: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            processedDepositsB: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            timeout: import("@sinclair/typebox").TString;
            aliceIdentifier: import("@sinclair/typebox").TString;
            bobIdentifier: import("@sinclair/typebox").TString;
            latestUpdate: import("@sinclair/typebox").TObject<{
                channelAddress: import("@sinclair/typebox").TString;
                fromIdentifier: import("@sinclair/typebox").TString;
                toIdentifier: import("@sinclair/typebox").TString;
                type: import("@sinclair/typebox").TUnion<[TLiteral<import("..").UpdateType>]>;
                nonce: import("@sinclair/typebox").TNumber;
                balance: import("@sinclair/typebox").TObject<{
                    to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                    amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
                }>;
                assetId: import("@sinclair/typebox").TString;
                details: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
                aliceSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
                bobSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
            }>;
            networkContext: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
                channelFactoryAddress: import("@sinclair/typebox").TString;
                transferRegistryAddress: import("@sinclair/typebox").TString;
            }>, import("@sinclair/typebox").TObject<{
                chainId: import("@sinclair/typebox").TNumber;
            }>]>;
            defundNonces: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            inDispute: import("@sinclair/typebox").TBoolean;
        }>]>;
    };
    type GetChannelStateByParticipants = Static<typeof GetChannelStateByParticipantsSchema["200"]>;
    const GetChannelStatesSchema: {
        200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    };
    type GetChannelStates = Static<typeof GetChannelStatesSchema["200"]>;
    const GetListenerSchema: {
        200: import("@sinclair/typebox").TObject<{
            url: import("@sinclair/typebox").TString;
        }>;
    };
    type GetListener = Static<typeof GetListenerSchema["200"]>;
    const GetListenersSchema: {
        200: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TString>;
    };
    type GetListeners = Static<typeof GetListenersSchema["200"]>;
    const GetConfigSchema: {
        200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            publicIdentifier: import("@sinclair/typebox").TString;
            signerAddress: import("@sinclair/typebox").TString;
            index: import("@sinclair/typebox").TInteger;
            chainAddresses: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TObject<{
                channelFactoryAddress: import("@sinclair/typebox").TString;
                transferRegistryAddress: import("@sinclair/typebox").TString;
            }>>;
        }>>;
    };
    type GetConfig = Static<typeof GetConfigSchema["200"]>;
    const GetStatusSchema: {
        200: import("@sinclair/typebox").TObject<{
            publicIdentifier: import("@sinclair/typebox").TString;
            signerAddress: import("@sinclair/typebox").TString;
            providerSyncing: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TBoolean, import("@sinclair/typebox").TObject<{
                startingBlock: import("@sinclair/typebox").TString;
                currentBlock: import("@sinclair/typebox").TString;
                highestBlock: import("@sinclair/typebox").TString;
            }>, import("@sinclair/typebox").TString, import("@sinclair/typebox").TUndefined]>>;
            version: import("@sinclair/typebox").TString;
        }>;
    };
    type GetStatus = Static<typeof GetStatusSchema["200"]>;
    const GetRegisteredTransfersSchema: {
        200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            name: import("@sinclair/typebox").TString;
            stateEncoding: import("@sinclair/typebox").TString;
            resolverEncoding: import("@sinclair/typebox").TString;
            definition: import("@sinclair/typebox").TString;
            encodedCancel: import("@sinclair/typebox").TString;
        }>>;
    };
    type GetRegisteredTransfers = Static<typeof GetRegisteredTransfersSchema["200"]>;
    const GetWithdrawalCommitmentSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            aliceSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            bobSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            channelAddress: import("@sinclair/typebox").TString;
            alice: import("@sinclair/typebox").TString;
            bob: import("@sinclair/typebox").TString;
            recipient: import("@sinclair/typebox").TString;
            assetId: import("@sinclair/typebox").TString;
            amount: import("@sinclair/typebox").TString;
            nonce: import("@sinclair/typebox").TString;
            callTo: import("@sinclair/typebox").TString;
            callData: import("@sinclair/typebox").TString;
            transactionHash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>]>;
    };
    type GetWithdrawalCommitment = Static<typeof GetWithdrawalCommitmentSchema["200"]>;
    const GetWithdrawalCommitmentByTransactionHashSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            aliceSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            bobSignature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            channelAddress: import("@sinclair/typebox").TString;
            alice: import("@sinclair/typebox").TString;
            bob: import("@sinclair/typebox").TString;
            recipient: import("@sinclair/typebox").TString;
            assetId: import("@sinclair/typebox").TString;
            amount: import("@sinclair/typebox").TString;
            nonce: import("@sinclair/typebox").TString;
            callTo: import("@sinclair/typebox").TString;
            callData: import("@sinclair/typebox").TString;
            transactionHash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>]>;
    };
    type GetWithdrawalCommitmentByTransactionHash = Static<typeof GetWithdrawalCommitmentByTransactionHashSchema["200"]>;
    const SetupSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
        }>;
    };
    type Setup = Static<typeof SetupSchema["200"]>;
    const RequestSetupSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
        }>;
    };
    type RequestSetup = Static<typeof RequestSetupSchema["200"]>;
    const DepositSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
        }>;
    };
    type Deposit = Static<typeof DepositSchema["200"]>;
    const RequestCollateralSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
        }>;
    };
    type RequestCollateral = Static<typeof RequestCollateralSchema["200"]>;
    const SendDepositTxSchema: {
        200: import("@sinclair/typebox").TObject<{
            txHash: import("@sinclair/typebox").TString;
        }>;
    };
    type SendDepositTx = Static<typeof SendDepositTxSchema["200"]>;
    const ConditionalTransferSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
            transferId: import("@sinclair/typebox").TString;
            routingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>;
    };
    type ConditionalTransfer = Static<typeof ConditionalTransferSchema["200"]>;
    const ResolveTransferSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
            transferId: import("@sinclair/typebox").TString;
            routingId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>;
    };
    type ResolveTransfer = Static<typeof ResolveTransferSchema["200"]>;
    const WithdrawSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
            transferId: import("@sinclair/typebox").TString;
            transactionHash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            transaction: import("@sinclair/typebox").TObject<{
                to: import("@sinclair/typebox").TString;
                value: import("@sinclair/typebox").TString;
                data: import("@sinclair/typebox").TString;
            }>;
        }>;
    };
    type Withdraw = Static<typeof WithdrawSchema["200"]>;
    const WithdrawRetrySchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
            transferId: import("@sinclair/typebox").TString;
            transactionHash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>;
    };
    type WithdrawRetry = Static<typeof WithdrawRetrySchema["200"]>;
    const RegisterListenerSchema: {
        200: import("@sinclair/typebox").TObject<{
            message: import("@sinclair/typebox").TString;
        }>;
    };
    type RegisterListener = Static<typeof RegisterListenerSchema["200"]>;
    const SignUtilityMessageSchema: {
        200: import("@sinclair/typebox").TObject<{
            signedMessage: import("@sinclair/typebox").TString;
        }>;
    };
    type SignUtilityMessage = Static<typeof SignUtilityMessageSchema["200"]>;
    const RestoreStateSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
        }>;
    };
    type RestoreState = Static<typeof RestoreStateSchema["200"]>;
    const AdminSchema: {
        200: import("@sinclair/typebox").TObject<{
            message: import("@sinclair/typebox").TString;
        }>;
    };
    type Admin = Static<typeof AdminSchema["200"]>;
    const CreateNodeSchema: {
        200: import("@sinclair/typebox").TObject<{
            publicIdentifier: import("@sinclair/typebox").TString;
            signerAddress: import("@sinclair/typebox").TString;
            index: import("@sinclair/typebox").TInteger;
        }>;
    };
    type CreateNode = Static<typeof CreateNodeSchema["200"]>;
    const GetChannelDisputeSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            channelStateHash: import("@sinclair/typebox").TString;
            nonce: import("@sinclair/typebox").TString;
            merkleRoot: import("@sinclair/typebox").TString;
            consensusExpiry: import("@sinclair/typebox").TString;
            defundExpiry: import("@sinclair/typebox").TString;
        }>]>;
    };
    type GetChannelDispute = Static<typeof GetChannelDisputeResponseSchema["200"]>;
    const SendDisputeChannelTxSchema: {
        200: import("@sinclair/typebox").TObject<{
            transactionHash: import("@sinclair/typebox").TString;
        }>;
    };
    type SendDisputeChannelTx = Static<typeof PostSendDisputeChannelTxResponseSchema["200"]>;
    const SendDefundChannelTxSchema: {
        200: import("@sinclair/typebox").TObject<{
            transactionHash: import("@sinclair/typebox").TString;
        }>;
    };
    type SendDefundChannelTx = Static<typeof PostSendDefundChannelTxResponseSchema["200"]>;
    const GetTransferDisputeSchema: {
        200: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TUndefined, import("@sinclair/typebox").TObject<{
            transferId: import("@sinclair/typebox").TString;
            transferStateHash: import("@sinclair/typebox").TString;
            transferDisputeExpiry: import("@sinclair/typebox").TString;
            isDefunded: import("@sinclair/typebox").TBoolean;
        }>]>;
    };
    type GetTransferDispute = Static<typeof GetTransferDisputeResponseSchema["200"]>;
    const SendDisputeTransferTxSchema: {
        200: import("@sinclair/typebox").TObject<{
            transactionHash: import("@sinclair/typebox").TString;
        }>;
    };
    type SendDisputeTransferTx = Static<typeof PostSendDisputeTransferTxResponseSchema["200"]>;
    const SendDefundTransferTxSchema: {
        200: import("@sinclair/typebox").TObject<{
            transactionHash: import("@sinclair/typebox").TString;
        }>;
    };
    type SendDefundTransferTx = Static<typeof PostSendDefundTransferTxResponseSchema["200"]>;
    const SendExitChannelTxSchema: {
        200: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            assetId: import("@sinclair/typebox").TString;
            transactionHash: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            error: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
                message: import("@sinclair/typebox").TString;
                context: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
                type: import("@sinclair/typebox").TString;
                stack: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            }>>;
        }>>;
    };
    type SendExitChannelTx = Static<typeof PostSendExitChannelTxResponseSchema["200"]>;
    const SendIsAliveSchema: {
        200: import("@sinclair/typebox").TObject<{
            channelAddress: import("@sinclair/typebox").TString;
        }>;
    };
    type SendIsAlive = Static<typeof PostSendIsAliveResponseSchema["200"]>;
    const SubmitWithdrawalsSchema: {
        200: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            transactionHash: import("@sinclair/typebox").TString;
            transferId: import("@sinclair/typebox").TString;
            channelAddress: import("@sinclair/typebox").TString;
        }>>, import("@sinclair/typebox").TObject<{
            message: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TString;
            context: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
            stack: import("@sinclair/typebox").TString;
        }>]>>;
    };
    type SubmitWithdrawals = Static<typeof PostAdminSubmitWithdrawalsResponseSchema["200"]>;
}
export {};
//# sourceMappingURL=node.d.ts.map