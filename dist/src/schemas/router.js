import { Type } from "@sinclair/typebox";
import { TBytes32, TAddress, TChainId, TPublicIdentifier, TransferQuoteSchema } from "./basic";
const TPathSchema = Type.Object({
    recipient: TPublicIdentifier,
    recipientChainId: TChainId,
    recipientAssetId: TAddress,
});
const TRoutingMeta = Type.Object({
    routingId: TBytes32,
    requireOnline: Type.Boolean(),
    path: Type.Array(TPathSchema),
    quote: Type.Optional(TransferQuoteSchema),
});
export var RouterSchemas;
(function (RouterSchemas) {
    RouterSchemas.RouterMeta = TRoutingMeta;
})(RouterSchemas || (RouterSchemas = {}));
//# sourceMappingURL=router.js.map