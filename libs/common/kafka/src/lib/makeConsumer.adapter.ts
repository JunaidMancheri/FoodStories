import { BaseSubscriber } from '@food-stories/common/handlers';
import { ILogger } from '@food-stories/common/logger';
import { Consumer } from 'kafkajs';
import { isDevelopmentMode } from '@food-stories/common/utils';

export function makeConsumerAdapter(
  subscriber: BaseSubscriber,
  consumer: Consumer,
  logger: ILogger
) {
  consumer.subscribe({ topic: subscriber.event });
  consumer.run({
    autoCommit: false,
    eachMessage: async ({ message, topic, partition }) => {
      logger.info('Event received ' + subscriber.event);

      // potential break; if normal string is passed app breaks;
      const payload = JSON.parse(message.value.toString());

      if (isDevelopmentMode()) {
        logger.info('Event payload', payload);
      }
      await subscriber.handle(payload);
      await consumer.commitOffsets([
        { offset: message.offset, topic, partition },
      ]);
      logger.info('Processed event ' + subscriber.event);
    },
  });
}
