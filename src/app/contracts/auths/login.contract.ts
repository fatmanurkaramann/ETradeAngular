import { UserContract } from "../users/user.contract";
import { TokenContract } from "./token-contract";

export interface LoginContract{
  accessToken:TokenContract
  user:UserContract
}
