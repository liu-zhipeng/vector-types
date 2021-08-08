import { BigNumber } from '@ethersproject/bignumber';
import { Type } from '@sinclair/typebox';

const jsonifyError = (error) => {
    if (!!error.type) {
        return error.toJson();
    }
    return {
        message: error.message,
        type: error.name,
        context: {},
        stack: error.stack,
    };
};
class Result {
    constructor(error, value) {
        if (error) {
            this.isError = true;
            this.error = error;
        }
        else {
            this.isError = false;
            this.value = value;
        }
    }
    getValue() {
        if (this.isError) {
            throw new Error(`Can't getValue() of error result: ${this.error}`);
        }
        return this.value;
    }
    getError() {
        if (this.isError) {
            return this.error;
        }
        return undefined;
    }
    toJson() {
        if (!this.isError) {
            return { isError: false, value: this.value };
        }
        return {
            isError: true,
            error: jsonifyError(this.error),
        };
    }
    static fromJson(json) {
        if (!json.isError) {
            return Result.ok(json.value);
        }
        return json.error.type
            ? Result.fail(VectorError.fromJson(json.error))
            : Result.fail(json.error);
    }
    static fail(error) {
        return new Result(error);
    }
    static ok(result) {
        return new Result(undefined, result);
    }
}
class VectorError extends Error {
    constructor(msg, context = {}, type = "VectorError") {
        super(msg);
        this.msg = msg;
        this.context = context;
        this.type = type;
    }
    toJson() {
        return {
            message: this.msg,
            context: this.context,
            type: this.type,
            stack: this.stack,
        };
    }
    static fromJson(json) {
        var _a, _b, _c;
        return new VectorError(json.message, (_a = json.context) !== null && _a !== void 0 ? _a : {}, (_c = (_b = json.type) !== null && _b !== void 0 ? _b : json.name) !== null && _c !== void 0 ? _c : "VectorError");
    }
}
class MessagingError extends VectorError {
    constructor(message, context = {}, type = "MessagingError") {
        super(message, context, type);
        this.message = message;
        this.context = context;
        this.type = type;
    }
}
MessagingError.reasons = {
    Timeout: "Request timed out",
    Unknown: "Unknown messaging error",
};
class ProtocolError extends VectorError {
    constructor(msg, state, update, params, context = {}, type = "ProtocolError") {
        super(msg, Object.assign(Object.assign({}, context), { update, state, params }), type);
        this.msg = msg;
        this.type = type;
    }
}
class EngineError extends VectorError {
    constructor(msg, channelAddress, publicIdentifier, context = {}, type = "EngineError") {
        super(msg, Object.assign(Object.assign({}, context), { channelAddress, publicIdentifier }), type);
        this.msg = msg;
        this.type = type;
    }
}
class NodeError extends VectorError {
    constructor(msg, context = {}, type = "NodeError") {
        super(msg, Object.assign({}, context), type);
        this.msg = msg;
        this.type = type;
    }
}
class RouterError extends VectorError {
    constructor(msg, context = {}, type = "RouterError") {
        super(msg, Object.assign({}, context), type);
        this.msg = msg;
        this.type = type;
    }
}

const GAS_ESTIMATES = {
    createChannelAndDepositAlice: BigNumber.from(200000),
    createChannel: BigNumber.from(150000),
    depositAlice: BigNumber.from(85000),
    depositBob: BigNumber.from(50000),
    withdraw: BigNumber.from(95000),
};
const SIMPLE_WITHDRAWAL_GAS_ESTIMATE = BigNumber.from(100000);
const ERC20Abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function totalSupply() external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function transfer(address to, uint amount) returns (boolean)",
    "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
];
class ChainError extends VectorError {
    constructor(message, context = {}) {
        super(message, context, ChainError.type);
        this.message = message;
        this.context = context;
        this.canRetry = !!Object.values(ChainError.retryableTxErrors).find((msg) => msg.toLowerCase().includes(this.message.toLowerCase()) ||
            this.message.toLowerCase().includes(msg.toLowerCase()));
    }
}
ChainError.type = "ChainError";
ChainError.reasons = {
    ProviderNotFound: "Provider not found for chainId",
    SignerNotFound: "Signer not found for chainId",
    SenderNotInChannel: "Sender is not a channel participant",
    NegativeDepositAmount: "Cannot deposit a negative amount",
    NotEnoughFunds: "Not enough funds in wallet",
    FailedToDeploy: "Could not deploy vector channel",
    FailedToSendTx: "Failed to send transaction to chain",
    TransferNotRegistered: "Transfer not in registry",
    MissingSigs: "Channel state is not double signed",
    ResolverNeeded: "Transfer resolver must be provided in dispute",
    NotInitialState: "Transfer must be disputed with initial state",
    MultisigDeployed: "Multisig already deployed",
    TransferNotFound: "Transfer is not included in active transfers",
    TxAlreadyMined: "Tranasction already mined",
    TxNotFound: "Transaction not found",
    TxReverted: "Transaction reverted on chain",
    MaxGasPriceReached: "Max gas price reached",
    ConfirmationTimeout: "Timed out waiting for confirmation.",
    NonceExpired: "Failed to confirm a tx whose nonce had expired.",
};
ChainError.retryableTxErrors = {
    BadNonce: "the tx doesn't have the correct nonce",
    InvalidNonce: "Invalid nonce",
    MissingHash: "no transaction hash found in tx response",
    UnderpricedReplacement: "replacement transaction underpriced",
    AncientBlockSync: "Block information is incomplete while ancient",
    UnableToRent: "Unable to rent an instance of IEthModule",
};

const enumify = (x) => x;
const tidy = (str) => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;

const BalanceEncoding = tidy(`tuple(
    uint256[2] amount,
    address[2] to
  )`);
const WithdrawDataEncoding = tidy(`tuple(
    address channelAddress,
    address assetId,
    address recipient,
    uint256 amount,
    uint256 nonce,
    address callTo,
    bytes callData
  )`);

const UpdateType = {
    create: "create",
    deposit: "deposit",
    resolve: "resolve",
    setup: "setup",
};
var ChannelCommitmentTypes;
(function (ChannelCommitmentTypes) {
    ChannelCommitmentTypes[ChannelCommitmentTypes["ChannelState"] = 0] = "ChannelState";
    ChannelCommitmentTypes[ChannelCommitmentTypes["WithdrawData"] = 1] = "WithdrawData";
})(ChannelCommitmentTypes || (ChannelCommitmentTypes = {}));
const CoreChannelStateEncoding = tidy(`tuple(
  address channelAddress,
  address alice,
  address bob,
  address[] assetIds,
  ${BalanceEncoding}[] balances,
  uint256[] processedDepositsA,
  uint256[] processedDepositsB,
  uint256[] defundNonces,
  uint256 timeout,
  uint256 nonce,
  bytes32 merkleRoot
)`);
const CoreTransferStateEncoding = tidy(`tuple(
  address channelAddress,
  bytes32 transferId,
  address transferDefinition,
  address initiator,
  address responder,
  address assetId,
  ${BalanceEncoding} balance,
  uint256 transferTimeout,
  bytes32 initialStateHash
)`);

const DEFAULT_TRANSFER_TIMEOUT = 60 * 60 * 24;
const MINIMUM_TRANSFER_TIMEOUT = DEFAULT_TRANSFER_TIMEOUT / 2;
const MAXIMUM_TRANSFER_TIMEOUT = DEFAULT_TRANSFER_TIMEOUT * 2;
const DEFAULT_CHANNEL_TIMEOUT = DEFAULT_TRANSFER_TIMEOUT * 2;
const MINIMUM_CHANNEL_TIMEOUT = DEFAULT_CHANNEL_TIMEOUT / 2;
const MAXIMUM_CHANNEL_TIMEOUT = DEFAULT_CHANNEL_TIMEOUT * 7;
const DEFAULT_ROUTER_MAX_SAFE_PRICE_IMPACT = "15";
const TRANSFER_DECREMENT = 60 * 72;
const UINT_MAX = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").toString();
const ARBITRUM_TESTNET_1_CHAIN_ID = 152709604825713;
const AUTODEPLOY_CHAIN_IDS = [ARBITRUM_TESTNET_1_CHAIN_ID];
const DEFAULT_FEE_EXPIRY = 300000;
const NUM_CONFIRMATIONS = 10;
const CHAINS_WITH_ONE_CONFIRMATION = [1, 1337, 1338, 1340, 1341, 1342];
const getConfirmationsForChain = (chainId) => {
    return CHAINS_WITH_ONE_CONFIRMATION.includes(chainId) ? 1 : NUM_CONFIRMATIONS;
};
const ETH_READER_MAX_RETRIES = 5;
const NATS_CLUSTER_URL = "nats://nats1.connext.provide.network:4222,nats://nats2.connext.provide.network:4222,nats://nats3.connext.provide.network:4222";
const NATS_AUTH_URL = "https://messaging.fibswap.io";
const NATS_WS_URL = "wss://messaging.fibswap.io/ws-nats";

const ProtocolEventName = {
    CHANNEL_UPDATE_EVENT: "CHANNEL_UPDATE_EVENT",
};
const ChainReaderEvents = {
    CHANNEL_DISPUTED: "CHANNEL_DISPUTED",
    CHANNEL_DEFUNDED: "CHANNEL_DEFUNDED",
    TRANSFER_DISPUTED: "TRANSFER_DISPUTED",
    TRANSFER_DEFUNDED: "TRANSFER_DEFUNDED",
};
const ChainServiceEvents = Object.assign(Object.assign({}, ChainReaderEvents), { TRANSACTION_SUBMITTED: "TRANSACTION_SUBMITTED", TRANSACTION_MINED: "TRANSACTION_MINED", TRANSACTION_FAILED: "TRANSACTION_FAILED" });

const IS_ALIVE_EVENT = "IS_ALIVE";
const SETUP_EVENT = "SETUP";
const CONDITIONAL_TRANSFER_CREATED_EVENT = "CONDITIONAL_TRANSFER_CREATED";
const CONDITIONAL_TRANSFER_RESOLVED_EVENT = "CONDITIONAL_TRANSFER_RESOLVED";
const CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT = "CONDITIONAL_TRANSFER_ROUTING_COMPLETE";
const DEPOSIT_RECONCILED_EVENT = "DEPOSIT_RECONCILED";
const REQUEST_COLLATERAL_EVENT = "REQUEST_COLLATERAL";
const WITHDRAWAL_CREATED_EVENT = "WITHDRAWAL_CREATED";
const WITHDRAWAL_RESOLVED_EVENT = "WITHDRAWAL_RESOLVED";
const WITHDRAWAL_RECONCILED_EVENT = "WITHDRAWAL_RECONCILED";
const RESTORE_STATE_EVENT = "RESTORE_STATE_EVENT";
const EngineEvents = Object.assign({ [IS_ALIVE_EVENT]: IS_ALIVE_EVENT, [SETUP_EVENT]: SETUP_EVENT, [CONDITIONAL_TRANSFER_CREATED_EVENT]: CONDITIONAL_TRANSFER_CREATED_EVENT, [CONDITIONAL_TRANSFER_RESOLVED_EVENT]: CONDITIONAL_TRANSFER_RESOLVED_EVENT, [CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT]: CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT, [DEPOSIT_RECONCILED_EVENT]: DEPOSIT_RECONCILED_EVENT, [REQUEST_COLLATERAL_EVENT]: REQUEST_COLLATERAL_EVENT, [RESTORE_STATE_EVENT]: RESTORE_STATE_EVENT, [SETUP_EVENT]: SETUP_EVENT, [WITHDRAWAL_CREATED_EVENT]: WITHDRAWAL_CREATED_EVENT, [WITHDRAWAL_RESOLVED_EVENT]: WITHDRAWAL_RESOLVED_EVENT, [WITHDRAWAL_RECONCILED_EVENT]: WITHDRAWAL_RECONCILED_EVENT }, ChainServiceEvents);

const TAddress = Type.RegEx(/^0x[a-fA-F0-9]{40}$/);
const TIntegerString = Type.RegEx(/^([0-9])*$/);
const TDecimalString = Type.RegEx(/^[0-9]*\.?[0-9]*$/);
const TPublicIdentifier = Type.RegEx(/^vector([a-zA-Z0-9]{50})$/);
const TBytes32 = Type.RegEx(/^0x([a-fA-F0-9]{64})$/);
const TBytes = Type.RegEx(/^0x([a-fA-F0-9])$/);
const TSignature = Type.RegEx(/^0x([a-fA-F0-9]{130})$/);
const TUrl = Type.String({ format: "uri" });
const TChainId = Type.Number({ minimum: 1 });
const TBalance = Type.Object({
    to: Type.Array(TAddress),
    amount: Type.Array(TIntegerString),
});
const TVectorErrorJson = Type.Object({
    message: Type.String(),
    context: Type.Dict(Type.Any()),
    type: Type.String(),
    stack: Type.Optional(Type.String()),
});
const TBasicMeta = Type.Optional(Type.Dict(Type.Any()));
const TTransferMeta = Type.Intersect([
    Type.Object({
        createdAt: Type.Number(),
        resolvedAt: Type.Optional(Type.Number()),
    }),
    Type.Dict(Type.Any()),
]);
const TContractAddresses = Type.Object({
    channelFactoryAddress: TAddress,
    transferRegistryAddress: TAddress,
});
const TNetworkContext = Type.Intersect([
    TContractAddresses,
    Type.Object({
        chainId: TChainId,
    }),
]);
const AllowedSwapSchema = Type.Object({
    fromChainId: TChainId,
    toChainId: TChainId,
    fromAssetId: TAddress,
    toAssetId: TAddress,
    priceType: Type.Union([Type.Literal("hardcoded")]),
    hardcodedRate: TDecimalString,
    rebalancerUrl: Type.Optional(Type.String({ format: "uri" })),
    rebalanceThresholdPct: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
    percentageFee: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
    flatFee: Type.Optional(TIntegerString),
    gasSubsidyPercentage: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
});
const TransferStateSchema = Type.Dict(Type.Any());
const TransferResolverSchema = Type.Any();
const TransferEncodingSchema = Type.Array(Type.String(), { maxItems: 2, minItems: 2 });
const TransferNameSchema = Type.String();
const TFullTransferState = Type.Object({
    balance: TBalance,
    assetId: TAddress,
    channelAddress: TAddress,
    inDispute: Type.Boolean(),
    transferId: TBytes32,
    transferDefinition: TAddress,
    transferTimeout: TIntegerString,
    initialStateHash: TBytes32,
    initiator: TAddress,
    responder: TAddress,
    channelFactoryAddress: TAddress,
    chainId: TChainId,
    transferEncodings: TransferEncodingSchema,
    transferState: TransferStateSchema,
    transferResolver: Type.Optional(TransferResolverSchema),
    meta: TTransferMeta,
    channelNonce: Type.Integer({ minimum: 1 }),
    initiatorIdentifier: TPublicIdentifier,
    responderIdentifier: TPublicIdentifier,
});
const TSetupUpdateDetails = Type.Object({
    timeout: TIntegerString,
    networkContext: TNetworkContext,
    meta: TBasicMeta,
});
const TDepositUpdateDetails = Type.Object({
    totalDepositsAlice: TIntegerString,
    totalDepositsBob: TIntegerString,
    meta: TBasicMeta,
});
const TCreateUpdateDetails = Type.Object({
    transferId: TBytes32,
    balance: TBalance,
    transferDefinition: TAddress,
    transferTimeout: TIntegerString,
    transferInitialState: TransferStateSchema,
    transferEncodings: TransferEncodingSchema,
    merkleProofData: Type.Array(Type.String()),
    merkleRoot: TBytes32,
    meta: TBasicMeta,
});
const TResolveUpdateDetails = Type.Object({
    transferId: TBytes32,
    transferDefinition: TAddress,
    transferResolver: TransferResolverSchema,
    merkleRoot: TBytes32,
    meta: TBasicMeta,
});
const TChannelUpdateDetails = Type.Union([
    TSetupUpdateDetails,
    TDepositUpdateDetails,
    TCreateUpdateDetails,
    TResolveUpdateDetails,
]);
const TChannelUpdateType = Type.Union(Object.values(UpdateType).map((update) => Type.Literal(update)));
const TChannelUpdate = Type.Object({
    channelAddress: TAddress,
    fromIdentifier: TPublicIdentifier,
    toIdentifier: TPublicIdentifier,
    type: TChannelUpdateType,
    nonce: Type.Number(),
    balance: TBalance,
    assetId: TAddress,
    details: Type.Dict(Type.Any()),
    aliceSignature: Type.Optional(Type.Union([TSignature, Type.Null()])),
    bobSignature: Type.Optional(Type.Union([TSignature, Type.Null()])),
});
const TFullChannelState = Type.Object({
    assetIds: Type.Array(TAddress, { minItems: 1 }),
    balances: Type.Array(TBalance, { minItems: 1 }),
    channelAddress: TAddress,
    alice: TAddress,
    bob: TAddress,
    merkleRoot: TBytes,
    nonce: Type.Number(),
    processedDepositsA: Type.Array(TIntegerString),
    processedDepositsB: Type.Array(TIntegerString),
    timeout: TIntegerString,
    aliceIdentifier: TPublicIdentifier,
    bobIdentifier: TPublicIdentifier,
    latestUpdate: TChannelUpdate,
    networkContext: TNetworkContext,
    defundNonces: Type.Array(TIntegerString),
    inDispute: Type.Boolean(),
});
const TransferQuoteSchema = Type.Object({
    routerIdentifier: TPublicIdentifier,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    recipient: TPublicIdentifier,
    recipientChainId: TChainId,
    recipientAssetId: TAddress,
    fee: TIntegerString,
    expiry: TIntegerString,
    signature: Type.Optional(TSignature),
});
const WithdrawalQuoteSchema = Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    fee: TIntegerString,
    expiry: TIntegerString,
    signature: Type.Optional(TSignature),
});
const TransferDisputeSchema = Type.Object({
    transferId: TBytes32,
    transferStateHash: TBytes32,
    transferDisputeExpiry: TIntegerString,
    isDefunded: Type.Boolean(),
});
const ChannelDisputeSchema = Type.Object({
    channelStateHash: TBytes32,
    nonce: TIntegerString,
    merkleRoot: TBytes32,
    consensusExpiry: TIntegerString,
    defundExpiry: TIntegerString,
});

const ApproveParamsSchema = Type.Object({
    amount: TIntegerString,
    assetId: TAddress,
    signer: TAddress,
    fromProvider: Type.String({ format: "uri" }),
    toProvider: Type.String({ format: "uri" }),
    fromChainId: TChainId,
    toChainId: TChainId,
});
const ApproveResponseSchema = {
    200: Type.Object({
        allowance: Type.String(),
        transaction: Type.Optional(Type.Object({
            to: Type.String(),
            data: Type.String(),
        })),
    }),
};
const ExecuteParamsSchema = ApproveParamsSchema;
const ExecuteResponseSchema = {
    200: Type.Object({
        transaction: Type.Optional(Type.Object({
            to: Type.String(),
            data: Type.String(),
        })),
    }),
};
const CheckStatusParamsSchema = Type.Object({
    txHash: TBytes32,
    fromProvider: Type.String({ format: "uri" }),
    toProvider: Type.String({ format: "uri" }),
    fromChainId: TChainId,
    toChainId: TChainId,
    signer: TAddress,
});
const CheckStatusResponseSchema = {
    200: Type.Object({
        status: Type.Object({ completed: Type.Boolean() }),
        transaction: Type.Optional(Type.Object({
            to: Type.String(),
            data: Type.String(),
        })),
    }),
};

const VectorNodeConfigSchema = Type.Object({
    adminToken: Type.String(),
    authUrl: Type.Optional(Type.String({ format: "uri" })),
    chainAddresses: Type.Dict(TContractAddresses),
    chainProviders: Type.Dict(TUrl),
    dbUrl: Type.Optional(TUrl),
    logLevel: Type.Optional(Type.Union([
        Type.Literal("fatal"),
        Type.Literal("error"),
        Type.Literal("warn"),
        Type.Literal("info"),
        Type.Literal("debug"),
        Type.Literal("trace"),
        Type.Literal("silent"),
    ])),
    messagingUrl: Type.Optional(TUrl),
    mnemonic: Type.Optional(Type.String()),
    natsUrl: Type.Optional(TUrl),
    skipCheckIn: Type.Optional(Type.Boolean()),
    baseGasSubsidyPercentage: Type.Number({ minimum: 0, maximum: 100 }),
});

const ChannelRpcMethods = {
    chan_signUtilityMessage: "chan_signUtilityMessage",
    chan_getConfig: "chan_getConfig",
    chan_getRouterConfig: "chan_getRouterConfig",
    chan_getTransferQuote: "chan_getTransferQuote",
    chan_getWithdrawalQuote: "chan_getWithdrawalQuote",
    chan_getStatus: "chan_getStatus",
    chan_getChannelState: "chan_getChannelState",
    chan_getChannelStateByParticipants: "chan_getChannelStateByParticipants",
    chan_getChannelStates: "chan_getChannelStates",
    chan_getTransferStateByRoutingId: "chan_getTransferStateByRoutingId",
    chan_getTransferStatesByRoutingId: "chan_getTransferStatesByRoutingId",
    chan_getActiveTransfers: "chan_getActiveTransfers",
    chan_getRegisteredTransfers: "chan_getRegisteredTransfers",
    chan_getTransferState: "chan_getTransferState",
    chan_getTransfers: "chan_getTransfers",
    chan_getWithdrawalCommitment: "chan_getWithdrawalCommitment",
    chan_getWithdrawalCommitmentByTransactionHash: "chan_getWithdrawalCommitmentByTransactionHash",
    chan_setup: "chan_setup",
    chan_sendIsAlive: "chan_sendIsAlive",
    chan_requestSetup: "chan_requestSetup",
    chan_deposit: "chan_deposit",
    chan_requestCollateral: "chan_requestCollateral",
    chan_createTransfer: "chan_createTransfer",
    chan_resolveTransfer: "chan_resolveTransfer",
    chan_restoreState: "chan_restoreState",
    chan_withdraw: "chan_withdraw",
    chan_withdrawRetry: "chan_withdrawRetry",
    chan_addTransactionToCommitment: "chan_addTransactionToCommitment",
    chan_subscribe: "chan_subscribe",
    chan_unsubscribeAll: "chan_unsubscribeAll",
    connext_authenticate: "connext_authenticate",
    chan_dispute: "chan_dispute",
    chan_defund: "chan_defund",
    chan_getDispute: "chan_getDispute",
    chan_disputeTransfer: "chan_disputeTransfer",
    chan_defundTransfer: "chan_defundTransfer",
    chan_getTransferDispute: "chan_getTransferDispute",
    chan_exit: "chan_exit",
    chan_syncDisputes: "chan_syncDisputes",
    chan_decrypt: "chan_decrypt",
    chan_subscription: "chan_subscription",
};

const GetWithdrawalQuoteParamsSchema = Type.Object({
    amount: TIntegerString,
    assetId: TAddress,
    channelAddress: TAddress,
    receiveExactAmount: Type.Optional(Type.Boolean()),
});
const GetTransferQuoteParamsSchema = Type.Object({
    routerIdentifier: TPublicIdentifier,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    recipient: Type.Optional(TPublicIdentifier),
    recipientChainId: Type.Optional(TChainId),
    recipientAssetId: Type.Optional(TAddress),
    receiveExactAmount: Type.Optional(Type.Boolean()),
});
const GetRouterConfigParamsSchema$1 = Type.Object({
    routerIdentifier: TPublicIdentifier,
});
const GetTransferStateByRoutingIdParamsSchema$1 = Type.Object({
    channelAddress: TAddress,
    routingId: TBytes32,
});
const GetTransferStatesByRoutingIdParamsSchema$1 = Type.Object({
    routingId: TBytes32,
});
const GetChannelStateParamsSchema$1 = Type.Object({ channelAddress: TAddress });
const GetChannelStatesParamsSchema$1 = Type.Object({});
const GetChannelStateByParticipantsParamsSchema$1 = Type.Object({
    alice: TPublicIdentifier,
    bob: TPublicIdentifier,
    chainId: TChainId,
});
const GetActiveTransfersParamsSchema = Type.Object({
    channelAddress: TAddress,
});
const GetTransferStateParamsSchema$1 = Type.Object({
    transferId: TBytes32,
});
const GetTransfersFilterOptsSchema = Type.Object({
    channelAddress: Type.Optional(TAddress),
    startDate: Type.Optional(Type.Any()),
    endDate: Type.Optional(Type.Any()),
    active: Type.Optional(Type.Boolean()),
    routingId: Type.Optional(TBytes32),
    transferDefinition: Type.Optional(TAddress),
});
const GetTransfersParamsSchema$1 = Type.Object({
    filterOpts: Type.Optional(GetTransfersFilterOptsSchema),
});
const GetRegisteredTransfersParamsSchema$1 = Type.Object({
    chainId: TChainId,
});
const GetWithdrawalCommitmentParamsSchema$1 = Type.Object({
    transferId: TBytes32,
});
const GetWithdrawalCommitmentByTransactionHashParamsSchema$1 = Type.Object({
    transactionHash: TBytes32,
});
const SetupEngineParamsSchema = Type.Object({
    counterpartyIdentifier: TPublicIdentifier,
    chainId: TChainId,
    timeout: Type.Optional(TIntegerString),
    meta: Type.Optional(TBasicMeta),
});
const DepositEngineParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    meta: Type.Optional(TBasicMeta),
});
const RequestCollateralEngineParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    amount: Type.Optional(TIntegerString),
});
const CreateConditionalTransferParamsSchema = Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    recipient: Type.Optional(TPublicIdentifier),
    recipientChainId: Type.Optional(TChainId),
    recipientAssetId: Type.Optional(TAddress),
    timeout: Type.Optional(TIntegerString),
    meta: Type.Optional(TBasicMeta),
    type: Type.String(),
    details: Type.Dict(Type.Any()),
    quote: Type.Optional(TransferQuoteSchema),
});
const ResolveTransferParamsSchema = Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
    meta: Type.Optional(TBasicMeta),
    transferResolver: TransferResolverSchema,
});
const WithdrawParamsSchema = Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    recipient: TAddress,
    timeout: Type.Optional(TIntegerString),
    quote: Type.Optional(WithdrawalQuoteSchema),
    callTo: Type.Optional(TAddress),
    callData: Type.Optional(Type.String()),
    meta: Type.Optional(TBasicMeta),
    initiatorSubmits: Type.Optional(Type.Boolean()),
});
const WithdrawRetryParamsSchema = Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
});
const AddTransactionToCommitmentParamsSchema = Type.Object({
    transactionHash: TBytes32,
    channelAddress: TAddress,
    transferId: TBytes32,
});
const DisputeChannelParamsSchema = Type.Object({
    channelAddress: TAddress,
});
const DefundChannelParamsSchema = Type.Object({
    channelAddress: TAddress,
});
const GetChannelDisputeParamsSchema$1 = Type.Object({
    channelAddress: TAddress,
});
const DisputeTransferParamsSchema = Type.Object({
    transferId: TBytes32,
});
const DefundTransferParamsSchema = Type.Object({
    transferId: TBytes32,
});
const GetTransferDisputeParamsSchema$1 = Type.Object({
    transferId: TBytes32,
});
const ExitChannelParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetIds: Type.Array(TAddress),
    recipient: Type.Optional(TAddress),
    owner: Type.Optional(TAddress),
});
const SignUtilityMessageParamsSchema = Type.Object({
    message: Type.String(),
});
const SendIsAliveParamsSchema = Type.Object({ channelAddress: TAddress, skipCheckIn: Type.Boolean() });
const RestoreStateParamsSchema = Type.Object({
    counterpartyIdentifier: TPublicIdentifier,
    chainId: TChainId,
});
const RpcRequestEngineParamsSchema = Type.Object({
    id: Type.Number({ minimum: 1 }),
    jsonrpc: Type.Literal("2.0"),
    method: Type.Union(Object.values(ChannelRpcMethods).map((methodName) => Type.Literal(methodName))),
    params: Type.Optional(Type.Any()),
});
var EngineParams;
(function (EngineParams) {
    EngineParams.RpcRequestSchema = RpcRequestEngineParamsSchema;
    EngineParams.GetRouterConfigSchema = GetRouterConfigParamsSchema$1;
    EngineParams.SignUtilityMessageSchema = SignUtilityMessageParamsSchema;
    EngineParams.SendIsAliveSchema = SendIsAliveParamsSchema;
    EngineParams.GetTransferStateByRoutingIdSchema = GetTransferStateByRoutingIdParamsSchema$1;
    EngineParams.GetTransferStatesByRoutingIdSchema = GetTransferStatesByRoutingIdParamsSchema$1;
    EngineParams.GetChannelStatesSchema = GetChannelStatesParamsSchema$1;
    EngineParams.GetChannelStateSchema = GetChannelStateParamsSchema$1;
    EngineParams.GetChannelStateByParticipantsSchema = GetChannelStateByParticipantsParamsSchema$1;
    EngineParams.GetActiveTransfersSchema = GetActiveTransfersParamsSchema;
    EngineParams.GetTransferStateSchema = GetTransferStateParamsSchema$1;
    EngineParams.GetTransfersSchema = GetTransfersParamsSchema$1;
    EngineParams.GetRegisteredTransfersSchema = GetRegisteredTransfersParamsSchema$1;
    EngineParams.GetWithdrawalCommitmentSchema = GetWithdrawalCommitmentParamsSchema$1;
    EngineParams.GetWithdrawalCommitmentByTransactionHashSchema = GetWithdrawalCommitmentByTransactionHashParamsSchema$1;
    EngineParams.SetupSchema = SetupEngineParamsSchema;
    EngineParams.RestoreStateSchema = RestoreStateParamsSchema;
    EngineParams.DepositSchema = DepositEngineParamsSchema;
    EngineParams.RequestCollateralSchema = RequestCollateralEngineParamsSchema;
    EngineParams.ConditionalTransferSchema = CreateConditionalTransferParamsSchema;
    EngineParams.ResolveTransferSchema = ResolveTransferParamsSchema;
    EngineParams.WithdrawSchema = WithdrawParamsSchema;
    EngineParams.WithdrawRetrySchema = WithdrawRetryParamsSchema;
    EngineParams.AddTransactionToCommitmentSchema = AddTransactionToCommitmentParamsSchema;
    EngineParams.DisputeChannelSchema = DisputeChannelParamsSchema;
    EngineParams.DefundChannelSchema = DefundChannelParamsSchema;
    EngineParams.GetChannelDisputeSchema = GetChannelDisputeParamsSchema$1;
    EngineParams.DisputeTransferSchema = DisputeTransferParamsSchema;
    EngineParams.DefundTransferSchema = DefundTransferParamsSchema;
    EngineParams.GetTransferDisputeSchema = GetTransferDisputeParamsSchema$1;
    EngineParams.ExitChannelSchema = ExitChannelParamsSchema;
    EngineParams.GetTransferQuoteSchema = GetTransferQuoteParamsSchema;
    EngineParams.GetWithdrawalQuoteSchema = GetWithdrawalQuoteParamsSchema;
})(EngineParams || (EngineParams = {}));

const BasicChannelServerResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
    }),
};
const BasicTransferServerResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        routingId: Type.Optional(TBytes32),
    }),
};
const PostWithdrawalQuoteParamsSchema = Type.Intersect([
    EngineParams.GetWithdrawalQuoteSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const PostWithdrawalQuoteResponseSchema = {
    200: WithdrawalQuoteSchema,
};
const PostTransferQuoteParamsSchema = Type.Intersect([
    EngineParams.GetTransferQuoteSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const PostTransferQuoteResponseSchema = {
    200: TransferQuoteSchema,
};
const GetRouterConfigParamsSchema = Type.Intersect([
    EngineParams.GetRouterConfigSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetRouterConfigResponseSchema = {
    200: Type.Object({
        supportedChains: Type.Array(TChainId),
        allowedSwaps: Type.Array(AllowedSwapSchema),
    }),
};
const GetTransferStateByRoutingIdParamsSchema = Type.Intersect([
    EngineParams.GetTransferStateByRoutingIdSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetTransferStateByRoutingIdResponseSchema = {
    200: Type.Union([Type.Undefined(), TFullTransferState]),
};
const GetTransferStatesByRoutingIdParamsSchema = Type.Intersect([
    EngineParams.GetTransferStatesByRoutingIdSchema,
    Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetTransferStatesByRoutingIdResponseSchema = {
    200: Type.Array(TFullTransferState),
};
const GetActiveTransfersByChannelAddressParamsSchema = Type.Intersect([
    EngineParams.GetActiveTransfersSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetActiveTransfersByChannelAddressResponseSchema = {
    200: Type.Array(TFullTransferState),
};
const GetTransferStateParamsSchema = Type.Intersect([
    EngineParams.GetTransferStateSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetTransferStateResponseSchema = {
    200: Type.Union([Type.Undefined(), TFullTransferState]),
};
const GetTransfersParamsSchema = Type.Object({ publicIdentifier: TPublicIdentifier });
const GetTransfersResponseSchema = {
    200: Type.Array(TFullTransferState),
};
const GetChannelStateParamsSchema = Type.Intersect([
    EngineParams.GetChannelStateSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelStateResponseSchema = {
    200: Type.Union([Type.Undefined(), TFullChannelState]),
};
const GetChannelStatesParamsSchema = Type.Intersect([
    EngineParams.GetChannelStatesSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelStatesResponseSchema = {
    200: Type.Array(TAddress),
};
const GetChannelStateByParticipantsParamsSchema = Type.Object({
    publicIdentifier: TPublicIdentifier,
    counterparty: TPublicIdentifier,
    chainId: TChainId,
});
const GetChannelStateByParticipantsResponseSchema = GetChannelStateResponseSchema;
const GetConfigResponseSchema = {
    200: Type.Array(Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        index: Type.Integer(),
        chainAddresses: Type.Dict(TContractAddresses),
    })),
};
const GetStatusResponseSchema = {
    200: Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        providerSyncing: Type.Dict(Type.Union([
            Type.Boolean(),
            Type.Object({
                startingBlock: Type.String(),
                currentBlock: Type.String(),
                highestBlock: Type.String(),
            }),
            Type.String(),
            Type.Undefined(),
        ])),
        version: Type.String(),
    }),
};
const GetListenerParamsSchema = Type.Object({
    eventName: Type.Union(Object.values(EngineEvents).map((e) => Type.Literal(e))),
    publicIdentifier: TPublicIdentifier,
});
const GetListenerResponseSchema = {
    200: Type.Object({ url: TUrl }),
};
const GetListenersParamsSchema = Type.Object({ publicIdentifier: TPublicIdentifier });
const GetListenersResponseSchema = {
    200: Type.Dict(TUrl),
};
const GetRegisteredTransfersParamsSchema = Type.Intersect([
    EngineParams.GetRegisteredTransfersSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetRegisteredTransfersResponseSchema = {
    200: Type.Array(Type.Object({
        name: Type.String(),
        stateEncoding: Type.String(),
        resolverEncoding: Type.String(),
        definition: TAddress,
        encodedCancel: Type.String(),
    })),
};
const GetWithdrawalCommitmentParamsSchema = Type.Intersect([
    EngineParams.GetWithdrawalCommitmentSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetWithdrawalCommitmentResponseSchema = {
    200: Type.Union([
        Type.Undefined(),
        Type.Object({
            aliceSignature: Type.Optional(TSignature),
            bobSignature: Type.Optional(TSignature),
            channelAddress: TAddress,
            alice: TAddress,
            bob: TAddress,
            recipient: TAddress,
            assetId: TAddress,
            amount: TIntegerString,
            nonce: TIntegerString,
            callTo: TAddress,
            callData: TBytes,
            transactionHash: Type.Optional(TBytes32),
        }),
    ]),
};
const GetWithdrawalCommitmentByTransactionHashParamsSchema = Type.Intersect([
    EngineParams.GetWithdrawalCommitmentByTransactionHashSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetWithdrawalCommitmentByTransactionHashResponseSchema = {
    200: Type.Union([
        Type.Undefined(),
        Type.Object({
            aliceSignature: Type.Optional(TSignature),
            bobSignature: Type.Optional(TSignature),
            channelAddress: TAddress,
            alice: TAddress,
            bob: TAddress,
            recipient: TAddress,
            assetId: TAddress,
            amount: TIntegerString,
            nonce: TIntegerString,
            callTo: TAddress,
            callData: TBytes,
            transactionHash: Type.Optional(TBytes32),
        }),
    ]),
};
const PostRegisterListenerBodySchema = Type.Object({
    publicIdentifier: TPublicIdentifier,
    events: Type.Dict(Type.String()),
});
const PostRegisterListenerResponseSchema = {
    200: Type.Object({
        message: Type.String(),
    }),
};
const PostSetupBodySchema = Type.Intersect([
    EngineParams.SetupSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSetupResponseSchema = BasicChannelServerResponseSchema;
const PostRequestSetupBodySchema = PostSetupBodySchema;
const PostRequestSetupResponseSchema = BasicChannelServerResponseSchema;
const PostDepositBodySchema = Type.Intersect([
    EngineParams.DepositSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostDepositResponseSchema = BasicChannelServerResponseSchema;
const PostRequestCollateralBodySchema = Type.Intersect([
    EngineParams.RequestCollateralSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostRequestCollateralResponseSchema = BasicChannelServerResponseSchema;
const PostSendDepositTxBodySchema = Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    publicIdentifier: TPublicIdentifier,
});
const PostSendDepositTxResponseSchema = {
    200: Type.Object({
        txHash: TBytes32,
    }),
};
const PostConditionalTransferBodySchema = Type.Intersect([
    EngineParams.ConditionalTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostConditionalTransferResponseSchema = BasicTransferServerResponseSchema;
const PostResolveTransferBodySchema = Type.Intersect([
    EngineParams.ResolveTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostResolveTransferResponseSchema = BasicTransferServerResponseSchema;
const PostWithdrawTransferBodySchema = Type.Intersect([
    EngineParams.WithdrawSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostWithdrawTransferResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        transactionHash: Type.Optional(TBytes32),
        transaction: Type.Object({
            to: TAddress,
            value: TIntegerString,
            data: Type.String(),
        }),
    }),
};
const PostWithdrawRetryTransferBodySchema = Type.Intersect([
    EngineParams.WithdrawRetrySchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostWithdrawRetryTransferResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        transactionHash: Type.Optional(TBytes32),
    }),
};
const PostAddTransactionToCommitmentTransferBodySchema = Type.Intersect([
    EngineParams.AddTransactionToCommitmentSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSignUtilityMessageBodySchema = Type.Intersect([
    EngineParams.SignUtilityMessageSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSignUtilityMessageResponseSchema = {
    200: Type.Object({
        signedMessage: Type.String(),
    }),
};
const PostRestoreStateBodySchema = Type.Intersect([
    EngineParams.RestoreStateSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostRestoreStateResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
    }),
};
const PostCreateNodeBodySchema = Type.Object({
    index: Type.Integer({ minimum: 0, maximum: 2147483647 }),
    mnemonic: Type.Optional(Type.String()),
    skipCheckIn: Type.Optional(Type.Boolean()),
});
const PostCreateNodeResponseSchema = {
    200: Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        index: Type.Integer(),
    }),
};
const PostAdminBodySchema = Type.Object({
    adminToken: Type.String({
        example: "cxt1234",
        description: "Admin token",
    }),
});
const PostAdminResponseSchema = {
    200: Type.Object({
        message: Type.String(),
    }),
};
const PostAdminSubmitWithdrawalsBodySchema = Type.Object({
    adminToken: Type.String(),
});
const PostAdminSubmitWithdrawalsResponseSchema = {
    200: Type.Dict(Type.Union([
        Type.Array(Type.Object({
            transactionHash: Type.String(),
            transferId: TBytes32,
            channelAddress: TAddress,
        })),
        Type.Object({
            message: Type.String(),
            type: Type.String(),
            context: Type.Dict(Type.Any()),
            stack: Type.String(),
        }),
    ])),
};
const GetChannelDisputeParamsSchema = Type.Intersect([
    EngineParams.GetChannelDisputeSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelDisputeResponseSchema = {
    200: Type.Union([Type.Undefined(), ChannelDisputeSchema]),
};
const PostSendDisputeChannelTxBodySchema = Type.Intersect([
    EngineParams.DisputeChannelSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDisputeChannelTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendDefundChannelTxBodySchema = Type.Intersect([
    EngineParams.DefundChannelSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDefundChannelTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const GetTransferDisputeParamsSchema = Type.Intersect([
    EngineParams.GetTransferDisputeSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetTransferDisputeResponseSchema = {
    200: Type.Union([Type.Undefined(), TransferDisputeSchema]),
};
const PostSendDisputeTransferTxBodySchema = Type.Intersect([
    EngineParams.DisputeTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDisputeTransferTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendDefundTransferTxBodySchema = Type.Intersect([
    EngineParams.DefundTransferSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDefundTransferTxResponseSchema = {
    200: Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendExitChannelTxBodySchema = Type.Intersect([
    EngineParams.ExitChannelSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendExitChannelTxResponseSchema = {
    200: Type.Array(Type.Object({
        assetId: TAddress,
        transactionHash: Type.Optional(TBytes32),
        error: Type.Optional(TVectorErrorJson),
    })),
};
const PostSendIsAliveBodySchema = Type.Intersect([
    EngineParams.SendIsAliveSchema,
    Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendIsAliveResponseSchema = {
    200: Type.Object({
        channelAddress: TAddress,
    }),
};
var NodeParams;
(function (NodeParams) {
    NodeParams.GetStatusSchema = Type.Object({});
    NodeParams.WithdrawalQuoteSchema = PostWithdrawalQuoteParamsSchema;
    NodeParams.TransferQuoteSchema = PostTransferQuoteParamsSchema;
    NodeParams.GetRouterConfigSchema = GetRouterConfigParamsSchema;
    NodeParams.GetTransferStateByRoutingIdSchema = GetTransferStateByRoutingIdParamsSchema;
    NodeParams.GetTransferStatesByRoutingIdSchema = GetTransferStatesByRoutingIdParamsSchema;
    NodeParams.GetTransferStateSchema = GetTransferStateParamsSchema;
    NodeParams.GetTransfersSchema = GetTransfersParamsSchema;
    NodeParams.GetActiveTransfersByChannelAddressSchema = GetActiveTransfersByChannelAddressParamsSchema;
    NodeParams.GetChannelStateSchema = GetChannelStateParamsSchema;
    NodeParams.GetChannelStatesSchema = GetChannelStatesParamsSchema;
    NodeParams.GetChannelStateByParticipantsSchema = GetChannelStateByParticipantsParamsSchema;
    NodeParams.GetListenerSchema = GetListenerParamsSchema;
    NodeParams.GetListenersSchema = GetListenersParamsSchema;
    NodeParams.GetRegisteredTransfersSchema = GetRegisteredTransfersParamsSchema;
    NodeParams.GetWithdrawalCommitmentSchema = GetWithdrawalCommitmentParamsSchema;
    NodeParams.GetWithdrawalCommitmentByTransactionHashSchema = GetWithdrawalCommitmentByTransactionHashParamsSchema;
    NodeParams.GetConfigSchema = Type.Object({});
    NodeParams.SetupSchema = PostSetupBodySchema;
    NodeParams.RequestSetupSchema = PostRequestSetupBodySchema;
    NodeParams.DepositSchema = PostDepositBodySchema;
    NodeParams.RequestCollateralSchema = PostRequestCollateralBodySchema;
    NodeParams.SendDepositTxSchema = PostSendDepositTxBodySchema;
    NodeParams.ConditionalTransferSchema = PostConditionalTransferBodySchema;
    NodeParams.ResolveTransferSchema = PostResolveTransferBodySchema;
    NodeParams.WithdrawSchema = PostWithdrawTransferBodySchema;
    NodeParams.WithdrawRetrySchema = PostWithdrawRetryTransferBodySchema;
    NodeParams.AddTransactionToCommitmentSchema = PostAddTransactionToCommitmentTransferBodySchema;
    NodeParams.RegisterListenerSchema = PostRegisterListenerBodySchema;
    NodeParams.SignUtilityMessageSchema = PostSignUtilityMessageBodySchema;
    NodeParams.RestoreStateSchema = PostRestoreStateBodySchema;
    NodeParams.AdminSchema = PostAdminBodySchema;
    NodeParams.CreateNodeSchema = PostCreateNodeBodySchema;
    NodeParams.GetChannelDisputeSchema = GetChannelDisputeParamsSchema;
    NodeParams.SendDisputeChannelTxSchema = PostSendDisputeChannelTxBodySchema;
    NodeParams.SendDefundChannelTxSchema = PostSendDefundChannelTxBodySchema;
    NodeParams.GetTransferDisputeSchema = GetTransferDisputeParamsSchema;
    NodeParams.SendDisputeTransferTxSchema = PostSendDisputeTransferTxBodySchema;
    NodeParams.SendDefundTransferTxSchema = PostSendDefundTransferTxBodySchema;
    NodeParams.SendExitChannelTxSchema = PostSendExitChannelTxBodySchema;
    NodeParams.SendIsAliveSchema = PostSendIsAliveBodySchema;
    NodeParams.SubmitWithdrawalsSchema = PostAdminSubmitWithdrawalsBodySchema;
})(NodeParams || (NodeParams = {}));
var NodeResponses;
(function (NodeResponses) {
    NodeResponses.WithdrawalQuoteSchema = PostWithdrawalQuoteResponseSchema;
    NodeResponses.TransferQuoteSchema = PostTransferQuoteResponseSchema;
    NodeResponses.GetRouterConfigSchema = GetRouterConfigResponseSchema;
    NodeResponses.GetTransferStateByRoutingIdSchema = GetTransferStateByRoutingIdResponseSchema;
    NodeResponses.GetTransferStatesByRoutingIdSchema = GetTransferStatesByRoutingIdResponseSchema;
    NodeResponses.GetTransferStateSchema = GetTransferStateResponseSchema;
    NodeResponses.GetTransfersSchema = GetTransfersResponseSchema;
    NodeResponses.GetActiveTransfersByChannelAddressSchema = GetActiveTransfersByChannelAddressResponseSchema;
    NodeResponses.GetChannelStateSchema = GetChannelStateResponseSchema;
    NodeResponses.GetChannelStateByParticipantsSchema = GetChannelStateByParticipantsResponseSchema;
    NodeResponses.GetChannelStatesSchema = GetChannelStatesResponseSchema;
    NodeResponses.GetListenerSchema = GetListenerResponseSchema;
    NodeResponses.GetListenersSchema = GetListenersResponseSchema;
    NodeResponses.GetConfigSchema = GetConfigResponseSchema;
    NodeResponses.GetStatusSchema = GetStatusResponseSchema;
    NodeResponses.GetRegisteredTransfersSchema = GetRegisteredTransfersResponseSchema;
    NodeResponses.GetWithdrawalCommitmentSchema = GetWithdrawalCommitmentResponseSchema;
    NodeResponses.GetWithdrawalCommitmentByTransactionHashSchema = GetWithdrawalCommitmentByTransactionHashResponseSchema;
    NodeResponses.SetupSchema = PostSetupResponseSchema;
    NodeResponses.RequestSetupSchema = PostRequestSetupResponseSchema;
    NodeResponses.DepositSchema = PostDepositResponseSchema;
    NodeResponses.RequestCollateralSchema = PostRequestCollateralResponseSchema;
    NodeResponses.SendDepositTxSchema = PostSendDepositTxResponseSchema;
    NodeResponses.ConditionalTransferSchema = PostConditionalTransferResponseSchema;
    NodeResponses.ResolveTransferSchema = PostResolveTransferResponseSchema;
    NodeResponses.WithdrawSchema = PostWithdrawTransferResponseSchema;
    NodeResponses.WithdrawRetrySchema = PostWithdrawRetryTransferResponseSchema;
    NodeResponses.RegisterListenerSchema = PostRegisterListenerResponseSchema;
    NodeResponses.SignUtilityMessageSchema = PostSignUtilityMessageResponseSchema;
    NodeResponses.RestoreStateSchema = PostRestoreStateResponseSchema;
    NodeResponses.AdminSchema = PostAdminResponseSchema;
    NodeResponses.CreateNodeSchema = PostCreateNodeResponseSchema;
    NodeResponses.GetChannelDisputeSchema = GetChannelDisputeResponseSchema;
    NodeResponses.SendDisputeChannelTxSchema = PostSendDisputeChannelTxResponseSchema;
    NodeResponses.SendDefundChannelTxSchema = PostSendDefundChannelTxResponseSchema;
    NodeResponses.GetTransferDisputeSchema = GetTransferDisputeResponseSchema;
    NodeResponses.SendDisputeTransferTxSchema = PostSendDisputeTransferTxResponseSchema;
    NodeResponses.SendDefundTransferTxSchema = PostSendDefundTransferTxResponseSchema;
    NodeResponses.SendExitChannelTxSchema = PostSendExitChannelTxResponseSchema;
    NodeResponses.SendIsAliveSchema = PostSendIsAliveResponseSchema;
    NodeResponses.SubmitWithdrawalsSchema = PostAdminSubmitWithdrawalsResponseSchema;
})(NodeResponses || (NodeResponses = {}));

const SetupProtocolParamsSchema = Type.Object({
    timeout: TIntegerString,
    networkContext: TNetworkContext,
    counterpartyIdentifier: TPublicIdentifier,
    meta: Type.Optional(TBasicMeta),
});
const DepositProtocolParamsSchema = Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    meta: Type.Optional(TBasicMeta),
});
const CreateProtocolParamsSchema = Type.Object({
    channelAddress: TAddress,
    balance: TBalance,
    assetId: TAddress,
    transferDefinition: TAddress,
    transferInitialState: TransferStateSchema,
    timeout: TIntegerString,
    meta: Type.Optional(TBasicMeta),
});
const ResolveProtocolParamsSchema = Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
    transferResolver: TransferResolverSchema,
    meta: Type.Optional(TBasicMeta),
});
var ProtocolParams;
(function (ProtocolParams) {
    ProtocolParams.SetupSchema = SetupProtocolParamsSchema;
    ProtocolParams.DepositSchema = DepositProtocolParamsSchema;
    ProtocolParams.CreateSchema = CreateProtocolParamsSchema;
    ProtocolParams.ResolveSchema = ResolveProtocolParamsSchema;
})(ProtocolParams || (ProtocolParams = {}));

const TPathSchema = Type.Object({
    recipient: TPublicIdentifier,
    recipientChainId: TChainId,
    recipientAssetId: TAddress,
});
const TRoutingMeta = Type.Object({
    routingId: TBytes32,
    requireOnline: Type.Boolean(),
    path: Type.Array(TPathSchema),
    quote: Type.Optional(TransferQuoteSchema),
});
var RouterSchemas;
(function (RouterSchemas) {
    RouterSchemas.RouterMeta = TRoutingMeta;
})(RouterSchemas || (RouterSchemas = {}));

const StoredTransactionStatus = {
    submitted: "submitted",
    mined: "mined",
    failed: "failed",
};
const TransactionReason = {
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
};

const HashlockTransferName = "HashlockTransfer";
const HashlockTransferStateEncoding = tidy(`tuple(
    bytes32 lockHash,
    uint256 expiry
  )`);
const HashlockTransferResolverEncoding = tidy(`tuple(
    bytes32 preImage
  )`);

const WithdrawName = "Withdraw";
const WithdrawStateEncoding = tidy(`tuple(
    bytes initiatorSignature,
    address initiator,
    address responder,
    bytes32 data,
    uint256 nonce,
    uint256 fee,
    address callTo,
    bytes callData
  )`);
const WithdrawResolverEncoding = tidy(`tuple(
    bytes responderSignature
  )`);
const WithdrawalQuoteEncoding = tidy(`tuple(
  address channelAddress,
  uint256 amount,
  address assetId,
  uint256 fee,
  uint256 expiry
)`);

const TransferNames = {
    [HashlockTransferName]: HashlockTransferName,
    [WithdrawName]: WithdrawName,
};
const TransferEncodingsMap = {
    [HashlockTransferName]: [HashlockTransferStateEncoding, HashlockTransferResolverEncoding],
    [WithdrawName]: [WithdrawStateEncoding, WithdrawResolverEncoding],
};
const TransferQuoteEncoding = tidy(`tuple(
  string routerIdentifier,
  uint256 amount,
  address assetId,
  uint256 chainId,
  string recipient,
  uint256 recipientChainId,
  address recipientAssetId,
  uint256 fee,
  uint256 expiry
)`);

export { ARBITRUM_TESTNET_1_CHAIN_ID, AUTODEPLOY_CHAIN_IDS, AllowedSwapSchema, ApproveParamsSchema, ApproveResponseSchema, BalanceEncoding, CHAINS_WITH_ONE_CONFIRMATION, CONDITIONAL_TRANSFER_CREATED_EVENT, CONDITIONAL_TRANSFER_RESOLVED_EVENT, CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT, ChainError, ChainReaderEvents, ChainServiceEvents, ChannelCommitmentTypes, ChannelDisputeSchema, ChannelRpcMethods, CheckStatusParamsSchema, CheckStatusResponseSchema, CoreChannelStateEncoding, CoreTransferStateEncoding, DEFAULT_CHANNEL_TIMEOUT, DEFAULT_FEE_EXPIRY, DEFAULT_ROUTER_MAX_SAFE_PRICE_IMPACT, DEFAULT_TRANSFER_TIMEOUT, DEPOSIT_RECONCILED_EVENT, ERC20Abi, ETH_READER_MAX_RETRIES, EngineError, EngineEvents, EngineParams, ExecuteParamsSchema, ExecuteResponseSchema, GAS_ESTIMATES, GetTransfersFilterOptsSchema, HashlockTransferName, HashlockTransferResolverEncoding, HashlockTransferStateEncoding, IS_ALIVE_EVENT, MAXIMUM_CHANNEL_TIMEOUT, MAXIMUM_TRANSFER_TIMEOUT, MINIMUM_CHANNEL_TIMEOUT, MINIMUM_TRANSFER_TIMEOUT, MessagingError, NATS_AUTH_URL, NATS_CLUSTER_URL, NATS_WS_URL, NUM_CONFIRMATIONS, NodeError, NodeParams, NodeResponses, ProtocolError, ProtocolEventName, ProtocolParams, REQUEST_COLLATERAL_EVENT, RESTORE_STATE_EVENT, Result, RouterError, RouterSchemas, SETUP_EVENT, SIMPLE_WITHDRAWAL_GAS_ESTIMATE, StoredTransactionStatus, TAddress, TBalance, TBasicMeta, TBytes, TBytes32, TChainId, TChannelUpdate, TChannelUpdateDetails, TChannelUpdateType, TContractAddresses, TCreateUpdateDetails, TDecimalString, TDepositUpdateDetails, TFullChannelState, TFullTransferState, TIntegerString, TNetworkContext, TPublicIdentifier, TRANSFER_DECREMENT, TResolveUpdateDetails, TSetupUpdateDetails, TSignature, TTransferMeta, TUrl, TVectorErrorJson, TransactionReason, TransferDisputeSchema, TransferEncodingSchema, TransferEncodingsMap, TransferNameSchema, TransferNames, TransferQuoteEncoding, TransferQuoteSchema, TransferResolverSchema, TransferStateSchema, UINT_MAX, UpdateType, VectorError, VectorNodeConfigSchema, WITHDRAWAL_CREATED_EVENT, WITHDRAWAL_RECONCILED_EVENT, WITHDRAWAL_RESOLVED_EVENT, WithdrawDataEncoding, WithdrawName, WithdrawResolverEncoding, WithdrawStateEncoding, WithdrawalQuoteEncoding, WithdrawalQuoteSchema, enumify, getConfirmationsForChain, jsonifyError, tidy };
