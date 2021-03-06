import { Address } from "./basic";
import { TransferResolver, TransferState } from "./transferDefinitions";
export declare type ContextualAddress = {
    address: Address;
    chainId: number;
};
export declare type BasicMeta = any;
export declare type TransferMeta = BasicMeta & {
    createdAt: number;
    resolvedAt?: number;
};
export declare type SetupParams = {
    counterpartyIdentifier: string;
    timeout: string;
    networkContext: NetworkContext;
    meta?: any;
};
export declare type DepositParams = {
    channelAddress: string;
    assetId: string;
    meta?: any;
};
export declare type CreateTransferParams = {
    channelAddress: string;
    balance: Balance;
    assetId: string;
    transferDefinition: string;
    transferInitialState: TransferState;
    timeout: string;
    meta?: BasicMeta;
};
export declare type ResolveTransferParams = {
    channelAddress: string;
    transferId: string;
    transferResolver: TransferResolver;
    meta?: any;
};
export declare const UpdateType: {
    readonly create: "create";
    readonly deposit: "deposit";
    readonly resolve: "resolve";
    readonly setup: "setup";
};
export declare type UpdateType = typeof UpdateType[keyof typeof UpdateType];
export interface UpdateParamsMap {
    [UpdateType.create]: Omit<CreateTransferParams, "channelAddress">;
    [UpdateType.deposit]: Omit<DepositParams, "channelAddress">;
    [UpdateType.resolve]: Omit<ResolveTransferParams, "channelAddress">;
    [UpdateType.setup]: SetupParams;
}
export declare type UpdateParams<T extends UpdateType> = {
    channelAddress: string;
    type: T;
    details: UpdateParamsMap[T];
};
export declare type Balance = {
    amount: string[];
    to: Address[];
};
export declare enum ChannelCommitmentTypes {
    ChannelState = 0,
    WithdrawData = 1
}
export declare const CoreChannelStateEncoding: string;
export interface CoreChannelState {
    channelAddress: Address;
    alice: Address;
    bob: Address;
    assetIds: Address[];
    balances: Balance[];
    processedDepositsA: string[];
    processedDepositsB: string[];
    defundNonces: string[];
    timeout: string;
    nonce: number;
    merkleRoot: string;
}
export declare type FullChannelState<T extends UpdateType = any> = CoreChannelState & {
    aliceIdentifier: string;
    bobIdentifier: string;
    latestUpdate: ChannelUpdate<T>;
    networkContext: NetworkContext;
    inDispute: boolean;
};
export declare const CoreTransferStateEncoding: string;
export interface CoreTransferState {
    channelAddress: Address;
    transferId: string;
    transferDefinition: Address;
    initiator: Address;
    responder: Address;
    assetId: Address;
    balance: Balance;
    transferTimeout: string;
    initialStateHash: string;
}
export declare type FullTransferState<M extends TransferMeta = any> = CoreTransferState & {
    channelFactoryAddress: string;
    chainId: number;
    transferEncodings: string[];
    transferState: any;
    transferResolver?: any;
    meta: M;
    inDispute: boolean;
    channelNonce: number;
    initiatorIdentifier: string;
    responderIdentifier: string;
};
export interface TransferCommitmentData {
    state: CoreTransferState;
    channelFactoryAddress: Address;
    chainId: number;
    merkleProofData: string[];
}
export declare type ChainAddresses = {
    [chainId: number]: ContractAddresses;
};
export declare type ContractAddresses = {
    channelFactoryAddress: Address;
    transferRegistryAddress: Address;
};
export declare type NetworkContext = ContractAddresses & {
    chainId: number;
};
export declare type ChannelUpdate<T extends UpdateType = any> = {
    channelAddress: string;
    fromIdentifier: string;
    toIdentifier: string;
    type: T;
    nonce: number;
    balance: Balance;
    assetId: Address;
    details: ChannelUpdateDetailsMap[T];
    aliceSignature?: string;
    bobSignature?: string;
};
export interface ChannelUpdateDetailsMap {
    [UpdateType.create]: CreateUpdateDetails;
    [UpdateType.deposit]: DepositUpdateDetails;
    [UpdateType.resolve]: ResolveUpdateDetails;
    [UpdateType.setup]: SetupUpdateDetails;
}
export declare type CreateUpdateDetails = {
    transferId: string;
    balance: Balance;
    transferDefinition: Address;
    transferTimeout: string;
    transferInitialState: TransferState;
    transferEncodings: string[];
    merkleProofData: string[];
    merkleRoot: string;
    meta?: BasicMeta;
};
export declare type ResolveUpdateDetails = {
    transferId: string;
    transferDefinition: Address;
    transferResolver: TransferResolver;
    merkleRoot: string;
    meta?: BasicMeta;
};
export declare type DepositUpdateDetails = {
    totalDepositsAlice: string;
    totalDepositsBob: string;
    meta?: BasicMeta;
};
export declare type SetupUpdateDetails = {
    timeout: string;
    networkContext: NetworkContext;
    meta?: BasicMeta;
};
//# sourceMappingURL=channel.d.ts.map