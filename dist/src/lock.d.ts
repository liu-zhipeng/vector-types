export declare type LockInformation = {
    type: "acquire" | "release";
    lockName: string;
    lockValue?: string;
};
export interface ILockService {
    acquireLock(lockName: string, isAlice?: boolean, counterpartyPublicIdentifier?: string): Promise<string>;
    releaseLock(lockName: string, lockValue: string, isAlice?: boolean, counterpartyPublicIdentifier?: string): Promise<void>;
}
//# sourceMappingURL=lock.d.ts.map