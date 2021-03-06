import { Static } from "@sinclair/typebox";
declare const SetupProtocolParamsSchema: import("@sinclair/typebox").TObject<{
    timeout: import("@sinclair/typebox").TString;
    networkContext: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
        channelFactoryAddress: import("@sinclair/typebox").TString;
        transferRegistryAddress: import("@sinclair/typebox").TString;
    }>, import("@sinclair/typebox").TObject<{
        chainId: import("@sinclair/typebox").TNumber;
    }>]>;
    counterpartyIdentifier: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
}>;
declare const DepositProtocolParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    assetId: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
}>;
declare const CreateProtocolParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    balance: import("@sinclair/typebox").TObject<{
        to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    }>;
    assetId: import("@sinclair/typebox").TString;
    transferDefinition: import("@sinclair/typebox").TString;
    transferInitialState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
    timeout: import("@sinclair/typebox").TString;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
}>;
declare const ResolveProtocolParamsSchema: import("@sinclair/typebox").TObject<{
    channelAddress: import("@sinclair/typebox").TString;
    transferId: import("@sinclair/typebox").TString;
    transferResolver: import("@sinclair/typebox").TAny;
    meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
}>;
export declare namespace ProtocolParams {
    const SetupSchema: import("@sinclair/typebox").TObject<{
        timeout: import("@sinclair/typebox").TString;
        networkContext: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
            channelFactoryAddress: import("@sinclair/typebox").TString;
            transferRegistryAddress: import("@sinclair/typebox").TString;
        }>, import("@sinclair/typebox").TObject<{
            chainId: import("@sinclair/typebox").TNumber;
        }>]>;
        counterpartyIdentifier: import("@sinclair/typebox").TString;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>;
    type Setup = Static<typeof SetupProtocolParamsSchema>;
    const DepositSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>;
    type Deposit = Static<typeof DepositProtocolParamsSchema>;
    const CreateSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        balance: import("@sinclair/typebox").TObject<{
            to: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
            amount: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
        }>;
        assetId: import("@sinclair/typebox").TString;
        transferDefinition: import("@sinclair/typebox").TString;
        transferInitialState: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>;
        timeout: import("@sinclair/typebox").TString;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>;
    type Create = Static<typeof CreateProtocolParamsSchema>;
    const ResolveSchema: import("@sinclair/typebox").TObject<{
        channelAddress: import("@sinclair/typebox").TString;
        transferId: import("@sinclair/typebox").TString;
        transferResolver: import("@sinclair/typebox").TAny;
        meta: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TDict<import("@sinclair/typebox").TAny>>>;
    }>;
    type Resolve = Static<typeof ResolveProtocolParamsSchema>;
}
export {};
//# sourceMappingURL=protocol.d.ts.map