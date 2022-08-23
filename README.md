# TypeScript Discord.js Bot Template

## Getting Started
1. Setting up dotenv files.
    - Remove `.example` from the `test.env.example` and `.env.example` files.
2. Obtain a bot token and bot Id.
    - You'll need to create a new bot in your [Discord Developer Portal](https://discord.com/developers/applications/) application dashboard.
        - At the end you should have a **Bot Token**.
3. Modify the dotenv files.
    - Open the `.env` file.
    - Insert your **bot token** as the value of `DISCORD_TOKEN`.
    - Insert your **bot Id** as the value of `CLIENT_ID`.
    - Get your [MongoDB](https://mongodb.com/) connection URL or you can set it up locally.
    - Setup Redis locally (e.g. with [HomeBrew](https://brew.sh/) - `brew services start redis`) or insert a connection URL you can obtain [here](https://redis.com/).
4. Install the needed dependencies.
    - Navigate into the installed source files and type `npm install`.


## Setup
1. Copy example config files.
    - Navigate to the `config` folder of this project.
    - Copy all files ending in `.example.json` and remove the `.example` from the copied file names.
        - Ex: `config.example.json` should be copied and renamed as `config.json`.
2. Obtain a bot token.
    - You'll need to create a new bot in your [Discord Developer Portal](https://discord.com/developers/applications/).
        - See [here](https://www.writebots.com/discord-bot-token/) for detailed instructions.
        - At the end you should have a **bot token**.
3. Modify the config file.
    - Open the `config/config.json` file.
    - You'll need to edit the following values:
        - `client.id` - Your discord bot's [user ID](https://techswift.org/2020/04/22/how-to-find-your-user-id-on-discord/).
        - `client.token` - Your discord bot's token.
4. Install packages.
    - Navigate into the downloaded source files and type `npm install`.
5. Register commands.
    - In order to use application commands, they first [have to be registered](https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands).
    - Type `npm run deploy-commands` to register the bot's application commands globally.
        - Run this script any time you change a command name, structure, or add/remove commands, etc.
        - This is so Discord knows what your commands look like.
        - Command deployments should be almost instant whether it is being deployed in a guild or globally.

## Start Scripts
__**Disclaimer**__ We also have .replit and start.bat files you can use, but you must change the scripts yourselves if you do not want the one that is currently set.

### You can run the bot in multiple modes:
1. Normal Mode
    - Type `npm run start:bot`.
    - This starts a single instance of the bot.
2. Sharding Mode
    - Type `npm start`.
    - Starts the bot with sharding.
3. PM2 Mode
    - **Note**: You may have to run this as an `Administrator` in order to use this or you may get a `Permission Denied` error. This may apply to other scripts inside `package.json` and should be handled accordingly.
    - Type `npm run start:pm2`.
    - This is similar to Sharding Mode but it also uses [PM2](https://pm2.keymetrics.io/) to manage processes.