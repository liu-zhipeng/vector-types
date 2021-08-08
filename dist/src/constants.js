import { BigNumber } from "@ethersproject/bignumber";
export const DEFAULT_TRANSFER_TIMEOUT = 60 * 60 * 24;
export const MINIMUM_TRANSFER_TIMEOUT = DEFAULT_TRANSFER_TIMEOUT / 2;
export const MAXIMUM_TRANSFER_TIMEOUT = DEFAULT_TRANSFER_TIMEOUT * 2;
export const DEFAULT_CHANNEL_TIMEOUT = DEFAULT_TRANSFER_TIMEOUT * 2;
export const MINIMUM_CHANNEL_TIMEOUT = DEFAULT_CHANNEL_TIMEOUT / 2;
export const MAXIMUM_CHANNEL_TIMEOUT = DEFAULT_CHANNEL_TIMEOUT * 7;
export const DEFAULT_ROUTER_MAX_SAFE_PRICE_IMPACT = "15";
export const TRANSFER_DECREMENT = 60 * 72;
export const UINT_MAX = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").toString();
export const ARBITRUM_TESTNET_1_CHAIN_ID = 152709604825713;
export const AUTODEPLOY_CHAIN_IDS = [ARBITRUM_TESTNET_1_CHAIN_ID];
export const DEFAULT_FEE_EXPIRY = 300000;
export const NUM_CONFIRMATIONS = 10;
export const CHAINS_WITH_ONE_CONFIRMATION = [1, 1337, 1338, 1340, 1341, 1342];
export const getConfirmationsForChain = (chainId) => {
    return CHAINS_WITH_ONE_CONFIRMATION.includes(chainId) ? 1 : NUM_CONFIRMATIONS;
};
export const ETH_READER_MAX_RETRIES = 5;
export const NATS_CLUSTER_URL = "nats://nats1.connext.provide.network:4222,nats://nats2.connext.provide.network:4222,nats://nats3.connext.provide.network:4222";
export const NATS_AUTH_URL = "https://messaging.fibswap.io";
export const NATS_WS_URL = "wss://messaging.fibswap.io/ws-nats";
//# sourceMappingURL=constants.js.map