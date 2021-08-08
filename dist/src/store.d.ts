import { TransactionReceipt, TransactionResponse } from "@ethersproject/abstract-provider";
import { WithdrawCommitmentJson } from "./transferDefinitions/withdraw";
import { FullTransferState, FullChannelState } from "./channel";
import { Address } from "./basic";
import { ChannelDispute, TransferDispute } from "./dispute";
import { GetTransfersFilterOpts } from "./schemas/engine";
import { EngineEvent } from ".";
export interface IVectorStore {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getSchemaVersion(): Promise<number | undefined>;
    updateSchemaVersion(version?: number): Promise<void>;
    clear(): Promise<void>;
    getChannelStates(): Promise<FullChannelState[]>;
    getChannelState(channelAddress: string): Promise<FullChannelState | undefined>;
    getChannelStateByParticipants(publicIdentifierA: string, publicIdentifierB: string, chainId: number): Promise<FullChannelState | undefined>;
    getActiveTransfers(channelAddress: string): Promise<FullTransferState[]>;
    getTransferState(transferId: string): Promise<FullTransferState | undefined>;
    getTransfers(filterOpts?: GetTransfersFilterOpts): Promise<FullTransferState[]>;
    saveChannelState(channelState: FullChannelState, transfer?: FullTransferState): Promise<void>;
    saveChannelDispute(channelAddress: string, channelDispute: ChannelDispute): Promise<void>;
    getChannelDispute(channelAddress: string): Promise<ChannelDispute | undefined>;
    saveTransferDispute(channelAddress: string, transferDispute: TransferDispute): Promise<void>;
    getTransferDispute(transferId: string): Promise<TransferDispute | undefined>;
}
export declare const StoredTransactionStatus: {
    readonly submitted: "submitted";
    readonly mined: "mined";
    readonly failed: "failed";
};
export declare type StoredTransactionStatus = keyof typeof StoredTransactionStatus;
export declare const TransactionReason: {
    readonly allowance: "allowance";
    readonly approveTokens: "approveTokens";
    readonly disputeChannel: "disputeChannel";
    readonly disputeTransfer: "disputeTransfer";
    readonly defundChannel: "defundChannel";
    readonly defundTransfer: "defundTransfer";
    readonly depositA: "depositA";
    readonly depositB: "depositB";
    readonly deploy: "deploy";
    readonly deployWithDepositAlice: "deployWithDepositAlice";
    readonly exitChannel: "exitChannel";
    readonly speedUpTransaction: "speedUpTransaction";
    readonly transferTokens: "transferTokens";
    readonly withdraw: "withdraw";
};
export declare type TransactionReason = keyof typeof TransactionReason;
export declare type StoredTransactionAttempt = {
    transactionHash: string;
    gasLimit: string;
    gasPrice: string;
    createdAt: Date;
};
export declare type StoredTransactionReceipt = {
    transactionHash: string;
    contractAddress: string;
    transactionIndex: number;
    root?: string;
    gasUsed: string;
    cumulativeGasUsed: string;
    logsBloom: string;
    blockHash: string;
    blockNumber: number;
    logs?: string;
    byzantium: boolean;
    status?: number;
};
export declare type StoredTransaction = {
    id: string;
    channelAddress: string;
    status: StoredTransactionStatus;
    reason: TransactionReason;
    error?: string;
    to: Address;
    from: Address;
    data: string;
    value: string;
    chainId: number;
    nonce: number;
    attempts: StoredTransactionAttempt[];
    receipt?: StoredTransactionReceipt;
};
export interface IChainServiceStore {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    clear(): Promise<void>;
    getTransactionById(onchainTransactionId: string): Promise<StoredTransaction | undefined>;
    getActiveTransactions(): Promise<StoredTransaction[]>;
    saveTransactionAttempt(onchainTransactionId: string, channelAddress: string, reason: TransactionReason, response: TransactionResponse): Promise<void>;
    saveTransactionReceipt(onchainTransactionId: string, transaction: TransactionReceipt): Promise<void>;
    saveTransactionFailure(onchainTransactionId: string, error: string, receipt?: TransactionReceipt): Promise<void>;
}
export interface IEngineStore extends IVectorStore, IChainServiceStore {
    getWithdrawalCommitment(transferId: string): Promise<WithdrawCommitmentJson | undefined>;
    getWithdrawalCommitmentByTransactionHash(transactionHash: string): Promise<WithdrawCommitmentJson | undefined>;
    getUnsubmittedWithdrawals(channelAddress: string, withdrawalDefinition: string): Promise<{
        commitment: WithdrawCommitmentJson;
        transfer: FullTransferState;
    }[]>;
    getTransferByRoutingId(channelAddress: string, routingId: string): Promise<FullTransferState | undefined>;
    getTransfersByRoutingId(routingId: string): Promise<FullTransferState[]>;
    saveWithdrawalCommitment(transferId: string, withdrawCommitment: WithdrawCommitmentJson): Promise<void>;
    saveChannelStateAndTransfers(channelState: FullChannelState, activeTransfers: FullTransferState[]): Promise<void>;
}
export interface IServerNodeStore extends IEngineStore {
    registerSubscription<T extends EngineEvent>(publicIdentifier: string, event: T, url: string): Promise<void>;
    getSubscription<T extends EngineEvent>(publicIdentifier: string, event: T): Promise<string | undefined>;
    getSubscriptions(publicIdentifier: string): Promise<{
        [event: string]: string;
    }>;
    setNodeIndex(index: number, publicIdentifier: string): Promise<void>;
    getNodeIndexes(): Promise<{
        index: number;
        publicIdentifier: string;
    }[]>;
    removeNodeIndexes(): Promise<void>;
}
//# sourceMappingURL=store.d.ts.map