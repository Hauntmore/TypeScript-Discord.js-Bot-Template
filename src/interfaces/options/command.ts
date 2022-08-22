import type { ModuleMetaPayload } from '../index';
import type { SlashCommandBuilder } from 'discord.js';

interface CommandPayload {
	readonly data: Omit<
		SlashCommandBuilder,
		'addSubcommand' | 'addSubcommandGroup'
	>;

	readonly module?: ModuleMetaPayload | undefined;
}

export { CommandPayload };
