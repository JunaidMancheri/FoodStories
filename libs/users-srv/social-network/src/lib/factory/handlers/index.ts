import { Driver } from "neo4j-driver";
import { FollowAUserHandler } from "../../interface/handlers/FollowAUser.handler";
import { UnfollowAUserHandler } from "../../interface/handlers/UnfollowAUser.handler";
import { IsFollowingHandler } from "../../interface/handlers/IsFollowing.handler";
import { Producer } from "kafkajs";

export function makeFollowAUserHandler(driver: Driver, producer: Producer) {
  return new FollowAUserHandler(driver, producer);
}

export  function makeUnfollowAUserHandler(driver: Driver, producer: Producer) {
  return  new UnfollowAUserHandler(driver, producer);
}

export function  makeIsFollowingHandler(driver: Driver) {
  return new IsFollowingHandler(driver);
}