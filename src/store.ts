import { TransactionReceipt, TransactionResponse } from "@ethersproject/abstract-provider";

import { WithdrawCommitmentJson } from "./transferDefinitions/withdraw";
import { FullTransferState, FullChannelState } from "./channel";
import { Address } from "./basic";
import { ChannelDispute, TransferDispute } from "./dispute";
import { GetTransfersFilterOpts } from "./schemas/engine";
import { EngineEvent } from ".";

export interface IVectorStore {
  // Store management methods
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getSchemaVersion(): Promise<number | undefined>;
  updateSchemaVersion(version?: number): Promise<void>;
  clear(): Promise<void>;

  // Getters
  getChannelStates(): Promise<FullChannelState[]>;
  getChannelState(channelAddress: string): Promise<FullChannelState | undefined>;
  getChannelStateByParticipants(
    publicIdentifierA: string,
    publicIdentifierB: string,
    chainId: number,
  ): Promise<FullChannelState | undefined>;
  // Should return all initial transfer state data needed to
  // create the merkle root
  getActiveTransfers(channelAddress: string): Promise<FullTransferState[]>;
  getTransferState(transferId: string): Promise<FullTransferState | undefined>;
  getTransfers(filterOpts?: GetTransfersFilterOpts): Promise<FullTransferState[]>;

  // Setters
  saveChannelState(channelState: FullChannelState, transfer?: FullTransferState): Promise<void>;

  /**
   * Saves information about a channel dispute from the onchain record
   * @param channelAddress multisig address of channel
   * @param channelDispute record of dispute corresponding to channelAddress
   * @param disputedChannel channel state that was disputed onchain, may not be the same as what is otherwise stored. Will be undefined if you did not get the information about the dispute from events, but instead got them from querying the chain (ccs not stored onchain)
   */
  saveChannelDispute(channelAddress: string, channelDispute: ChannelDispute): Promise<void>;

  /**
   * Returns stored record of channel dispute or undefined iff doesn't exist
   * @param channelAddress channel address of disputed channel
   */
  getChannelDispute(channelAddress: string): Promise<ChannelDispute | undefined>;

  /**
   * Stores information about a transfer dispute from chain
   * @param channelAddress address of the channel
   * @param transferDispute record of dispute corresponding to disputedTransfer
   * @param disputedTransfer transfer state that was disputed onchain, may not be the same as what is otherwise stored. Will be undefined if you did not get the information about the dispute from events, but instead got them from querying the chain (ccs not stored onchain)
   */
  saveTransferDispute(channelAddress: string, transferDispute: TransferDispute): Promise<void>;

  /**
   * Returns stored record of transfer dispute or undefined iff doesn't exist
   * @param transferId Transfer id of disputed transfer
   */
  getTransferDispute(transferId: string): Promise<TransferDispute | undefined>;
}

export const StoredTransactionStatus = {
  submitted: "submitted",
  mined: "mined",
  failed: "failed",
} as const;
export type StoredTransactionStatus = keyof typeof StoredTransactionStatus;

export const TransactionReason = {
  allowance: "allowance",
  approveTokens: "approveTokens",
  disputeChannel: "disputeChannel",
  disputeTransfer: "disputeTransfer",
  defundChannel: "defundChannel",
  defundTransfer: "defundTransfer",
  depositA: "depositA",
  depositB: "depositB",
  deploy: "deploy",
  deployWithDepositAlice: "deployWithDepositAlice",
  exitChannel: "exitChannel",
  speedUpTransaction: "speedUpTransaction",
  transferTokens: "transferTokens",
  withdraw: "withdraw",
} as const;
export type TransactionReason = keyof typeof TransactionReason;

export type StoredTransactionAttempt = {
  // TransactionResponse fields (defined when submitted)
  transactionHash: string;
  gasLimit: string;
  gasPrice: string;
  createdAt: Date;
};

export type StoredTransactionReceipt = {
  // TransactionReceipt fields (defined when mined)
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

export type StoredTransaction = {
  id: string;

  //// Helper fields
  channelAddress: string;
  status: StoredTransactionStatus;
  reason: TransactionReason;
  error?: string;

  //// Provider fields
  // Minimum fields (should always be defined)
  to: Address;
  from: Address;
  data: string;
  value: string;
  chainId: number;
  nonce: number;

  // TransactionRequest fields (defined when tx populated)
  attempts: StoredTransactionAttempt[];
  receipt?: StoredTransactionReceipt;
};

export interface IChainServiceStore {
  // Store management methods
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  clear(): Promise<void>;

  // Getters
  getTransactionById(onchainTransactionId: string): Promise<StoredTransaction | undefined>;
  getActiveTransactions(): Promise<StoredTransaction[]>;

  // Setters
  saveTransactionAttempt(
    onchainTransactionId: string,
    channelAddress: string,
    reason: TransactionReason,
    response: TransactionResponse,
  ): Promise<void>;
  saveTransactionReceipt(onchainTransactionId: string, transaction: TransactionReceipt): Promise<void>;
  saveTransactionFailure(onchainTransactionId: string, error: string, receipt?: TransactionReceipt): Promise<void>;
}

export interface IEngineStore extends IVectorStore, IChainServiceStore {
  // Getters
  getWithdrawalCommitment(transferId: string): Promise<WithdrawCommitmentJson | undefined>;
  getWithdrawalCommitmentByTransactionHash(transactionHash: string): Promise<WithdrawCommitmentJson | undefined>;
  getUnsubmittedWithdrawals(
    channelAddress: string,
    withdrawalDefinition: string,
  ): Promise<{ commitment: WithdrawCommitmentJson; transfer: FullTransferState }[]>;

  // NOTE: The engine does *not* care about the routingId (it is stored
  // in the meta of transfer objects), only the router module does.
  // However, because the engine fills in basic routing metas using sane
  // defaults, it should also be responsible for providing an easy-access
  // method for higher level modules
  getTransferByRoutingId(channelAddress: string, routingId: string): Promise<FullTransferState | undefined>;

  getTransfersByRoutingId(routingId: string): Promise<FullTransferState[]>;

  // Setters
  saveWithdrawalCommitment(transferId: string, withdrawCommitment: WithdrawCommitmentJson): Promise<void>;
  // Used for restore
  saveChannelStateAndTransfers(channelState: FullChannelState, activeTransfers: FullTransferState[]): Promise<void>;
}

export interface IServerNodeStore extends IEngineStore {
  registerSubscription<T extends EngineEvent>(publicIdentifier: string, event: T, url: string): Promise<void>;
  getSubscription<T extends EngineEvent>(publicIdentifier: string, event: T): Promise<string | undefined>;
  getSubscriptions(publicIdentifier: string): Promise<{ [event: string]: string }>;
  setNodeIndex(index: number, publicIdentifier: string): Promise<void>;
  getNodeIndexes(): Promise<{ index: number; publicIdentifier: string }[]>;
  removeNodeIndexes(): Promise<void>;
}
