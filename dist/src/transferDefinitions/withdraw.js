import { tidy } from "../utils";
export const WithdrawName = "Withdraw";
export const WithdrawStateEncoding = tidy(`tuple(
    bytes initiatorSignature,
    address initiator,
    address responder,
    bytes32 data,
    uint256 nonce,
    uint256 fee,
    address callTo,
    bytes callData
  )`);
export const WithdrawResolverEncoding = tidy(`tuple(
    bytes responderSignature
  )`);
export const WithdrawalQuoteEncoding = tidy(`tuple(
  address channelAddress,
  uint256 amount,
  address assetId,
  uint256 fee,
  uint256 expiry
)`);
//# sourceMappingURL=withdraw.js.map