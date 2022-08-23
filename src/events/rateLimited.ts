import chalk from 'chalk';
import { RateLimitError, RESTEvents } from 'discord.js';

import BaseEvent from '../structures/event';
import Logger from '../structures/logger';

const Event = RESTEvents.RateLimited;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description:
				'Emitted when the client hits a rate limit while making a request',
			rest: true,
		});
	}

	public run(
		...RateLimitData: Parameters<BaseEvent<typeof Event>['run']>
	): void {
		const error = new RateLimitError(...RateLimitData);

		Logger.warn(
			chalk.yellow(error.stack || error.message),
			chalk.bgYellow(JSON.stringify(RateLimitData)),
		);
	}
}
