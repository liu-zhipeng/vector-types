import { ChannelUpdate, FullChannelState, FullTransferState } from "./channel";
import { ConditionalTransferRoutingCompletePayload } from "./engine";
import { EngineError, NodeError, MessagingError, ProtocolError, Result, RouterError, VectorError } from "./error";
import { LockInformation } from "./lock";
import { EngineParams, NodeResponses } from "./schemas";
export declare type CheckInInfo = {
    channelAddress: string;
};
export declare type CheckInResponse = {
    aliceIdentifier: string;
    bobIdentifier: string;
    chainId: number;
    channelAddress: string;
};
export interface IBasicMessaging {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    publish(subject: string, data: any): Promise<void>;
    subscribe(subject: string, cb: (data: any) => any): Promise<void>;
    unsubscribe(subject: string): Promise<void>;
    flush(): Promise<void>;
    request(subject: string, timeout: number, data: any): Promise<any>;
}
declare type TransferQuoteRequest = Omit<EngineParams.GetTransferQuote, "routerIdentifier">;
export interface IMessagingService extends IBasicMessaging {
    onReceiveLockMessage(myPublicIdentifier: string, callback: (lockInfo: Result<LockInformation, NodeError>, from: string, inbox: string) => void): Promise<void>;
    sendLockMessage(lockInfo: Result<LockInformation, NodeError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<LockInformation, NodeError | MessagingError>>;
    respondToLockMessage(inbox: string, lockInformation: Result<LockInformation, NodeError>): Promise<void>;
    onReceiveProtocolMessage(myPublicIdentifier: string, callback: (result: Result<{
        update: ChannelUpdate<any>;
        previousUpdate: ChannelUpdate<any>;
    }, ProtocolError>, from: string, inbox: string) => void): Promise<void>;
    sendProtocolMessage(channelUpdate: ChannelUpdate<any>, previousUpdate?: ChannelUpdate<any>, timeout?: number, numRetries?: number): Promise<Result<{
        update: ChannelUpdate<any>;
        previousUpdate: ChannelUpdate<any>;
    }, ProtocolError | MessagingError>>;
    respondToProtocolMessage(inbox: string, channelUpdate: ChannelUpdate<any>, previousUpdate?: ChannelUpdate<any>): Promise<void>;
    respondWithProtocolError(inbox: string, error: ProtocolError): Promise<void>;
    sendSetupMessage(setupInfo: Result<Omit<EngineParams.Setup, "counterpartyIdentifier">, EngineError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<{
        channelAddress: string;
    }, EngineError | MessagingError>>;
    onReceiveSetupMessage(publicIdentifier: string, callback: (setupInfo: Result<Omit<EngineParams.Setup, "counterpartyIdentifier">, EngineError>, from: string, inbox: string) => void): Promise<void>;
    respondToSetupMessage(inbox: string, params: Result<{
        channelAddress: string;
    }, EngineError>): Promise<void>;
    sendRestoreStateMessage(restoreData: Result<{
        chainId: number;
    } | {
        channelAddress: string;
    }, EngineError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<{
        channel: FullChannelState;
        activeTransfers: FullTransferState[];
    } | void, EngineError | MessagingError>>;
    onReceiveRestoreStateMessage(publicIdentifier: string, callback: (restoreData: Result<{
        chainId: number;
    } | {
        channelAddress: string;
    }, EngineError>, from: string, inbox: string) => void): Promise<void>;
    respondToRestoreStateMessage(inbox: string, restoreData: Result<{
        channel: FullChannelState;
        activeTransfers: FullTransferState[];
    } | void, EngineError>): Promise<void>;
    sendIsAliveMessage(isAlive: Result<{
        channelAddress: string;
        skipCheckIn?: boolean;
    }, EngineError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<{
        channelAddress: string;
    }, EngineError | MessagingError>>;
    onReceiveIsAliveMessage(publicIdentifier: string, callback: (isAlive: Result<{
        channelAddress: string;
        skipCheckIn?: boolean;
    }, EngineError>, from: string, inbox: string) => void): Promise<void>;
    respondToIsAliveMessage(inbox: string, params: Result<{
        channelAddress: string;
    }, EngineError>): Promise<void>;
    sendRequestCollateralMessage(requestCollateralParams: Result<EngineParams.RequestCollateral, EngineError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<undefined, EngineError | MessagingError>>;
    onReceiveRequestCollateralMessage(publicIdentifier: string, callback: (params: Result<EngineParams.RequestCollateral, EngineError>, from: string, inbox: string) => void): Promise<void>;
    respondToRequestCollateralMessage(inbox: string, params: Result<{
        message?: string;
    }, EngineError>): Promise<void>;
    onReceiveWithdrawalQuoteMessage(myPublicIdentifier: string, callback: (quoteRequest: Result<EngineParams.GetWithdrawalQuote, NodeError>, from: string, inbox: string) => void): Promise<void>;
    sendWithdrawalQuoteMessage(quoteRequest: Result<EngineParams.GetWithdrawalQuote, NodeError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<NodeResponses.WithdrawalQuote, NodeError | MessagingError>>;
    respondToWithdrawalQuoteMessage(inbox: string, quote: Result<NodeResponses.WithdrawalQuote, NodeError>): Promise<void>;
    sendRouterConfigMessage(configRequest: Result<void, VectorError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<NodeResponses.GetRouterConfig, RouterError | MessagingError>>;
    sendTransferQuoteMessage(quoteRequest: Result<TransferQuoteRequest, VectorError>, to: string, from: string, timeout?: number, numRetries?: number): Promise<Result<NodeResponses.TransferQuote, RouterError | MessagingError>>;
    publishTransferRoutingCompleteMessage(to: string, from: string, data: Result<Omit<ConditionalTransferRoutingCompletePayload, "publicIdentifier">, VectorError>): Promise<void>;
    onReceiveTransferRoutingCompleteMessage(myPublicIdentifier: string, callback: (data: Result<Omit<ConditionalTransferRoutingCompletePayload, "publicIdentifier">, NodeError>, from: string, inbox: string) => void): Promise<void>;
    publishWithdrawalSubmittedMessage(to: string, from: string, data: Result<{
        channelAddress: string;
        txHash: string;
        transferId: string;
    }, VectorError>): Promise<void>;
    onReceiveWithdrawalSubmittedMessage(myPublicIdentifier: string, callback: (submitted: Result<{
        channelAddress: string;
        txHash: string;
        transferId: string;
    }, NodeError>, from: string, inbox: string) => void): Promise<void>;
}
export {};
//# sourceMappingURL=messaging.d.ts.map