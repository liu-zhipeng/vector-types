import { SignatureString, Address, Bytes32 } from "../basic";
export declare const WithdrawName = "Withdraw";
export declare type WithdrawState = {
    initiatorSignature: SignatureString;
    initiator: Address;
    responder: Address;
    data: Bytes32;
    nonce: string;
    fee: string;
    callTo: Address;
    callData: string;
};
export declare type WithdrawResolver = {
    responderSignature: SignatureString;
};
export declare const WithdrawStateEncoding: string;
export declare const WithdrawResolverEncoding: string;
export declare type WithdrawCommitmentJson = {
    aliceSignature?: string;
    bobSignature?: string;
    channelAddress: string;
    alice: string;
    bob: string;
    recipient: string;
    assetId: string;
    amount: string;
    nonce: string;
    callTo: string;
    callData: string;
    transactionHash?: string;
};
export declare const WithdrawalQuoteEncoding: string;
//# sourceMappingURL=withdraw.d.ts.map