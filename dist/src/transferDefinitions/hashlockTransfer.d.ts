import { HexString } from "../basic";
export declare const HashlockTransferName = "HashlockTransfer";
export declare type HashlockTransferState = {
    lockHash: HexString;
    expiry: string;
};
export declare type HashlockTransferResolver = {
    preImage: HexString;
};
export declare const HashlockTransferStateEncoding: string;
export declare const HashlockTransferResolverEncoding: string;
//# sourceMappingURL=hashlockTransfer.d.ts.map