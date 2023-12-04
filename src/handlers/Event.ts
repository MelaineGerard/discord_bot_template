import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../types";

module.exports = (client: Client) => {
    let eventsDir = join(__dirname, "../listeners")

    readdirSync(eventsDir).forEach(file => {
        if (!file.endsWith(".js")) return;
        let event: BotEvent = require(`${eventsDir}/${file}`).default
        event.once ?
            client.once(event.name, (...args) => event.execute(...args))
            :
            client.on(event.name, (...args) => event.execute(...args))
        console.log(`🌠 Chargement de ${event.name} events !`)
    })
}