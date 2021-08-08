import { tidy } from "../utils";
import { HashlockTransferName, HashlockTransferResolverEncoding, HashlockTransferStateEncoding, } from "./hashlockTransfer";
import { WithdrawName, WithdrawResolverEncoding, WithdrawStateEncoding, } from "./withdraw";
export const TransferNames = {
    [HashlockTransferName]: HashlockTransferName,
    [WithdrawName]: WithdrawName,
};
export const TransferEncodingsMap = {
    [HashlockTransferName]: [HashlockTransferStateEncoding, HashlockTransferResolverEncoding],
    [WithdrawName]: [WithdrawStateEncoding, WithdrawResolverEncoding],
};
export const TransferQuoteEncoding = tidy(`tuple(
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
//# sourceMappingURL=shared.js.map