import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";
import { env } from "node:process";

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []

    let slashCommandsDir = join(__dirname,"../commands")

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js")) return;
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default
        slashCommands.push(command.command)
        client.slashCommands.set(command.command.name, command)
    })

    const rest = new REST({version: "10"}).setToken(env.DISCORD_TOKEN!!)

    rest.put(Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID!!, env.DISCORD_GUILD_ID!!), {
        body: slashCommands.map(command => command.toJSON())
    })
        .then((data : any) => {
            console.log(`🔥 Chargement de ${data.length} slash command(s)`)
        }).catch(e => {
        console.log(e)
    })
}