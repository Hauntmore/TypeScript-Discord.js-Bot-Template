import type { CommandPayload } from '../interfaces';
import type Client from './client';
import type {
	Awaitable,
	CacheType,
	ChatInputCommandInteraction,
} from 'discord.js';

abstract class BaseCommand<
	Cache extends CacheType,
	Ready extends boolean = true,
> implements CommandPayload
{
	public readonly data: CommandPayload['data'];

	public readonly module?: CommandPayload['module'] | undefined;

	public constructor(
		protected readonly client: Client<Ready>,
		public readonly payload: CommandPayload,
	) {
		this.client = client;
		this.data = payload.data;
	}

	public abstract chatInput(
		interaction: ChatInputCommandInteraction<Cache>,
	): Awaitable<void>;
}

export default BaseCommand;
