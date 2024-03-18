import { ILogger } from '@food-stories/common/logger';
import {connect} from 'mongoose';

export async function connectToMongoDB(uri: string, logger: ILogger) {
  await connect(uri);
  logger.info('Conneted to MongoDB')
}