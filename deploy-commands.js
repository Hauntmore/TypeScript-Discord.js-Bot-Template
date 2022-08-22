process.env['NODE_ENV'] ??= 'development';

const chalk = require('chalk');
const { REST, Routes } = require('discord.js');
const { config } = require('dotenv');
const { promisify } = require('node:util');

config({
	path: process.env['NODE_ENV'] === 'development' ? 'test.env' : 'env',
});

const glob = promisify(require('glob'));

const commands = [];

const version = 10;

const rest = new REST({ version }).setToken(process.env['DISCORD_TOKEN']);

(async (moduleMetaFileName, pattern) => {
	try {
		const files = await glob(`${process.cwd()}/dist/src/commands/${pattern}`);

		for (const file of files) {
			delete require.cache[file];

			if (file.endsWith(moduleMetaFileName)) {
				continue;
			} else {
				const Command = require(file).default;

				const command = new Command(null);

				commands.push(command.data.toJSON());

				console.log(
					chalk`{magenta The command ${chalk`{blue ${command.data.name}.js}`} has loaded.}`,
				);
			}
		}

		await rest.put(Routes.applicationCommands(process.env['CLIENT_ID']), {
			body: commands,
		});
	} catch (error) {
		console.error(chalk.red(error.stack || error.message));
	}
})('module.meta.js', '**/*.js');
