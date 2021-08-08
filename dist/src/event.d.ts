import { TransactionReceipt, TransactionResponse } from "@ethersproject/providers";
import { FullTransferState, FullChannelState, CoreChannelState, CoreTransferState, Balance } from "./channel";
import { ChannelDispute, TransferDispute } from "./dispute";
import { TransactionReason } from "./store";
export declare type ChannelUpdateEvent = {
    updatedChannelState: FullChannelState;
    updatedTransfers?: FullTransferState[];
    updatedTransfer?: FullTransferState;
};
export declare const ProtocolEventName: {
    readonly CHANNEL_UPDATE_EVENT: "CHANNEL_UPDATE_EVENT";
};
export declare type ProtocolEventName = typeof ProtocolEventName[keyof typeof ProtocolEventName];
export declare type ProtocolEventPayloadsMap = {
    [ProtocolEventName.CHANNEL_UPDATE_EVENT]: ChannelUpdateEvent;
};
export declare type StringifiedTransactionReceipt = Omit<TransactionReceipt, "gasUsed" | "cumulativeGasUsed"> & {
    gasUsed: string;
    cumulativeGasUsed: string;
};
export declare type StringifiedTransactionResponse = Omit<TransactionResponse, "gasLimit" | "gasPrice" | "value"> & {
    gasLimit: string;
    gasPrice: string;
    value: string;
};
export declare type TransactionSubmittedPayload = {
    response: StringifiedTransactionResponse;
    reason: TransactionReason;
    channelAddress: string;
};
export declare type TransactionMinedPayload = Omit<TransactionSubmittedPayload, "response"> & {
    receipt: StringifiedTransactionReceipt;
};
export declare type TransactionFailedPayload = Omit<TransactionSubmittedPayload, "response"> & {
    receipt?: StringifiedTransactionReceipt;
    error?: Error;
};
export declare type ChannelDisputedPayload = {
    disputer: string;
    state: CoreChannelState;
    dispute: ChannelDispute;
};
export declare type ChannelDefundedPayload = {
    defunder: string;
    state: CoreChannelState;
    dispute: ChannelDispute;
    defundedAssets: string[];
};
export declare type TransferDisputedPayload = {
    disputer: string;
    state: CoreTransferState;
    dispute: TransferDispute;
};
export declare type TransferDefundedPayload = {
    defunder: string;
    state: CoreTransferState;
    dispute: TransferDispute;
    encodedInitialState: string;
    encodedTransferResolver: string;
    balance: Balance;
};
export declare const ChainReaderEvents: {
    readonly CHANNEL_DISPUTED: "CHANNEL_DISPUTED";
    readonly CHANNEL_DEFUNDED: "CHANNEL_DEFUNDED";
    readonly TRANSFER_DISPUTED: "TRANSFER_DISPUTED";
    readonly TRANSFER_DEFUNDED: "TRANSFER_DEFUNDED";
};
export declare type ChainReaderEvent = typeof ChainReaderEvents[keyof typeof ChainReaderEvents];
export interface ChainReaderEventMap {
    [ChainReaderEvents.CHANNEL_DISPUTED]: ChannelDisputedPayload;
    [ChainReaderEvents.CHANNEL_DEFUNDED]: ChannelDefundedPayload;
    [ChainReaderEvents.TRANSFER_DISPUTED]: TransferDisputedPayload;
    [ChainReaderEvents.TRANSFER_DEFUNDED]: TransferDefundedPayload;
}
export declare const ChainServiceEvents: {
    readonly TRANSACTION_SUBMITTED: "TRANSACTION_SUBMITTED";
    readonly TRANSACTION_MINED: "TRANSACTION_MINED";
    readonly TRANSACTION_FAILED: "TRANSACTION_FAILED";
    readonly CHANNEL_DISPUTED: "CHANNEL_DISPUTED";
    readonly CHANNEL_DEFUNDED: "CHANNEL_DEFUNDED";
    readonly TRANSFER_DISPUTED: "TRANSFER_DISPUTED";
    readonly TRANSFER_DEFUNDED: "TRANSFER_DEFUNDED";
};
export declare type ChainServiceEvent = typeof ChainServiceEvents[keyof typeof ChainServiceEvents];
export interface ChainServiceEventMap extends ChainReaderEventMap {
    [ChainServiceEvents.TRANSACTION_SUBMITTED]: TransactionSubmittedPayload;
    [ChainServiceEvents.TRANSACTION_MINED]: TransactionMinedPayload;
    [ChainServiceEvents.TRANSACTION_FAILED]: TransactionFailedPayload;
}
//# sourceMappingURL=event.d.ts.map