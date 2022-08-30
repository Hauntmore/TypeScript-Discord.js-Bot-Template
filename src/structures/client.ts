import type { Events, ModuleMetaPayload } from '../interfaces';
import type Command from './command';
import type BaseEvent from './event';
import chalk from 'chalk';
import {
	type APIEmbed,
	type CacheType,
	Client,
	type ClientEvents,
	type ClientOptions,
	Collection,
	EmbedBuilder,
	type EmbedData,
	type RestEvents,
} from 'discord.js';
import { readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { promisify } from 'node:util';

import Logger from './logger';

class MyClient<Ready extends boolean = boolean> extends Client<Ready> {
	public readonly commands: Collection<string, Command<CacheType, boolean>>;

	public readonly events: Collection<Events, BaseEvent<Events, boolean>>;

	public readonly modules: Collection<string, ModuleMetaPayload>;

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	public constructor(override readonly options: ClientOptions) {
		super(options);

		this.commands = new Collection<string, Command<CacheType, boolean>>();
		this.events = new Collection<Events, BaseEvent<Events, boolean>>();
		this.modules = new Collection<string, ModuleMetaPayload>();
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

	private async _loadEvents(
		eventsDirectoryGlobPattern: string = '**/*.js',
	): Promise<Collection<Events, BaseEvent<Events, boolean>>> {
		const glob = promisify((await import('glob')).default);

		const files = await glob(
			`${join(__dirname, '..')}/events/${eventsDirectoryGlobPattern}`,
		);

		for (const file of files) {
			delete require.cache[file];

			const { name } = parse(file);

			const Event = (await import(file)).default.default;

			const event = new Event() as BaseEvent<Events, boolean>;

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

			Logger.info(
				chalk.magenta(`The ${chalk.blue(`${name}.js`)} event has loaded.`),
			);
		}

		return this.events;
	}

	private async _loadCommands(
		moduleMetaFileName: string = 'module.meta.js',
	): Promise<Collection<string, Command<CacheType, boolean>>> {
		const baseCommandsPath = join(__dirname, '..', 'commands');

		const modules = await readdir(baseCommandsPath);

		for (const module of modules) {
			const metaPath = join(baseCommandsPath, module);

			const moduleMeta = (await import(join(metaPath, moduleMetaFileName)))
				.default as ModuleMetaPayload;

			Object.assign(moduleMeta, {
				name: moduleMeta.name || module,
				path: moduleMeta.path || metaPath,
			});

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.modules.set(moduleMeta.name!, moduleMeta);

			Logger.info(
				chalk.magenta(`Loaded the ${chalk.blue(`${module}.js`)} module.`),
			);

			const commands = [];

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const files = await readdir(moduleMeta.path!);

			for (const file of files) {
				delete require.cache[file];

				if (file.endsWith(moduleMetaFileName)) {
					continue;
				} else {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const resolvedFilePath = join(moduleMeta.path!, file);

					const Command = (await import(resolvedFilePath)).default.default;

					const command = new Command(this) as Command<CacheType, boolean>;

					Object.defineProperty(command, 'module', {
						value: command.module || moduleMeta,
					});

					if (!command.module) {
						throw new Error(
							`${file}.js is missing a module, either assign a ${chalk.bold(
								'module.meta.ts',
							)} file in the directory of the command file or assign the command a ${chalk.bold(
								'module',
							)} property with the module data.`,
						);
					}

					commands.push(Command);

					this.commands.set(command.data.name, command);

					Logger.info(
						chalk.magenta(
							`The command ${chalk.blue(`${file}.js`)} has loaded.`,
						),
					);
				}
			}

			Object.assign(moduleMeta, {
				commands: moduleMeta.commands || [],
				hidden: moduleMeta.hidden || false,
			});
		}

		return this.commands;
	}
}

export default MyClient;
