import chalk from 'chalk';
import { Events } from 'discord.js';

import BaseEvent from '../structures/event';

const Event = Events.Debug;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Events.Debug,
			description: 'Emitted for general debugging information.',
		});
	}

	public run(info: Parameters<BaseEvent<typeof Event>['run']>[0]): void {
		console.log(chalk.yellow(info));
	}
}
