'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bignumber = require('@ethersproject/bignumber');
var typebox = require('@sinclair/typebox');

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
    createChannelAndDepositAlice: bignumber.BigNumber.from(200000),
    createChannel: bignumber.BigNumber.from(150000),
    depositAlice: bignumber.BigNumber.from(85000),
    depositBob: bignumber.BigNumber.from(50000),
    withdraw: bignumber.BigNumber.from(95000),
};
const SIMPLE_WITHDRAWAL_GAS_ESTIMATE = bignumber.BigNumber.from(100000);
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
exports.ChannelCommitmentTypes = void 0;
(function (ChannelCommitmentTypes) {
    ChannelCommitmentTypes[ChannelCommitmentTypes["ChannelState"] = 0] = "ChannelState";
    ChannelCommitmentTypes[ChannelCommitmentTypes["WithdrawData"] = 1] = "WithdrawData";
})(exports.ChannelCommitmentTypes || (exports.ChannelCommitmentTypes = {}));
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
const UINT_MAX = bignumber.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").toString();
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

const TAddress = typebox.Type.RegEx(/^0x[a-fA-F0-9]{40}$/);
const TIntegerString = typebox.Type.RegEx(/^([0-9])*$/);
const TDecimalString = typebox.Type.RegEx(/^[0-9]*\.?[0-9]*$/);
const TPublicIdentifier = typebox.Type.RegEx(/^vector([a-zA-Z0-9]{50})$/);
const TBytes32 = typebox.Type.RegEx(/^0x([a-fA-F0-9]{64})$/);
const TBytes = typebox.Type.RegEx(/^0x([a-fA-F0-9])$/);
const TSignature = typebox.Type.RegEx(/^0x([a-fA-F0-9]{130})$/);
const TUrl = typebox.Type.String({ format: "uri" });
const TChainId = typebox.Type.Number({ minimum: 1 });
const TBalance = typebox.Type.Object({
    to: typebox.Type.Array(TAddress),
    amount: typebox.Type.Array(TIntegerString),
});
const TVectorErrorJson = typebox.Type.Object({
    message: typebox.Type.String(),
    context: typebox.Type.Dict(typebox.Type.Any()),
    type: typebox.Type.String(),
    stack: typebox.Type.Optional(typebox.Type.String()),
});
const TBasicMeta = typebox.Type.Optional(typebox.Type.Dict(typebox.Type.Any()));
const TTransferMeta = typebox.Type.Intersect([
    typebox.Type.Object({
        createdAt: typebox.Type.Number(),
        resolvedAt: typebox.Type.Optional(typebox.Type.Number()),
    }),
    typebox.Type.Dict(typebox.Type.Any()),
]);
const TContractAddresses = typebox.Type.Object({
    channelFactoryAddress: TAddress,
    transferRegistryAddress: TAddress,
});
const TNetworkContext = typebox.Type.Intersect([
    TContractAddresses,
    typebox.Type.Object({
        chainId: TChainId,
    }),
]);
const AllowedSwapSchema = typebox.Type.Object({
    fromChainId: TChainId,
    toChainId: TChainId,
    fromAssetId: TAddress,
    toAssetId: TAddress,
    priceType: typebox.Type.Union([typebox.Type.Literal("hardcoded")]),
    hardcodedRate: TDecimalString,
    rebalancerUrl: typebox.Type.Optional(typebox.Type.String({ format: "uri" })),
    rebalanceThresholdPct: typebox.Type.Optional(typebox.Type.Number({ minimum: 0, maximum: 100 })),
    percentageFee: typebox.Type.Optional(typebox.Type.Number({ minimum: 0, maximum: 100 })),
    flatFee: typebox.Type.Optional(TIntegerString),
    gasSubsidyPercentage: typebox.Type.Optional(typebox.Type.Number({ minimum: 0, maximum: 100 })),
});
const TransferStateSchema = typebox.Type.Dict(typebox.Type.Any());
const TransferResolverSchema = typebox.Type.Any();
const TransferEncodingSchema = typebox.Type.Array(typebox.Type.String(), { maxItems: 2, minItems: 2 });
const TransferNameSchema = typebox.Type.String();
const TFullTransferState = typebox.Type.Object({
    balance: TBalance,
    assetId: TAddress,
    channelAddress: TAddress,
    inDispute: typebox.Type.Boolean(),
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
    transferResolver: typebox.Type.Optional(TransferResolverSchema),
    meta: TTransferMeta,
    channelNonce: typebox.Type.Integer({ minimum: 1 }),
    initiatorIdentifier: TPublicIdentifier,
    responderIdentifier: TPublicIdentifier,
});
const TSetupUpdateDetails = typebox.Type.Object({
    timeout: TIntegerString,
    networkContext: TNetworkContext,
    meta: TBasicMeta,
});
const TDepositUpdateDetails = typebox.Type.Object({
    totalDepositsAlice: TIntegerString,
    totalDepositsBob: TIntegerString,
    meta: TBasicMeta,
});
const TCreateUpdateDetails = typebox.Type.Object({
    transferId: TBytes32,
    balance: TBalance,
    transferDefinition: TAddress,
    transferTimeout: TIntegerString,
    transferInitialState: TransferStateSchema,
    transferEncodings: TransferEncodingSchema,
    merkleProofData: typebox.Type.Array(typebox.Type.String()),
    merkleRoot: TBytes32,
    meta: TBasicMeta,
});
const TResolveUpdateDetails = typebox.Type.Object({
    transferId: TBytes32,
    transferDefinition: TAddress,
    transferResolver: TransferResolverSchema,
    merkleRoot: TBytes32,
    meta: TBasicMeta,
});
const TChannelUpdateDetails = typebox.Type.Union([
    TSetupUpdateDetails,
    TDepositUpdateDetails,
    TCreateUpdateDetails,
    TResolveUpdateDetails,
]);
const TChannelUpdateType = typebox.Type.Union(Object.values(UpdateType).map((update) => typebox.Type.Literal(update)));
const TChannelUpdate = typebox.Type.Object({
    channelAddress: TAddress,
    fromIdentifier: TPublicIdentifier,
    toIdentifier: TPublicIdentifier,
    type: TChannelUpdateType,
    nonce: typebox.Type.Number(),
    balance: TBalance,
    assetId: TAddress,
    details: typebox.Type.Dict(typebox.Type.Any()),
    aliceSignature: typebox.Type.Optional(typebox.Type.Union([TSignature, typebox.Type.Null()])),
    bobSignature: typebox.Type.Optional(typebox.Type.Union([TSignature, typebox.Type.Null()])),
});
const TFullChannelState = typebox.Type.Object({
    assetIds: typebox.Type.Array(TAddress, { minItems: 1 }),
    balances: typebox.Type.Array(TBalance, { minItems: 1 }),
    channelAddress: TAddress,
    alice: TAddress,
    bob: TAddress,
    merkleRoot: TBytes,
    nonce: typebox.Type.Number(),
    processedDepositsA: typebox.Type.Array(TIntegerString),
    processedDepositsB: typebox.Type.Array(TIntegerString),
    timeout: TIntegerString,
    aliceIdentifier: TPublicIdentifier,
    bobIdentifier: TPublicIdentifier,
    latestUpdate: TChannelUpdate,
    networkContext: TNetworkContext,
    defundNonces: typebox.Type.Array(TIntegerString),
    inDispute: typebox.Type.Boolean(),
});
const TransferQuoteSchema = typebox.Type.Object({
    routerIdentifier: TPublicIdentifier,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    recipient: TPublicIdentifier,
    recipientChainId: TChainId,
    recipientAssetId: TAddress,
    fee: TIntegerString,
    expiry: TIntegerString,
    signature: typebox.Type.Optional(TSignature),
});
const WithdrawalQuoteSchema = typebox.Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    fee: TIntegerString,
    expiry: TIntegerString,
    signature: typebox.Type.Optional(TSignature),
});
const TransferDisputeSchema = typebox.Type.Object({
    transferId: TBytes32,
    transferStateHash: TBytes32,
    transferDisputeExpiry: TIntegerString,
    isDefunded: typebox.Type.Boolean(),
});
const ChannelDisputeSchema = typebox.Type.Object({
    channelStateHash: TBytes32,
    nonce: TIntegerString,
    merkleRoot: TBytes32,
    consensusExpiry: TIntegerString,
    defundExpiry: TIntegerString,
});

const ApproveParamsSchema = typebox.Type.Object({
    amount: TIntegerString,
    assetId: TAddress,
    signer: TAddress,
    fromProvider: typebox.Type.String({ format: "uri" }),
    toProvider: typebox.Type.String({ format: "uri" }),
    fromChainId: TChainId,
    toChainId: TChainId,
});
const ApproveResponseSchema = {
    200: typebox.Type.Object({
        allowance: typebox.Type.String(),
        transaction: typebox.Type.Optional(typebox.Type.Object({
            to: typebox.Type.String(),
            data: typebox.Type.String(),
        })),
    }),
};
const ExecuteParamsSchema = ApproveParamsSchema;
const ExecuteResponseSchema = {
    200: typebox.Type.Object({
        transaction: typebox.Type.Optional(typebox.Type.Object({
            to: typebox.Type.String(),
            data: typebox.Type.String(),
        })),
    }),
};
const CheckStatusParamsSchema = typebox.Type.Object({
    txHash: TBytes32,
    fromProvider: typebox.Type.String({ format: "uri" }),
    toProvider: typebox.Type.String({ format: "uri" }),
    fromChainId: TChainId,
    toChainId: TChainId,
    signer: TAddress,
});
const CheckStatusResponseSchema = {
    200: typebox.Type.Object({
        status: typebox.Type.Object({ completed: typebox.Type.Boolean() }),
        transaction: typebox.Type.Optional(typebox.Type.Object({
            to: typebox.Type.String(),
            data: typebox.Type.String(),
        })),
    }),
};

const VectorNodeConfigSchema = typebox.Type.Object({
    adminToken: typebox.Type.String(),
    authUrl: typebox.Type.Optional(typebox.Type.String({ format: "uri" })),
    chainAddresses: typebox.Type.Dict(TContractAddresses),
    chainProviders: typebox.Type.Dict(TUrl),
    dbUrl: typebox.Type.Optional(TUrl),
    logLevel: typebox.Type.Optional(typebox.Type.Union([
        typebox.Type.Literal("fatal"),
        typebox.Type.Literal("error"),
        typebox.Type.Literal("warn"),
        typebox.Type.Literal("info"),
        typebox.Type.Literal("debug"),
        typebox.Type.Literal("trace"),
        typebox.Type.Literal("silent"),
    ])),
    messagingUrl: typebox.Type.Optional(TUrl),
    mnemonic: typebox.Type.Optional(typebox.Type.String()),
    natsUrl: typebox.Type.Optional(TUrl),
    skipCheckIn: typebox.Type.Optional(typebox.Type.Boolean()),
    baseGasSubsidyPercentage: typebox.Type.Number({ minimum: 0, maximum: 100 }),
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

const GetWithdrawalQuoteParamsSchema = typebox.Type.Object({
    amount: TIntegerString,
    assetId: TAddress,
    channelAddress: TAddress,
    receiveExactAmount: typebox.Type.Optional(typebox.Type.Boolean()),
});
const GetTransferQuoteParamsSchema = typebox.Type.Object({
    routerIdentifier: TPublicIdentifier,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    recipient: typebox.Type.Optional(TPublicIdentifier),
    recipientChainId: typebox.Type.Optional(TChainId),
    recipientAssetId: typebox.Type.Optional(TAddress),
    receiveExactAmount: typebox.Type.Optional(typebox.Type.Boolean()),
});
const GetRouterConfigParamsSchema$1 = typebox.Type.Object({
    routerIdentifier: TPublicIdentifier,
});
const GetTransferStateByRoutingIdParamsSchema$1 = typebox.Type.Object({
    channelAddress: TAddress,
    routingId: TBytes32,
});
const GetTransferStatesByRoutingIdParamsSchema$1 = typebox.Type.Object({
    routingId: TBytes32,
});
const GetChannelStateParamsSchema$1 = typebox.Type.Object({ channelAddress: TAddress });
const GetChannelStatesParamsSchema$1 = typebox.Type.Object({});
const GetChannelStateByParticipantsParamsSchema$1 = typebox.Type.Object({
    alice: TPublicIdentifier,
    bob: TPublicIdentifier,
    chainId: TChainId,
});
const GetActiveTransfersParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
});
const GetTransferStateParamsSchema$1 = typebox.Type.Object({
    transferId: TBytes32,
});
const GetTransfersFilterOptsSchema = typebox.Type.Object({
    channelAddress: typebox.Type.Optional(TAddress),
    startDate: typebox.Type.Optional(typebox.Type.Any()),
    endDate: typebox.Type.Optional(typebox.Type.Any()),
    active: typebox.Type.Optional(typebox.Type.Boolean()),
    routingId: typebox.Type.Optional(TBytes32),
    transferDefinition: typebox.Type.Optional(TAddress),
});
const GetTransfersParamsSchema$1 = typebox.Type.Object({
    filterOpts: typebox.Type.Optional(GetTransfersFilterOptsSchema),
});
const GetRegisteredTransfersParamsSchema$1 = typebox.Type.Object({
    chainId: TChainId,
});
const GetWithdrawalCommitmentParamsSchema$1 = typebox.Type.Object({
    transferId: TBytes32,
});
const GetWithdrawalCommitmentByTransactionHashParamsSchema$1 = typebox.Type.Object({
    transactionHash: TBytes32,
});
const SetupEngineParamsSchema = typebox.Type.Object({
    counterpartyIdentifier: TPublicIdentifier,
    chainId: TChainId,
    timeout: typebox.Type.Optional(TIntegerString),
    meta: typebox.Type.Optional(TBasicMeta),
});
const DepositEngineParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    meta: typebox.Type.Optional(TBasicMeta),
});
const RequestCollateralEngineParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    amount: typebox.Type.Optional(TIntegerString),
});
const CreateConditionalTransferParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    recipient: typebox.Type.Optional(TPublicIdentifier),
    recipientChainId: typebox.Type.Optional(TChainId),
    recipientAssetId: typebox.Type.Optional(TAddress),
    timeout: typebox.Type.Optional(TIntegerString),
    meta: typebox.Type.Optional(TBasicMeta),
    type: typebox.Type.String(),
    details: typebox.Type.Dict(typebox.Type.Any()),
    quote: typebox.Type.Optional(TransferQuoteSchema),
});
const ResolveTransferParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
    meta: typebox.Type.Optional(TBasicMeta),
    transferResolver: TransferResolverSchema,
});
const WithdrawParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    recipient: TAddress,
    timeout: typebox.Type.Optional(TIntegerString),
    quote: typebox.Type.Optional(WithdrawalQuoteSchema),
    callTo: typebox.Type.Optional(TAddress),
    callData: typebox.Type.Optional(typebox.Type.String()),
    meta: typebox.Type.Optional(TBasicMeta),
    initiatorSubmits: typebox.Type.Optional(typebox.Type.Boolean()),
});
const WithdrawRetryParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
});
const AddTransactionToCommitmentParamsSchema = typebox.Type.Object({
    transactionHash: TBytes32,
    channelAddress: TAddress,
    transferId: TBytes32,
});
const DisputeChannelParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
});
const DefundChannelParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
});
const GetChannelDisputeParamsSchema$1 = typebox.Type.Object({
    channelAddress: TAddress,
});
const DisputeTransferParamsSchema = typebox.Type.Object({
    transferId: TBytes32,
});
const DefundTransferParamsSchema = typebox.Type.Object({
    transferId: TBytes32,
});
const GetTransferDisputeParamsSchema$1 = typebox.Type.Object({
    transferId: TBytes32,
});
const ExitChannelParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    assetIds: typebox.Type.Array(TAddress),
    recipient: typebox.Type.Optional(TAddress),
    owner: typebox.Type.Optional(TAddress),
});
const SignUtilityMessageParamsSchema = typebox.Type.Object({
    message: typebox.Type.String(),
});
const SendIsAliveParamsSchema = typebox.Type.Object({ channelAddress: TAddress, skipCheckIn: typebox.Type.Boolean() });
const RestoreStateParamsSchema = typebox.Type.Object({
    counterpartyIdentifier: TPublicIdentifier,
    chainId: TChainId,
});
const RpcRequestEngineParamsSchema = typebox.Type.Object({
    id: typebox.Type.Number({ minimum: 1 }),
    jsonrpc: typebox.Type.Literal("2.0"),
    method: typebox.Type.Union(Object.values(ChannelRpcMethods).map((methodName) => typebox.Type.Literal(methodName))),
    params: typebox.Type.Optional(typebox.Type.Any()),
});
exports.EngineParams = void 0;
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
})(exports.EngineParams || (exports.EngineParams = {}));

const BasicChannelServerResponseSchema = {
    200: typebox.Type.Object({
        channelAddress: TAddress,
    }),
};
const BasicTransferServerResponseSchema = {
    200: typebox.Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        routingId: typebox.Type.Optional(TBytes32),
    }),
};
const PostWithdrawalQuoteParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetWithdrawalQuoteSchema,
    typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const PostWithdrawalQuoteResponseSchema = {
    200: WithdrawalQuoteSchema,
};
const PostTransferQuoteParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetTransferQuoteSchema,
    typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const PostTransferQuoteResponseSchema = {
    200: TransferQuoteSchema,
};
const GetRouterConfigParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetRouterConfigSchema,
    typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetRouterConfigResponseSchema = {
    200: typebox.Type.Object({
        supportedChains: typebox.Type.Array(TChainId),
        allowedSwaps: typebox.Type.Array(AllowedSwapSchema),
    }),
};
const GetTransferStateByRoutingIdParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetTransferStateByRoutingIdSchema,
    typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetTransferStateByRoutingIdResponseSchema = {
    200: typebox.Type.Union([typebox.Type.Undefined(), TFullTransferState]),
};
const GetTransferStatesByRoutingIdParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetTransferStatesByRoutingIdSchema,
    typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
    }),
]);
const GetTransferStatesByRoutingIdResponseSchema = {
    200: typebox.Type.Array(TFullTransferState),
};
const GetActiveTransfersByChannelAddressParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetActiveTransfersSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetActiveTransfersByChannelAddressResponseSchema = {
    200: typebox.Type.Array(TFullTransferState),
};
const GetTransferStateParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetTransferStateSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetTransferStateResponseSchema = {
    200: typebox.Type.Union([typebox.Type.Undefined(), TFullTransferState]),
};
const GetTransfersParamsSchema = typebox.Type.Object({ publicIdentifier: TPublicIdentifier });
const GetTransfersResponseSchema = {
    200: typebox.Type.Array(TFullTransferState),
};
const GetChannelStateParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetChannelStateSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelStateResponseSchema = {
    200: typebox.Type.Union([typebox.Type.Undefined(), TFullChannelState]),
};
const GetChannelStatesParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetChannelStatesSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelStatesResponseSchema = {
    200: typebox.Type.Array(TAddress),
};
const GetChannelStateByParticipantsParamsSchema = typebox.Type.Object({
    publicIdentifier: TPublicIdentifier,
    counterparty: TPublicIdentifier,
    chainId: TChainId,
});
const GetChannelStateByParticipantsResponseSchema = GetChannelStateResponseSchema;
const GetConfigResponseSchema = {
    200: typebox.Type.Array(typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        index: typebox.Type.Integer(),
        chainAddresses: typebox.Type.Dict(TContractAddresses),
    })),
};
const GetStatusResponseSchema = {
    200: typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        providerSyncing: typebox.Type.Dict(typebox.Type.Union([
            typebox.Type.Boolean(),
            typebox.Type.Object({
                startingBlock: typebox.Type.String(),
                currentBlock: typebox.Type.String(),
                highestBlock: typebox.Type.String(),
            }),
            typebox.Type.String(),
            typebox.Type.Undefined(),
        ])),
        version: typebox.Type.String(),
    }),
};
const GetListenerParamsSchema = typebox.Type.Object({
    eventName: typebox.Type.Union(Object.values(EngineEvents).map((e) => typebox.Type.Literal(e))),
    publicIdentifier: TPublicIdentifier,
});
const GetListenerResponseSchema = {
    200: typebox.Type.Object({ url: TUrl }),
};
const GetListenersParamsSchema = typebox.Type.Object({ publicIdentifier: TPublicIdentifier });
const GetListenersResponseSchema = {
    200: typebox.Type.Dict(TUrl),
};
const GetRegisteredTransfersParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetRegisteredTransfersSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetRegisteredTransfersResponseSchema = {
    200: typebox.Type.Array(typebox.Type.Object({
        name: typebox.Type.String(),
        stateEncoding: typebox.Type.String(),
        resolverEncoding: typebox.Type.String(),
        definition: TAddress,
        encodedCancel: typebox.Type.String(),
    })),
};
const GetWithdrawalCommitmentParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetWithdrawalCommitmentSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetWithdrawalCommitmentResponseSchema = {
    200: typebox.Type.Union([
        typebox.Type.Undefined(),
        typebox.Type.Object({
            aliceSignature: typebox.Type.Optional(TSignature),
            bobSignature: typebox.Type.Optional(TSignature),
            channelAddress: TAddress,
            alice: TAddress,
            bob: TAddress,
            recipient: TAddress,
            assetId: TAddress,
            amount: TIntegerString,
            nonce: TIntegerString,
            callTo: TAddress,
            callData: TBytes,
            transactionHash: typebox.Type.Optional(TBytes32),
        }),
    ]),
};
const GetWithdrawalCommitmentByTransactionHashParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetWithdrawalCommitmentByTransactionHashSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetWithdrawalCommitmentByTransactionHashResponseSchema = {
    200: typebox.Type.Union([
        typebox.Type.Undefined(),
        typebox.Type.Object({
            aliceSignature: typebox.Type.Optional(TSignature),
            bobSignature: typebox.Type.Optional(TSignature),
            channelAddress: TAddress,
            alice: TAddress,
            bob: TAddress,
            recipient: TAddress,
            assetId: TAddress,
            amount: TIntegerString,
            nonce: TIntegerString,
            callTo: TAddress,
            callData: TBytes,
            transactionHash: typebox.Type.Optional(TBytes32),
        }),
    ]),
};
const PostRegisterListenerBodySchema = typebox.Type.Object({
    publicIdentifier: TPublicIdentifier,
    events: typebox.Type.Dict(typebox.Type.String()),
});
const PostRegisterListenerResponseSchema = {
    200: typebox.Type.Object({
        message: typebox.Type.String(),
    }),
};
const PostSetupBodySchema = typebox.Type.Intersect([
    exports.EngineParams.SetupSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSetupResponseSchema = BasicChannelServerResponseSchema;
const PostRequestSetupBodySchema = PostSetupBodySchema;
const PostRequestSetupResponseSchema = BasicChannelServerResponseSchema;
const PostDepositBodySchema = typebox.Type.Intersect([
    exports.EngineParams.DepositSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostDepositResponseSchema = BasicChannelServerResponseSchema;
const PostRequestCollateralBodySchema = typebox.Type.Intersect([
    exports.EngineParams.RequestCollateralSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostRequestCollateralResponseSchema = BasicChannelServerResponseSchema;
const PostSendDepositTxBodySchema = typebox.Type.Object({
    channelAddress: TAddress,
    amount: TIntegerString,
    assetId: TAddress,
    chainId: TChainId,
    publicIdentifier: TPublicIdentifier,
});
const PostSendDepositTxResponseSchema = {
    200: typebox.Type.Object({
        txHash: TBytes32,
    }),
};
const PostConditionalTransferBodySchema = typebox.Type.Intersect([
    exports.EngineParams.ConditionalTransferSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostConditionalTransferResponseSchema = BasicTransferServerResponseSchema;
const PostResolveTransferBodySchema = typebox.Type.Intersect([
    exports.EngineParams.ResolveTransferSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostResolveTransferResponseSchema = BasicTransferServerResponseSchema;
const PostWithdrawTransferBodySchema = typebox.Type.Intersect([
    exports.EngineParams.WithdrawSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostWithdrawTransferResponseSchema = {
    200: typebox.Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        transactionHash: typebox.Type.Optional(TBytes32),
        transaction: typebox.Type.Object({
            to: TAddress,
            value: TIntegerString,
            data: typebox.Type.String(),
        }),
    }),
};
const PostWithdrawRetryTransferBodySchema = typebox.Type.Intersect([
    exports.EngineParams.WithdrawRetrySchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostWithdrawRetryTransferResponseSchema = {
    200: typebox.Type.Object({
        channelAddress: TAddress,
        transferId: TBytes32,
        transactionHash: typebox.Type.Optional(TBytes32),
    }),
};
const PostAddTransactionToCommitmentTransferBodySchema = typebox.Type.Intersect([
    exports.EngineParams.AddTransactionToCommitmentSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSignUtilityMessageBodySchema = typebox.Type.Intersect([
    exports.EngineParams.SignUtilityMessageSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSignUtilityMessageResponseSchema = {
    200: typebox.Type.Object({
        signedMessage: typebox.Type.String(),
    }),
};
const PostRestoreStateBodySchema = typebox.Type.Intersect([
    exports.EngineParams.RestoreStateSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostRestoreStateResponseSchema = {
    200: typebox.Type.Object({
        channelAddress: TAddress,
    }),
};
const PostCreateNodeBodySchema = typebox.Type.Object({
    index: typebox.Type.Integer({ minimum: 0, maximum: 2147483647 }),
    mnemonic: typebox.Type.Optional(typebox.Type.String()),
    skipCheckIn: typebox.Type.Optional(typebox.Type.Boolean()),
});
const PostCreateNodeResponseSchema = {
    200: typebox.Type.Object({
        publicIdentifier: TPublicIdentifier,
        signerAddress: TAddress,
        index: typebox.Type.Integer(),
    }),
};
const PostAdminBodySchema = typebox.Type.Object({
    adminToken: typebox.Type.String({
        example: "cxt1234",
        description: "Admin token",
    }),
});
const PostAdminResponseSchema = {
    200: typebox.Type.Object({
        message: typebox.Type.String(),
    }),
};
const PostAdminSubmitWithdrawalsBodySchema = typebox.Type.Object({
    adminToken: typebox.Type.String(),
});
const PostAdminSubmitWithdrawalsResponseSchema = {
    200: typebox.Type.Dict(typebox.Type.Union([
        typebox.Type.Array(typebox.Type.Object({
            transactionHash: typebox.Type.String(),
            transferId: TBytes32,
            channelAddress: TAddress,
        })),
        typebox.Type.Object({
            message: typebox.Type.String(),
            type: typebox.Type.String(),
            context: typebox.Type.Dict(typebox.Type.Any()),
            stack: typebox.Type.String(),
        }),
    ])),
};
const GetChannelDisputeParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetChannelDisputeSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetChannelDisputeResponseSchema = {
    200: typebox.Type.Union([typebox.Type.Undefined(), ChannelDisputeSchema]),
};
const PostSendDisputeChannelTxBodySchema = typebox.Type.Intersect([
    exports.EngineParams.DisputeChannelSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDisputeChannelTxResponseSchema = {
    200: typebox.Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendDefundChannelTxBodySchema = typebox.Type.Intersect([
    exports.EngineParams.DefundChannelSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDefundChannelTxResponseSchema = {
    200: typebox.Type.Object({
        transactionHash: TBytes32,
    }),
};
const GetTransferDisputeParamsSchema = typebox.Type.Intersect([
    exports.EngineParams.GetTransferDisputeSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const GetTransferDisputeResponseSchema = {
    200: typebox.Type.Union([typebox.Type.Undefined(), TransferDisputeSchema]),
};
const PostSendDisputeTransferTxBodySchema = typebox.Type.Intersect([
    exports.EngineParams.DisputeTransferSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDisputeTransferTxResponseSchema = {
    200: typebox.Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendDefundTransferTxBodySchema = typebox.Type.Intersect([
    exports.EngineParams.DefundTransferSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendDefundTransferTxResponseSchema = {
    200: typebox.Type.Object({
        transactionHash: TBytes32,
    }),
};
const PostSendExitChannelTxBodySchema = typebox.Type.Intersect([
    exports.EngineParams.ExitChannelSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendExitChannelTxResponseSchema = {
    200: typebox.Type.Array(typebox.Type.Object({
        assetId: TAddress,
        transactionHash: typebox.Type.Optional(TBytes32),
        error: typebox.Type.Optional(TVectorErrorJson),
    })),
};
const PostSendIsAliveBodySchema = typebox.Type.Intersect([
    exports.EngineParams.SendIsAliveSchema,
    typebox.Type.Object({ publicIdentifier: TPublicIdentifier }),
]);
const PostSendIsAliveResponseSchema = {
    200: typebox.Type.Object({
        channelAddress: TAddress,
    }),
};
exports.NodeParams = void 0;
(function (NodeParams) {
    NodeParams.GetStatusSchema = typebox.Type.Object({});
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
    NodeParams.GetConfigSchema = typebox.Type.Object({});
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
})(exports.NodeParams || (exports.NodeParams = {}));
exports.NodeResponses = void 0;
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
})(exports.NodeResponses || (exports.NodeResponses = {}));

const SetupProtocolParamsSchema = typebox.Type.Object({
    timeout: TIntegerString,
    networkContext: TNetworkContext,
    counterpartyIdentifier: TPublicIdentifier,
    meta: typebox.Type.Optional(TBasicMeta),
});
const DepositProtocolParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    assetId: TAddress,
    meta: typebox.Type.Optional(TBasicMeta),
});
const CreateProtocolParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    balance: TBalance,
    assetId: TAddress,
    transferDefinition: TAddress,
    transferInitialState: TransferStateSchema,
    timeout: TIntegerString,
    meta: typebox.Type.Optional(TBasicMeta),
});
const ResolveProtocolParamsSchema = typebox.Type.Object({
    channelAddress: TAddress,
    transferId: TBytes32,
    transferResolver: TransferResolverSchema,
    meta: typebox.Type.Optional(TBasicMeta),
});
exports.ProtocolParams = void 0;
(function (ProtocolParams) {
    ProtocolParams.SetupSchema = SetupProtocolParamsSchema;
    ProtocolParams.DepositSchema = DepositProtocolParamsSchema;
    ProtocolParams.CreateSchema = CreateProtocolParamsSchema;
    ProtocolParams.ResolveSchema = ResolveProtocolParamsSchema;
})(exports.ProtocolParams || (exports.ProtocolParams = {}));

const TPathSchema = typebox.Type.Object({
    recipient: TPublicIdentifier,
    recipientChainId: TChainId,
    recipientAssetId: TAddress,
});
const TRoutingMeta = typebox.Type.Object({
    routingId: TBytes32,
    requireOnline: typebox.Type.Boolean(),
    path: typebox.Type.Array(TPathSchema),
    quote: typebox.Type.Optional(TransferQuoteSchema),
});
exports.RouterSchemas = void 0;
(function (RouterSchemas) {
    RouterSchemas.RouterMeta = TRoutingMeta;
})(exports.RouterSchemas || (exports.RouterSchemas = {}));

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

exports.ARBITRUM_TESTNET_1_CHAIN_ID = ARBITRUM_TESTNET_1_CHAIN_ID;
exports.AUTODEPLOY_CHAIN_IDS = AUTODEPLOY_CHAIN_IDS;
exports.AllowedSwapSchema = AllowedSwapSchema;
exports.ApproveParamsSchema = ApproveParamsSchema;
exports.ApproveResponseSchema = ApproveResponseSchema;
exports.BalanceEncoding = BalanceEncoding;
exports.CHAINS_WITH_ONE_CONFIRMATION = CHAINS_WITH_ONE_CONFIRMATION;
exports.CONDITIONAL_TRANSFER_CREATED_EVENT = CONDITIONAL_TRANSFER_CREATED_EVENT;
exports.CONDITIONAL_TRANSFER_RESOLVED_EVENT = CONDITIONAL_TRANSFER_RESOLVED_EVENT;
exports.CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT = CONDITIONAL_TRANSFER_ROUTING_COMPLETE_EVENT;
exports.ChainError = ChainError;
exports.ChainReaderEvents = ChainReaderEvents;
exports.ChainServiceEvents = ChainServiceEvents;
exports.ChannelDisputeSchema = ChannelDisputeSchema;
exports.ChannelRpcMethods = ChannelRpcMethods;
exports.CheckStatusParamsSchema = CheckStatusParamsSchema;
exports.CheckStatusResponseSchema = CheckStatusResponseSchema;
exports.CoreChannelStateEncoding = CoreChannelStateEncoding;
exports.CoreTransferStateEncoding = CoreTransferStateEncoding;
exports.DEFAULT_CHANNEL_TIMEOUT = DEFAULT_CHANNEL_TIMEOUT;
exports.DEFAULT_FEE_EXPIRY = DEFAULT_FEE_EXPIRY;
exports.DEFAULT_ROUTER_MAX_SAFE_PRICE_IMPACT = DEFAULT_ROUTER_MAX_SAFE_PRICE_IMPACT;
exports.DEFAULT_TRANSFER_TIMEOUT = DEFAULT_TRANSFER_TIMEOUT;
exports.DEPOSIT_RECONCILED_EVENT = DEPOSIT_RECONCILED_EVENT;
exports.ERC20Abi = ERC20Abi;
exports.ETH_READER_MAX_RETRIES = ETH_READER_MAX_RETRIES;
exports.EngineError = EngineError;
exports.EngineEvents = EngineEvents;
exports.ExecuteParamsSchema = ExecuteParamsSchema;
exports.ExecuteResponseSchema = ExecuteResponseSchema;
exports.GAS_ESTIMATES = GAS_ESTIMATES;
exports.GetTransfersFilterOptsSchema = GetTransfersFilterOptsSchema;
exports.HashlockTransferName = HashlockTransferName;
exports.HashlockTransferResolverEncoding = HashlockTransferResolverEncoding;
exports.HashlockTransferStateEncoding = HashlockTransferStateEncoding;
exports.IS_ALIVE_EVENT = IS_ALIVE_EVENT;
exports.MAXIMUM_CHANNEL_TIMEOUT = MAXIMUM_CHANNEL_TIMEOUT;
exports.MAXIMUM_TRANSFER_TIMEOUT = MAXIMUM_TRANSFER_TIMEOUT;
exports.MINIMUM_CHANNEL_TIMEOUT = MINIMUM_CHANNEL_TIMEOUT;
exports.MINIMUM_TRANSFER_TIMEOUT = MINIMUM_TRANSFER_TIMEOUT;
exports.MessagingError = MessagingError;
exports.NATS_AUTH_URL = NATS_AUTH_URL;
exports.NATS_CLUSTER_URL = NATS_CLUSTER_URL;
exports.NATS_WS_URL = NATS_WS_URL;
exports.NUM_CONFIRMATIONS = NUM_CONFIRMATIONS;
exports.NodeError = NodeError;
exports.ProtocolError = ProtocolError;
exports.ProtocolEventName = ProtocolEventName;
exports.REQUEST_COLLATERAL_EVENT = REQUEST_COLLATERAL_EVENT;
exports.RESTORE_STATE_EVENT = RESTORE_STATE_EVENT;
exports.Result = Result;
exports.RouterError = RouterError;
exports.SETUP_EVENT = SETUP_EVENT;
exports.SIMPLE_WITHDRAWAL_GAS_ESTIMATE = SIMPLE_WITHDRAWAL_GAS_ESTIMATE;
exports.StoredTransactionStatus = StoredTransactionStatus;
exports.TAddress = TAddress;
exports.TBalance = TBalance;
exports.TBasicMeta = TBasicMeta;
exports.TBytes = TBytes;
exports.TBytes32 = TBytes32;
exports.TChainId = TChainId;
exports.TChannelUpdate = TChannelUpdate;
exports.TChannelUpdateDetails = TChannelUpdateDetails;
exports.TChannelUpdateType = TChannelUpdateType;
exports.TContractAddresses = TContractAddresses;
exports.TCreateUpdateDetails = TCreateUpdateDetails;
exports.TDecimalString = TDecimalString;
exports.TDepositUpdateDetails = TDepositUpdateDetails;
exports.TFullChannelState = TFullChannelState;
exports.TFullTransferState = TFullTransferState;
exports.TIntegerString = TIntegerString;
exports.TNetworkContext = TNetworkContext;
exports.TPublicIdentifier = TPublicIdentifier;
exports.TRANSFER_DECREMENT = TRANSFER_DECREMENT;
exports.TResolveUpdateDetails = TResolveUpdateDetails;
exports.TSetupUpdateDetails = TSetupUpdateDetails;
exports.TSignature = TSignature;
exports.TTransferMeta = TTransferMeta;
exports.TUrl = TUrl;
exports.TVectorErrorJson = TVectorErrorJson;
exports.TransactionReason = TransactionReason;
exports.TransferDisputeSchema = TransferDisputeSchema;
exports.TransferEncodingSchema = TransferEncodingSchema;
exports.TransferEncodingsMap = TransferEncodingsMap;
exports.TransferNameSchema = TransferNameSchema;
exports.TransferNames = TransferNames;
exports.TransferQuoteEncoding = TransferQuoteEncoding;
exports.TransferQuoteSchema = TransferQuoteSchema;
exports.TransferResolverSchema = TransferResolverSchema;
exports.TransferStateSchema = TransferStateSchema;
exports.UINT_MAX = UINT_MAX;
exports.UpdateType = UpdateType;
exports.VectorError = VectorError;
exports.VectorNodeConfigSchema = VectorNodeConfigSchema;
exports.WITHDRAWAL_CREATED_EVENT = WITHDRAWAL_CREATED_EVENT;
exports.WITHDRAWAL_RECONCILED_EVENT = WITHDRAWAL_RECONCILED_EVENT;
exports.WITHDRAWAL_RESOLVED_EVENT = WITHDRAWAL_RESOLVED_EVENT;
exports.WithdrawDataEncoding = WithdrawDataEncoding;
exports.WithdrawName = WithdrawName;
exports.WithdrawResolverEncoding = WithdrawResolverEncoding;
exports.WithdrawStateEncoding = WithdrawStateEncoding;
exports.WithdrawalQuoteEncoding = WithdrawalQuoteEncoding;
exports.WithdrawalQuoteSchema = WithdrawalQuoteSchema;
exports.enumify = enumify;
exports.getConfirmationsForChain = getConfirmationsForChain;
exports.jsonifyError = jsonifyError;
exports.tidy = tidy;
