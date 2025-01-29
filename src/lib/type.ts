import { IdlAccounts } from "@coral-xyz/anchor";
import { LuckySol } from "../anchor/lucky_sol";

type Accounts = IdlAccounts<LuckySol>;
export type GlobalState = Accounts['globalState'];