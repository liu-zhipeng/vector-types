import { Static } from "@sinclair/typebox";
declare const TRoutingMeta: import("@sinclair/typebox").TObject<{
    routingId: import("@sinclair/typebox").TString;
    requireOnline: import("@sinclair/typebox").TBoolean;
    path: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        recipient: import("@sinclair/typebox").TString;
        recipientChainId: import("@sinclair/typebox").TNumber;
        recipientAssetId: import("@sinclair/typebox").TString;
    }>>;
    quote: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        routerIdentifier: import("@sinclair/typebox").TString;
        amount: import("@sinclair/typebox").TString;
        assetId: import("@sinclair/typebox").TString;
        chainId: import("@sinclair/typebox").TNumber;
        recipient: import("@sinclair/typebox").TString;
        recipientChainId: import("@sinclair/typebox").TNumber;
        recipientAssetId: import("@sinclair/typebox").TString;
        fee: import("@sinclair/typebox").TString;
        expiry: import("@sinclair/typebox").TString;
        signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
}>;
export declare namespace RouterSchemas {
    const RouterMeta: import("@sinclair/typebox").TObject<{
        routingId: import("@sinclair/typebox").TString;
        requireOnline: import("@sinclair/typebox").TBoolean;
        path: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            recipient: import("@sinclair/typebox").TString;
            recipientChainId: import("@sinclair/typebox").TNumber;
            recipientAssetId: import("@sinclair/typebox").TString;
        }>>;
        quote: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            routerIdentifier: import("@sinclair/typebox").TString;
            amount: import("@sinclair/typebox").TString;
            assetId: import("@sinclair/typebox").TString;
            chainId: import("@sinclair/typebox").TNumber;
            recipient: import("@sinclair/typebox").TString;
            recipientChainId: import("@sinclair/typebox").TNumber;
            recipientAssetId: import("@sinclair/typebox").TString;
            fee: import("@sinclair/typebox").TString;
            expiry: import("@sinclair/typebox").TString;
            signature: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
    }>;
    type RouterMeta = Static<typeof TRoutingMeta>;
}
export {};
//# sourceMappingURL=router.d.ts.map