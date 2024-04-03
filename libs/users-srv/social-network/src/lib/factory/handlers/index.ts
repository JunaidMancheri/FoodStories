import { Driver } from "neo4j-driver";
import { FollowAUserHandler } from "../../interface/handlers/FollowAUser.handler";
import { UnfollowAUserHandler } from "../../interface/handlers/UnfollowAUser.handler";
import { IsFollowingHandler } from "../../interface/handlers/IsFollowing.handler";
import { Producer } from "kafkajs";
import { BlockUserHandler } from "../../interface/handlers/BlockUser.handler";
import { UnblockUserHandler } from "../../interface/handlers/unblockUser.handler";
import { HasBlockedHandler } from "../../interface/handlers/HasBlocked.handler";

export function makeFollowAUserHandler(driver: Driver, producer: Producer) {
  return new FollowAUserHandler(driver, producer);
}

export  function makeUnfollowAUserHandler(driver: Driver, producer: Producer) {
  return  new UnfollowAUserHandler(driver, producer);
}

export function  makeIsFollowingHandler(driver: Driver) {
  return new IsFollowingHandler(driver);
}


export function makeBlockUserHandler(driver: Driver, producer: Producer) {
  return new BlockUserHandler(driver, producer);
}

export  function makeUnblockUserHandler(driver: Driver) {
  return new UnblockUserHandler(driver);
}

export function makeHasBlockedHandler(driver: Driver) {
  return new HasBlockedHandler(driver);
}