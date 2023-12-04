import {
    Interaction,
    Events,
} from "discord.js";
import {BotEvent} from "../types";
import {env} from "node:process";

const event: BotEvent = {
    name: Events.InteractionCreate,
    execute: async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            let command = interaction.client.slashCommands.get(interaction.commandName)
            if (!command) return;

            if (command.ownerOnly && !env.DISCORD_OWNER_IDS?.split(',').includes(interaction.user.id)) return interaction.reply("Tu n'as pas la permission d'utiliser cette commande.");

            await interaction.deferReply({
                ephemeral: true
            })

            command.execute(interaction)
        }
    }
}

export default event;