import { Driver } from "neo4j-driver";
import { FollowAUserHandler } from "../../interface/handlers/FollowAUser.handler";
import { UnfollowAUserHandler } from "../../interface/handlers/UnfollowAUser.handler";

export function makeFollowAUserHandler(driver: Driver) {
  return new FollowAUserHandler(driver);
}

export  function makeUnfollowAUserHandler(driver: Driver) {
  return  new UnfollowAUserHandler(driver);
}