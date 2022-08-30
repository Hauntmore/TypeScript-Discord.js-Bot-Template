import type { ModuleMetaPayload } from '..';
import type {
	SlashCommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

interface CommandPayload {
	readonly data:
		| SlashCommandBuilder
		| SlashCommandSubcommandsOnlyBuilder
		| SlashCommandSubcommandGroupBuilder;

	readonly module?: ModuleMetaPayload | undefined;
}

export { CommandPayload };
