import { Events, InteractionType } from 'discord.js';

import BaseEvent from '../structures/event';

const Event = Events.InteractionCreate;

export default class extends BaseEvent<typeof Event> {
	public constructor() {
		super({
			name: Events.InteractionCreate,
			description: 'Emitted when an interaction is created.',
		});
	}

	public async run(
		interaction: Parameters<BaseEvent<typeof Event>['run']>[0],
	): Promise<void> {
		if (
			interaction.type === InteractionType.ApplicationCommand &&
			interaction.isChatInputCommand()
		) {
			const commandName = interaction.commandName;

			const command = this.client.commands.get(commandName);

			if (!command) return;

			await command.chatInput(interaction);
		} else {
			return;
		}
	}
}
