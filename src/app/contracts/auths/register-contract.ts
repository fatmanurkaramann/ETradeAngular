import { UserContract } from "../users/user.contract";
import { TokenContract } from "./token-contract";

export interface RegisterContract{
  accessToken:TokenContract
  user:UserContract
}
