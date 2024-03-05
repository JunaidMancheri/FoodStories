import { makeLogger } from "@food-stories/common/logger";

export const Logger = makeLogger('POSTS-SRV');

export const logger = new Logger('main');

export const LikesLogger = makeLogger('LIKES-SRV');

export const CommentsLogger = makeLogger('COMMENTS-SRV');