import { combineReducers } from "redux";
import { reduser } from "./reduser";
import { Modelreduser } from "./reduser.Models";
import { CarReduser } from "./reduser.Cars";
import { UserReduser } from "./reduser.Users";
import { CartReduser } from "./reduser.Cart";

export const root = combineReducers({
  user: reduser,
  model: Modelreduser,
  car: CarReduser,
  cart: CartReduser,
  users: UserReduser,
});
