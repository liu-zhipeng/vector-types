import { TransactionReceipt, TransactionRequest, TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ChainReaderEvent, ChainReaderEventMap } from ".";
import { Address, HexString } from "./basic";
import { Balance, FullChannelState, FullTransferState } from "./channel";
import { ChannelDispute } from "./dispute";
import { Result, Values, VectorError } from "./error";
import { ChainServiceEvent, ChainServiceEventMap } from "./event";
import { ChainProviders, HydratedProviders } from "./network";
import { RegisteredTransfer, TransferName, TransferState, WithdrawCommitmentJson } from "./transferDefinitions";
export declare const GAS_ESTIMATES: {
    createChannelAndDepositAlice: BigNumber;
    createChannel: BigNumber;
    depositAlice: BigNumber;
    depositBob: BigNumber;
    withdraw: BigNumber;
};
export declare const SIMPLE_WITHDRAWAL_GAS_ESTIMATE: BigNumber;
export declare const ERC20Abi: string[];
export declare class ChainError extends VectorError {
    readonly message: Values<typeof ChainError.reasons | typeof ChainError.retryableTxErrors> | string;
    readonly context: any;
    static readonly type = "ChainError";
    static readonly reasons: {
        ProviderNotFound: string;
        SignerNotFound: string;
        SenderNotInChannel: string;
        NegativeDepositAmount: string;
        NotEnoughFunds: string;
        FailedToDeploy: string;
        FailedToSendTx: string;
        TransferNotRegistered: string;
        MissingSigs: string;
        ResolverNeeded: string;
        NotInitialState: string;
        MultisigDeployed: string;
        TransferNotFound: string;
        TxAlreadyMined: string;
        TxNotFound: string;
        TxReverted: string;
        MaxGasPriceReached: string;
        ConfirmationTimeout: string;
        NonceExpired: string;
    };
    static readonly retryableTxErrors: {
        BadNonce: string;
        InvalidNonce: string;
        MissingHash: string;
        UnderpricedReplacement: string;
        AncientBlockSync: string;
        UnableToRent: string;
    };
    readonly canRetry: boolean;
    constructor(message: Values<typeof ChainError.reasons | typeof ChainError.retryableTxErrors> | string, context?: any);
}
export declare type ChainInfo = {
    name: string;
    chainId: number;
    shortName: string;
    chain: string;
    network: string;
    networkId: number;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    assetId: {
        [assetId: string]: {
            symbol: string;
            mainnetEquivalent: string;
        };
    };
    rpc: string[];
    faucets: string[];
    infoURL: string;
};
export declare type MinimalTransaction = {
    to: Address;
    value: BigNumberish;
    data: HexString;
};
export declare type MultisigTransaction = MinimalTransaction & {
    nonce: BigNumberish;
};
export interface IVectorChainReader {
    getTotalDepositedA(channelAddress: string, chainId: number, assetId: string): Promise<Result<BigNumber, ChainError>>;
    getTotalDepositedB(channelAddress: string, chainId: number, assetId: string): Promise<Result<BigNumber, ChainError>>;
    getChannelFactoryBytecode(channelFactoryAddress: string, chainId: number): Promise<Result<string, ChainError>>;
    getChannelMastercopyAddress(channelFactoryAddress: string, chainId: number): Promise<Result<string, ChainError>>;
    getChannelAddress(initiator: string, responder: string, channelFactoryAddress: string, chainId: number): Promise<Result<string, ChainError>>;
    getRegisteredTransferByName(name: TransferName, transferRegistry: string, chainId: number, bytecode?: string): Promise<Result<RegisteredTransfer, ChainError>>;
    getRegisteredTransferByDefinition(definition: Address, transferRegistry: string, chainId: number, bytecode?: string): Promise<Result<RegisteredTransfer, ChainError>>;
    getRegisteredTransfers(transferRegistry: string, chainId: number, bytecode?: string): Promise<Result<RegisteredTransfer[], ChainError>>;
    create(initialState: TransferState, balance: Balance, transferDefinition: string, transferRegistryAddress: string, chainId: number, bytecode?: string): Promise<Result<boolean, ChainError>>;
    resolve(transfer: FullTransferState, chainId: number, bytecode?: string): Promise<Result<Balance, ChainError>>;
    getCode(address: Address, chainId: number): Promise<Result<string, ChainError>>;
    getBlockNumber(chainId: number): Promise<Result<number, ChainError>>;
    getGasPrice(chainId: number): Promise<Result<BigNumber, ChainError>>;
    getOnchainBalance(assetId: string, balanceOf: string, chainId: number): Promise<Result<BigNumber, ChainError>>;
    getDecimals(assetId: string, chainId: number): Promise<Result<number, ChainError>>;
    getChainProviders(): Result<ChainProviders, ChainError>;
    getHydratedProviders(): Result<HydratedProviders, ChainError>;
    estimateGas(chainId: number, transaction: TransactionRequest): Promise<Result<BigNumber, ChainError>>;
    getTokenAllowance(tokenAddress: string, owner: string, spender: string, chainId: number): Promise<Result<BigNumber, ChainError>>;
    getChannelDispute(channelAddress: string, chainId: number): Promise<Result<ChannelDispute | undefined, ChainError>>;
    getSyncing(chainId: number): Promise<Result<boolean | {
        startingBlock: string;
        currentBlock: string;
        highestBlock: string;
    }, ChainError>>;
    getWithdrawalTransactionRecord(withdrawData: WithdrawCommitmentJson, channelAddress: string, chainId: number): Promise<Result<boolean, ChainError>>;
    registerChannel(channelAddress: string, chainId: number): Promise<Result<void, ChainError>>;
    on<T extends ChainReaderEvent>(event: T, callback: (payload: ChainReaderEventMap[T]) => void | Promise<void>, filter?: (payload: ChainReaderEventMap[T]) => boolean): void;
    once<T extends ChainReaderEvent>(event: T, callback: (payload: ChainReaderEventMap[T]) => void | Promise<void>, filter?: (payload: ChainReaderEventMap[T]) => boolean): void;
    off<T extends ChainReaderEvent>(event?: T): void;
    waitFor<T extends ChainReaderEvent>(event: T, timeout: number, filter?: (payload: ChainReaderEventMap[T]) => boolean): Promise<ChainReaderEventMap[T]>;
}
export declare type TransactionResponseWithResult = TransactionResponse & {
    completed: (confirmations?: number) => Promise<Result<TransactionReceipt, ChainError>>;
};
export interface IVectorChainService extends IVectorChainReader {
    sendDepositTx(channelState: FullChannelState, sender: string, amount: string, assetId: string): Promise<Result<TransactionReceipt, ChainError>>;
    sendWithdrawTx(channelState: FullChannelState, minTx: MinimalTransaction): Promise<Result<TransactionReceipt, ChainError>>;
    sendDeployChannelTx(channelState: FullChannelState, deposit?: {
        amount: string;
        assetId: string;
    }): Promise<Result<TransactionReceipt, ChainError>>;
    sendDisputeChannelTx(channelState: FullChannelState): Promise<Result<TransactionReceipt, ChainError>>;
    sendDefundChannelTx(channelState: FullChannelState): Promise<Result<TransactionReceipt, ChainError>>;
    sendDisputeTransferTx(transferIdToDispute: string, activeTransfers: FullTransferState[]): Promise<Result<TransactionReceipt, ChainError>>;
    sendDefundTransferTx(transferState: FullTransferState): Promise<Result<TransactionReceipt, ChainError>>;
    sendExitChannelTx(channelAddress: string, chainId: number, assetId: string, owner: string, recipient: string): Promise<Result<TransactionReceipt, ChainError>>;
    on<T extends ChainServiceEvent>(event: T, callback: (payload: ChainServiceEventMap[T]) => void | Promise<void>, filter?: (payload: ChainServiceEventMap[T]) => boolean): void;
    once<T extends ChainServiceEvent>(event: T, callback: (payload: ChainServiceEventMap[T]) => void | Promise<void>, filter?: (payload: ChainServiceEventMap[T]) => boolean): void;
    off<T extends ChainServiceEvent>(event?: T): void;
    waitFor<T extends ChainServiceEvent>(event: T, timeout: number, filter?: (payload: ChainServiceEventMap[T]) => boolean): Promise<ChainServiceEventMap[T]>;
}
//# sourceMappingURL=chain.d.ts.map