import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../structures/event';
import Logger from '../structures/logger';

const Event = Events.Debug;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Event,
			description: 'Emitted for general debugging information.',
		});
	}

	public run(...info: Parameters<BaseEvent<typeof Event>['run']>): void {
		Logger.debug(chalk.yellow(info));
	}
}
