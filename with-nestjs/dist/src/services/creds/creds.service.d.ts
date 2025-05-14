export declare class CredsService {
    passwordhash(password: string): Promise<string>;
    passwordMatch(password: string, hashed: string): Promise<boolean>;
}
