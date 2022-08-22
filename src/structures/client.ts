import type { Events, ModuleMetaPayload } from '../interfaces';
import type Command from './command';
import type BaseEvent from './event';
import chalk from 'chalk';
import {
	type APIEmbed,
	Client,
	type ClientEvents,
	type ClientOptions,
	Collection,
	EmbedBuilder,
	type EmbedData,
	type RestEvents,
} from 'discord.js';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

class MyClient<Ready extends boolean = boolean> extends Client<Ready> {
	public readonly commands: Collection<string, Command>;

	public readonly events: Collection<Events, BaseEvent<Events>>;

	public readonly modules: Collection<string, ModuleMetaPayload>;

	public constructor(override readonly options: ClientOptions) {
		super(options);

		this.commands = new Collection<string, Command>();
		this.events = new Collection<Events, BaseEvent<Events>>();
		this.modules = new Collection<string, ModuleMetaPayload>();
	}

	private async _loadEvents(
		eventsDirectoryGlobPattern: string = '**/*.js',
	): Promise<Collection<Events, BaseEvent<Events>>> {
		const glob = promisify((await import('glob')).default);

		const files = await glob(
			`${join(__dirname, '..')}/events/${eventsDirectoryGlobPattern}`,
		);

		for (const file of files) {
			delete require.cache[file];

			const File = (await import(file)).default.default;

			const event = new File() as BaseEvent<Events>;

			if (event.once) {
				this.once(
					event.name as keyof ClientEvents,
					async (...args) => await event.run(...args),
				);
			} else if (event.rest) {
				// Rest events should not be listened with <EventEmitter>#once so there will be no check for it.
				this.rest.on(
					event.name as keyof RestEvents,
					async (...args) => await event.run(...args),
				);
			} else {
				this.on(
					event.name as keyof ClientEvents,
					async (...args) => await event.run(...args),
				);
			}

			this.events.set(event.name, event);

			console.log(
				chalk.magenta(`The ${chalk.blue(event.name)} event has loaded.`),
			);
		}

		return this.events;
	}

	private async _loadCommands(
		moduleMetaFileName: string = 'module.meta.js',
	): Promise<Collection<string, Command>> {
		const baseCommandsDirectoryPath = resolve(__dirname, '..', 'commands');

		const modules = await readdir(baseCommandsDirectoryPath);

		for (const module of modules) {
			const metaPath = resolve(baseCommandsDirectoryPath, module);

			const moduleMeta = (await import(resolve(metaPath, moduleMetaFileName)))
				.default as ModuleMetaPayload;

			Object.assign(moduleMeta, {
				name: moduleMeta.name || module,
				commands: moduleMeta.commands || [],
				hidden: moduleMeta.hidden || false,
				path: moduleMeta.path || metaPath,
			});

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.modules.set(moduleMeta.name!, moduleMeta);

			console.log(
				chalk.magenta(`Loaded the ${chalk.blue(moduleMeta.name)} module.`),
			);

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const files = await readdir(resolve(moduleMeta.path!));

			for (const file of files) {
				delete require.cache[file];

				if (file.endsWith(moduleMetaFileName)) {
					continue;
				} else {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const resolvedFilePath = resolve(moduleMeta.path!, file);

					const Command = (await import(resolvedFilePath)).default.default;

					const command = new Command(this) as Command;

					Object.assign(command, {
						module: moduleMeta,
					});

					this.commands.set(command.data.name, command);

					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					moduleMeta.commands!.push(command);

					console.log(
						chalk.magenta(
							`The command ${chalk.blue(
								`${command.data.name}.js`,
							)} has loaded.`,
						),
					);
				}
			}
		}

		return this.commands;
	}

	public makeEmbed(data?: EmbedData | APIEmbed | undefined): EmbedBuilder {
		// The embed color is matching with the regular Discord background color (considered "invisible").
		return new EmbedBuilder(data).setColor('#2f3136');
	}

	public async connect(token?: string | undefined): Promise<string> {
		await this._loadEvents();
		await this._loadCommands();

		return await super.login(token);
	}
}

export default MyClient;
