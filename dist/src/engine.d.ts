import { Address, Bytes32 } from "./basic";
import { Balance, FullTransferState } from "./channel";
import { EngineParams } from "./schemas";
import { TransferName } from "./transferDefinitions";
import { ChannelRpcMethod, ChannelRpcMethodsResponsesMap } from "./vectorProvider";
import { ChainServiceEventMap, ChainServiceEvents } from "./event";
import { MinimalTransaction } from "./chain";
export declare type ConditionalTransferResponse = {
    routingId: Bytes32;
};
export declare const IS_ALIVE_EVENT = "IS_ALIVE";
export declare type IsAlivePayload = {
    channelAddress: string;
    aliceIdentifier: string;
    bobIdentifier: string;
    chainId: number;
    skipCheckIn?: boolean;
};
export declare const SETUP_EVENT = "SETUP";
export declare type SetupPayload = {
    channelAddress: string;
    aliceIdentifier: string;
    bobIdentifier: string;
    chainId: number;
    meta?: any;
};
export declare const CONDITIONAL_TRANSFER_CREATED_EVENT = "CONDITIONAL_TRANSFER_CREATED";
export declare type ConditionalTransferCreatedPayload = {
    aliceIdentifier: string;
    bobIdentifier: string;
    channelAddress: string;
    transfer: FullTransferState;
    channelBalance: Balance;
    conditionType: TransferName | Address;
    activeTransferIds?: string[];
};
export declare const CONDITIONAL_TRANSFER_RESOLVED_EVENT = "CONDITIONAL_TRANSFER_RESOLVED";
export declare type ConditionalTransferResolvedPayload = ConditionalTransferCreatedPayload;
export declare const CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT = "CONDITIONAL_TRANSFER_ROUTING_COMPLETE";
export declare type ConditionalTransferRoutingCompletePayload = {
    publicIdentifier: string;
    routingId: string;
    initiatorIdentifier: string;
    responderIdentifier: string;
    meta?: any;
};
export declare const DEPOSIT_RECONCILED_EVENT = "DEPOSIT_RECONCILED";
export declare type DepositReconciledPayload = {
    aliceIdentifier: string;
    bobIdentifier: string;
    channelAddress: string;
    assetId: string;
    channelBalance: Balance;
    meta?: any;
};
export declare const REQUEST_COLLATERAL_EVENT = "REQUEST_COLLATERAL";
export declare type RequestCollateralPayload = {
    aliceIdentifier: string;
    bobIdentifier: string;
    channelAddress: string;
    assetId: string;
    amount?: string;
    meta?: any;
};
export declare const WITHDRAWAL_CREATED_EVENT = "WITHDRAWAL_CREATED";
export declare type WithdrawalCreatedPayload = {
    aliceIdentifier: string;
    bobIdentifier: string;
    channelAddress: string;
    transfer: FullTransferState;
    fee: string;
    assetId: string;
    amount: string;
    recipient: string;
    callTo: string;
    callData: string;
    channelBalance: Balance;
};
export declare const WITHDRAWAL_RESOLVED_EVENT = "WITHDRAWAL_RESOLVED";
export declare type WithdrawalResolvedPayload = WithdrawalCreatedPayload & {
    transaction?: MinimalTransaction;
};
export declare const WITHDRAWAL_RECONCILED_EVENT = "WITHDRAWAL_RECONCILED";
export declare type WithdrawalReconciledPayload = {
    aliceIdentifier: string;
    bobIdentifier: string;
    channelAddress: string;
    transactionHash: string;
    transferId: string;
    meta?: any;
};
export declare const RESTORE_STATE_EVENT = "RESTORE_STATE_EVENT";
export declare type RestoreStatePayload = SetupPayload;
export declare const EngineEvents: {
    readonly TRANSACTION_SUBMITTED: "TRANSACTION_SUBMITTED";
    readonly TRANSACTION_MINED: "TRANSACTION_MINED";
    readonly TRANSACTION_FAILED: "TRANSACTION_FAILED";
    readonly CHANNEL_DISPUTED: "CHANNEL_DISPUTED";
    readonly CHANNEL_DEFUNDED: "CHANNEL_DEFUNDED";
    readonly TRANSFER_DISPUTED: "TRANSFER_DISPUTED";
    readonly TRANSFER_DEFUNDED: "TRANSFER_DEFUNDED";
    readonly IS_ALIVE: "IS_ALIVE";
    readonly SETUP: "SETUP";
    readonly CONDITIONAL_TRANSFER_CREATED: "CONDITIONAL_TRANSFER_CREATED";
    readonly CONDITIONAL_TRANSFER_RESOLVED: "CONDITIONAL_TRANSFER_RESOLVED";
    readonly CONDITIONAL_TRANSFER_ROUTING_COMPLETE: "CONDITIONAL_TRANSFER_ROUTING_COMPLETE";
    readonly DEPOSIT_RECONCILED: "DEPOSIT_RECONCILED";
    readonly REQUEST_COLLATERAL: "REQUEST_COLLATERAL";
    readonly RESTORE_STATE_EVENT: "RESTORE_STATE_EVENT";
    readonly WITHDRAWAL_CREATED: "WITHDRAWAL_CREATED";
    readonly WITHDRAWAL_RESOLVED: "WITHDRAWAL_RESOLVED";
    readonly WITHDRAWAL_RECONCILED: "WITHDRAWAL_RECONCILED";
};
export declare type EngineEvent = typeof EngineEvents[keyof typeof EngineEvents];
export interface EngineEventMap extends ChainServiceEventMap {
    [IS_ALIVE_EVENT]: IsAlivePayload;
    [SETUP_EVENT]: SetupPayload;
    [CONDITIONAL_TRANSFER_CREATED_EVENT]: ConditionalTransferCreatedPayload;
    [CONDITIONAL_TRANSFER_RESOLVED_EVENT]: ConditionalTransferResolvedPayload;
    [CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT]: ConditionalTransferRoutingCompletePayload;
    [DEPOSIT_RECONCILED_EVENT]: DepositReconciledPayload;
    [REQUEST_COLLATERAL_EVENT]: RequestCollateralPayload;
    [RESTORE_STATE_EVENT]: RestoreStatePayload;
    [SETUP_EVENT]: SetupPayload;
    [WITHDRAWAL_CREATED_EVENT]: WithdrawalCreatedPayload;
    [WITHDRAWAL_RESOLVED_EVENT]: WithdrawalResolvedPayload;
    [WITHDRAWAL_RECONCILED_EVENT]: WithdrawalReconciledPayload;
    [ChainServiceEvents.TRANSACTION_SUBMITTED]: ChainServiceEventMap[typeof ChainServiceEvents.TRANSACTION_SUBMITTED] & {
        publicIdentifier: string;
    };
    [ChainServiceEvents.TRANSACTION_MINED]: ChainServiceEventMap[typeof ChainServiceEvents.TRANSACTION_MINED] & {
        publicIdentifier: string;
    };
    [ChainServiceEvents.TRANSACTION_FAILED]: ChainServiceEventMap[typeof ChainServiceEvents.TRANSACTION_FAILED] & {
        publicIdentifier: string;
    };
    [ChainServiceEvents.CHANNEL_DISPUTED]: ChainServiceEventMap[typeof ChainServiceEvents.CHANNEL_DISPUTED] & {
        publicIdentifier: string;
    };
    [ChainServiceEvents.CHANNEL_DEFUNDED]: ChainServiceEventMap[typeof ChainServiceEvents.CHANNEL_DEFUNDED] & {
        publicIdentifier: string;
    };
    [ChainServiceEvents.TRANSFER_DISPUTED]: ChainServiceEventMap[typeof ChainServiceEvents.TRANSFER_DISPUTED] & {
        publicIdentifier: string;
    };
    [ChainServiceEvents.TRANSFER_DEFUNDED]: ChainServiceEventMap[typeof ChainServiceEvents.TRANSFER_DEFUNDED] & {
        publicIdentifier: string;
    };
}
export interface IVectorEngine {
    publicIdentifier: string;
    signerAddress: string;
    request<T extends ChannelRpcMethod>(payload: EngineParams.RpcRequest): Promise<ChannelRpcMethodsResponsesMap[T]>;
    on<T extends EngineEvent>(event: T, callback: (payload: EngineEventMap[T]) => void | Promise<void>, filter?: (payload: EngineEventMap[T]) => boolean): void;
    once<T extends EngineEvent>(event: T, callback: (payload: EngineEventMap[T]) => void | Promise<void>, filter?: (payload: EngineEventMap[T]) => boolean): void;
    waitFor<T extends EngineEvent>(event: T, timeout: number, filter?: (payload: EngineEventMap[T]) => boolean): Promise<EngineEventMap[T]>;
    off<T extends EngineEvent>(event?: T): void;
}
//# sourceMappingURL=engine.d.ts.map