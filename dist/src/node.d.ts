import { EngineEvent, EngineEventMap } from "./engine";
import { NodeError, Result } from "./error";
import { GetTransfersFilterOpts, NodeParams, NodeResponses } from "./schemas";
export declare type OptionalPublicIdentifier<T> = Omit<T, "publicIdentifier"> & {
    publicIdentifier?: string;
};
export interface INodeService {
    publicIdentifier: string;
    signerAddress: string;
    getStatus(): Promise<Result<NodeResponses.GetStatus, NodeError>>;
    getRouterConfig(params: OptionalPublicIdentifier<NodeParams.GetRouterConfig>): Promise<Result<NodeResponses.GetRouterConfig, NodeError>>;
    getStateChannelByParticipants(params: OptionalPublicIdentifier<NodeParams.GetChannelStateByParticipants>): Promise<Result<NodeResponses.GetChannelStateByParticipants, NodeError>>;
    getStateChannels(params: OptionalPublicIdentifier<NodeParams.GetChannelStates>): Promise<Result<NodeResponses.GetChannelStates, NodeError>>;
    getStateChannel(params: OptionalPublicIdentifier<NodeParams.GetChannelState>): Promise<Result<NodeResponses.GetChannelState, NodeError>>;
    getTransferQuote(params: OptionalPublicIdentifier<NodeParams.TransferQuote>): Promise<Result<NodeResponses.TransferQuote, NodeError>>;
    getTransferByRoutingId(params: OptionalPublicIdentifier<NodeParams.GetTransferStateByRoutingId>): Promise<Result<NodeResponses.GetTransferStateByRoutingId, NodeError>>;
    getTransfersByRoutingId(params: OptionalPublicIdentifier<NodeParams.GetTransferStatesByRoutingId>): Promise<Result<NodeResponses.GetTransferStatesByRoutingId, NodeError>>;
    getTransfer(params: OptionalPublicIdentifier<NodeParams.GetTransferState>): Promise<Result<NodeResponses.GetTransferState, NodeError>>;
    getActiveTransfers(params: OptionalPublicIdentifier<NodeParams.GetActiveTransfersByChannelAddress>): Promise<Result<NodeResponses.GetActiveTransfersByChannelAddress, NodeError>>;
    getTransfers(params: OptionalPublicIdentifier<NodeParams.GetTransfers & Omit<GetTransfersFilterOpts, "startDate" | "endDate"> & {
        startDate: Date;
        endDate: Date;
    }>): Promise<Result<NodeResponses.GetTransfers, NodeError>>;
    getRegisteredTransfers(params: OptionalPublicIdentifier<NodeParams.GetRegisteredTransfers>): Promise<Result<NodeResponses.GetRegisteredTransfers, NodeError>>;
    getWithdrawalCommitment(params: OptionalPublicIdentifier<NodeParams.GetWithdrawalCommitment>): Promise<Result<NodeResponses.GetWithdrawalCommitment, NodeError>>;
    getWithdrawalCommitmentByTransactionHash(params: OptionalPublicIdentifier<NodeParams.GetWithdrawalCommitmentByTransactionHash>): Promise<Result<NodeResponses.GetWithdrawalCommitmentByTransactionHash, NodeError>>;
    createNode(params: NodeParams.CreateNode): Promise<Result<NodeResponses.CreateNode, NodeError>>;
    setup(params: OptionalPublicIdentifier<NodeParams.RequestSetup>): Promise<Result<NodeResponses.RequestSetup, NodeError>>;
    internalSetup(params: OptionalPublicIdentifier<NodeParams.Setup>): Promise<Result<NodeResponses.Setup, NodeError>>;
    sendDepositTx(params: OptionalPublicIdentifier<NodeParams.SendDepositTx>): Promise<Result<NodeResponses.SendDepositTx, NodeError>>;
    reconcileDeposit(params: OptionalPublicIdentifier<NodeParams.Deposit>): Promise<Result<NodeResponses.Deposit, NodeError>>;
    requestCollateral(params: OptionalPublicIdentifier<NodeParams.RequestCollateral>): Promise<Result<NodeResponses.RequestCollateral, NodeError>>;
    conditionalTransfer(params: OptionalPublicIdentifier<NodeParams.ConditionalTransfer>): Promise<Result<NodeResponses.ConditionalTransfer, NodeError>>;
    resolveTransfer(params: OptionalPublicIdentifier<NodeParams.ResolveTransfer>): Promise<Result<NodeResponses.ResolveTransfer, NodeError>>;
    signUtilityMessage(params: OptionalPublicIdentifier<NodeParams.SignUtilityMessage>): Promise<Result<NodeResponses.SignUtilityMessage, NodeError>>;
    sendIsAliveMessage(params: OptionalPublicIdentifier<NodeParams.SendIsAlive>): Promise<Result<NodeResponses.SendIsAlive, NodeError>>;
    withdraw(params: OptionalPublicIdentifier<NodeParams.Withdraw>): Promise<Result<NodeResponses.Withdraw, NodeError>>;
    getWithdrawalQuote(params: OptionalPublicIdentifier<NodeParams.WithdrawalQuote>): Promise<Result<NodeResponses.WithdrawalQuote, NodeError>>;
    restoreState(params: OptionalPublicIdentifier<NodeParams.RestoreState>): Promise<Result<NodeResponses.RestoreState, NodeError>>;
    getChannelDispute(params: OptionalPublicIdentifier<NodeParams.GetChannelDispute>): Promise<Result<NodeResponses.GetChannelDispute, NodeError>>;
    sendDisputeChannelTx(params: OptionalPublicIdentifier<NodeParams.SendDisputeChannelTx>): Promise<Result<NodeResponses.SendDisputeChannelTx, NodeError>>;
    sendDefundChannelTx(params: OptionalPublicIdentifier<NodeParams.SendDefundChannelTx>): Promise<Result<NodeResponses.SendDefundChannelTx, NodeError>>;
    getTransferDispute(params: OptionalPublicIdentifier<NodeParams.GetTransferDispute>): Promise<Result<NodeResponses.GetTransferDispute, NodeError>>;
    sendDisputeTransferTx(params: OptionalPublicIdentifier<NodeParams.SendDisputeTransferTx>): Promise<Result<NodeResponses.SendDisputeTransferTx, NodeError>>;
    sendDefundTransferTx(params: OptionalPublicIdentifier<NodeParams.SendDefundTransferTx>): Promise<Result<NodeResponses.SendDefundTransferTx, NodeError>>;
    sendExitChannelTx(params: OptionalPublicIdentifier<NodeParams.SendExitChannelTx>): Promise<Result<NodeResponses.SendExitChannelTx, NodeError>>;
    syncDisputes(params: {}): Promise<Result<void, NodeError>>;
    once<T extends EngineEvent>(event: T, callback: (payload: EngineEventMap[T]) => void | Promise<void>, filter?: (payload: EngineEventMap[T]) => boolean, publicIdentifier?: string): void;
    on<T extends EngineEvent>(event: T, callback: (payload: EngineEventMap[T]) => void | Promise<void>, filter?: (payload: EngineEventMap[T]) => boolean, publicIdentifier?: string): void;
    off<T extends EngineEvent>(event: T, publicIdentifier?: string): void;
    waitFor<T extends EngineEvent>(event: T, timeout: number, filter?: (payload: EngineEventMap[T]) => boolean, publicIdentifier?: string): Promise<EngineEventMap[T] | undefined>;
}
//# sourceMappingURL=node.d.ts.map