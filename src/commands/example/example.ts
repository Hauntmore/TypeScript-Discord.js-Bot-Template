import type Client from '../../structures/client';
import { SlashCommandBuilder } from 'discord.js';

import BaseCommand from '../../structures/command';

const data = new SlashCommandBuilder()
	.setName('example')
	.setDescription('Example!')
	.setDMPermission(false);

export default class extends BaseCommand<'cached'> {
	private constructor(client: Client<boolean>) {
		super(client, { data });
	}

	public async chatInput(
		interaction: Parameters<BaseCommand<'cached'>['chatInput']>[0],
	): Promise<void> {
		// Note: You should add try/catch/finally statements only if you expect your code to throw an exception!
		await interaction.reply({
			content: 'Example command!',
		});
	}
}
