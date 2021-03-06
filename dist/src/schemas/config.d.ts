import { Static } from "@sinclair/typebox";
export declare const VectorNodeConfigSchema: import("@sinclair/typebox").TObject<{
    adminToken: import("@sinclair/typebox").TString;
    authUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    chainAddresses: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TObject<{
        channelFactoryAddress: import("@sinclair/typebox").TString;
        transferRegistryAddress: import("@sinclair/typebox").TString;
    }>>;
    chainProviders: import("@sinclair/typebox").TDict<import("@sinclair/typebox").TString>;
    dbUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    logLevel: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"fatal">, import("@sinclair/typebox").TLiteral<"error">, import("@sinclair/typebox").TLiteral<"warn">, import("@sinclair/typebox").TLiteral<"info">, import("@sinclair/typebox").TLiteral<"debug">, import("@sinclair/typebox").TLiteral<"trace">, import("@sinclair/typebox").TLiteral<"silent">]>>;
    messagingUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    mnemonic: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    natsUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    skipCheckIn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    baseGasSubsidyPercentage: import("@sinclair/typebox").TNumber;
}>;
export declare type VectorNodeConfig = Static<typeof VectorNodeConfigSchema>;
//# sourceMappingURL=config.d.ts.map