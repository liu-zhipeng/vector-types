import { ChannelUpdate, FullTransferState, UpdateParams, UpdateType, FullChannelState } from "./channel";
import { Result } from "./error";
export interface IExternalValidation {
    validateInbound<T extends UpdateType = any>(update: ChannelUpdate<T>, state: FullChannelState | undefined, activeTransfers: FullTransferState[]): Promise<Result<void | Error>>;
    validateOutbound<T extends UpdateType = any>(params: UpdateParams<T>, state: FullChannelState | undefined, activeTransfers: FullTransferState[]): Promise<Result<void | Error>>;
}
//# sourceMappingURL=externalValidation.d.ts.map