import { Address } from "../basic";
import { Values } from "../error";
import { HashlockTransferName, HashlockTransferResolver, HashlockTransferState } from "./hashlockTransfer";
import { WithdrawName, WithdrawResolver, WithdrawState } from "./withdraw";
export declare const TransferNames: {
    readonly HashlockTransfer: "HashlockTransfer";
    readonly Withdraw: "Withdraw";
};
export interface TransferResolverMap {
    [HashlockTransferName]: HashlockTransferResolver;
    [WithdrawName]: WithdrawResolver;
}
export interface TransferStateMap {
    [HashlockTransferName]: HashlockTransferState;
    [WithdrawName]: WithdrawState;
}
export declare const TransferEncodingsMap: {
    readonly HashlockTransfer: readonly [string, string];
    readonly Withdraw: readonly [string, string];
};
export declare type TransferName = keyof typeof TransferNames | string;
export declare type TransferState = Values<TransferStateMap> | any;
export declare type TransferResolver = Values<TransferResolverMap> | any;
export declare type TransferEncodings = Values<typeof TransferEncodingsMap> | [string, string];
export declare type RegisteredTransfer = {
    stateEncoding: string;
    resolverEncoding: string;
    definition: Address;
    name: string;
    encodedCancel: string;
};
export declare const TransferQuoteEncoding: string;
//# sourceMappingURL=shared.d.ts.map