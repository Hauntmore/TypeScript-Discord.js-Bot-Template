const chalk = require('chalk');
const { REST, Routes } = require('discord.js');
const path = require('node:path');
const { promisify } = require('node:util');
require('./src/setup');

const Logger = require('./src/structures/logger').default;

const glob = promisify(require('glob'));

const commands = [];

const version = 10;

const rest = new REST({ version }).setToken(process.env['DISCORD_TOKEN']);

(async (moduleMetaFileName = 'module.meta.js', pattern = '**/*.js') => {
	try {
		const files = await glob(
			path.join(process.cwd(), 'dist', 'src', 'commands', pattern),
		);

		for (const file of files) {
			delete require.cache[file];

			if (file.endsWith(moduleMetaFileName)) {
				continue;
			} else {
				const Command = require(file).default;

				const command = new Command(null);

				commands.push(command.data.toJSON());

				Logger.info(
					chalk`{magenta The command ${chalk`{blue ${command.data.name}.js}`} has loaded.}`,
				);
			}
		}

		await rest.put(Routes.applicationCommands(process.env['CLIENT_ID']), {
			body: commands,
		});

		Logger.info(chalk.blue('Successful deployment.'));
	} catch (error) {
		Logger.error(chalk.red(error.stack || error.message));
	}
})();
