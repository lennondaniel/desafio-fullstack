import { SQSEvent } from 'aws-lambda';
import { logger } from '../../helpers/logger';

export const handler = async (event: SQSEvent) => {
    for (const record of event.Records) {
        // handle messages
        console.log(record)
    }
};