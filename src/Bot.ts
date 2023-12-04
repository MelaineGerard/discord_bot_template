import { Client, GatewayIntentBits, Collection, } from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})
import { SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { env } from "node:process";
config()

client.slashCommands = new Collection<string, SlashCommand>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    if (!handler.endsWith(".js")) return;
    require(`${handlersDir}/${handler}`)(client)
})

client.login(env.DISCORD_TOKEN).catch(console.error)