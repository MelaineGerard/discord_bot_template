import { Client, Events } from "discord.js";
import { BotEvent } from "../types";

const event : BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        console.log(`💪 Connecté en tant que ${client.user?.tag}`)
    }
}

export default event;