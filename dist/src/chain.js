import { BigNumber } from "@ethersproject/bignumber";
import { VectorError } from "./error";
export const GAS_ESTIMATES = {
    createChannelAndDepositAlice: BigNumber.from(200000),
    createChannel: BigNumber.from(150000),
    depositAlice: BigNumber.from(85000),
    depositBob: BigNumber.from(50000),
    withdraw: BigNumber.from(95000),
};
export const SIMPLE_WITHDRAWAL_GAS_ESTIMATE = BigNumber.from(100000);
export const ERC20Abi = [
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
export class ChainError extends VectorError {
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
//# sourceMappingURL=chain.js.map