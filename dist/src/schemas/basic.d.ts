import { Static, TLiteral } from "@sinclair/typebox";
import { UpdateType } from "../channel";
export declare const TAddress: import("@sinclair/typebox").TString;
export declare const TIntegerString: import("@sinclair/typebox").TString;
export declare const TDecimalString: import("@sinclair/typebox").TString;
export declare const TPublicIdentifier: import("@sinclair/typebox").TString;
export declare const TBytes32: import("@sinclair/typebox").TString;
export declare const TBytes: import("@sinclair/typebox").TString;
export declare const TSignature: import("@sinclair/typebox").TString;
export declare const TUrl: import("@sinclair/typebox").TString;
export declare const TChainId: import("@sinclair/typebox").TNumber;
export declare const TBalance: import("@sinclair/typebox").TObject<{
    to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export declare const TVectorErrorJson: import("@sinclair/typebox").TObject<{
    message: import("@sinclair/typebox").TString;
    context: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
    type: import("@sinclair/typebox").TString;
    stack: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const TBasicMeta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
export declare const TTransferMeta: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    createdAt: import("@sinclair/typebox").TNumber;
    resolvedAt: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>, import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>]>;
export declare const TContractAddresses: import("@sinclair/typebox").TObject<{
    channelFactoryAddress: import("@sinclair/typebox").TString;
    transferRegistryAddress: import("@sinclair/typebox").TString;
}>;
export declare const TNetworkContext: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    channelFactoryAddress: import("@sinclair/typebox").TString;
    transferRegistryAddress: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    chainId: import("@sinclair/typebox").TNumber;
}>]>;
export declare const AllowedSwapSchema: import("@sinclair/typebox").TObject<{
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
}>;
export declare type AllowedSwap = Static<typeof AllowedSwapSchema>;
export declare const TransferStateSchema: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
export declare const TransferResolverSchema: import("@sinclair/typebox").TAny;
export declare const TransferEncodingSchema: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
export declare const TransferNameSchema: import("@sinclair/typebox").TString;
export declare const TFullTransferState: import("@sinclair/typebox").TObject<{
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
}>;
export declare const TSetupUpdateDetails: import("@sinclair/typebox").TObject<{
    timeout: import("@sinclair/typebox").TString;
    networkContext: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelFactoryAddress: import("@sinclair/typebox").TString;
        transferRegistryAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        chainId: import("@sinclair/typebox").TNumber;
    }>]>;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>;
export declare const TDepositUpdateDetails: import("@sinclair/typebox").TObject<{
    totalDepositsAlice: import("@sinclair/typebox").TString;
    totalDepositsBob: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>;
export declare const TCreateUpdateDetails: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
    balance: import("@sinclair/typebox").TObject<{
        to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    }>;
    transferDefinition: import("@sinclair/typebox").TString;
    transferTimeout: import("@sinclair/typebox").TString;
    transferInitialState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
    transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    merkleProofData: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    merkleRoot: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>;
export declare const TResolveUpdateDetails: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
    transferDefinition: import("@sinclair/typebox").TString;
    transferResolver: import("@sinclair/typebox").TAny;
    merkleRoot: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>;
export declare const TChannelUpdateDetails: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    timeout: import("@sinclair/typebox").TString;
    networkContext: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelFactoryAddress: import("@sinclair/typebox").TString;
        transferRegistryAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        chainId: import("@sinclair/typebox").TNumber;
    }>]>;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>, import("@sinclair/typebox").TObject<{
    totalDepositsAlice: import("@sinclair/typebox").TString;
    totalDepositsBob: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>, import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
    balance: import("@sinclair/typebox").TObject<{
        to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    }>;
    transferDefinition: import("@sinclair/typebox").TString;
    transferTimeout: import("@sinclair/typebox").TString;
    transferInitialState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
    transferEncodings: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    merkleProofData: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    merkleRoot: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>, import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
    transferDefinition: import("@sinclair/typebox").TString;
    transferResolver: import("@sinclair/typebox").TAny;
    merkleRoot: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>;
}>]>;
export declare const TChannelUpdateType: import("@sinclair/typebox").TUnion<[TLiteral<UpdateType>]>;
export declare const TChannelUpdate: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    fromIdentifier: import("@sinclair/typebox").TString;
    toIdentifier: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TUnion<[TLiteral<UpdateType>]>;
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
export declare type TChannelUpdate = Static<typeof TChannelUpdate>;
export declare const TFullChannelState: import("@sinclair/typebox").TObject<{
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
        type: import("@sinclair/typebox").TUnion<[TLiteral<UpdateType>]>;
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
}>;
export declare type TFullChannelState = Static<typeof TFullChannelState>;
export declare const TransferQuoteSchema: import("@sinclair/typebox").TObject<{
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
export declare type TransferQuote = Static<typeof TransferQuoteSchema>;
export declare const WithdrawalQuoteSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    amount: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    fee: import("@sinclair/typebox").TString;
    expiry: import("@sinclair/typebox").TString;
    signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare type WithdrawalQuote = Static<typeof WithdrawalQuoteSchema>;
export declare const TransferDisputeSchema: import("@sinclair/typebox").TObject<{
    transferId: import("@sinclair/typebox").TString;
    transferStateHash: import("@sinclair/typebox").TString;
    transferDisputeExpiry: import("@sinclair/typebox").TString;
    isDefunded: import("@sinclair/typebox").TBoolean;
}>;
export declare type TTransferDispute = Static<typeof TransferDisputeSchema>;
export declare const ChannelDisputeSchema: import("@sinclair/typebox").TObject<{
    channelStateHash: import("@sinclair/typebox").TString;
    nonce: import("@sinclair/typebox").TString;
    merkleRoot: import("@sinclair/typebox").TString;
    consensusExpiry: import("@sinclair/typebox").TString;
    defundExpiry: import("@sinclair/typebox").TString;
}>;
export declare type TChannelDispute = Static<typeof ChannelDisputeSchema>;
//# sourceMappingURL=basic.d.ts.map