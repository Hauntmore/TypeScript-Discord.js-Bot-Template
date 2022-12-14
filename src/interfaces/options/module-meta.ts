import type { ModuleMetaType } from '../../enums';
import type Command from '../../structures/command';
import type { CacheType } from 'discord.js';

interface ModuleMetaPayload {
	readonly description: string;
	readonly type: ModuleMetaType;
	readonly version: string;
	readonly commands?: Command<CacheType, boolean>[] | undefined;
	readonly hidden?: boolean | undefined;
	readonly name?: string | undefined;
	readonly path?: string | undefined;
}

export { ModuleMetaPayload };
