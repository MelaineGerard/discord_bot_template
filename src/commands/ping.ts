import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!")
    ,
    ownerOnly: true,
    execute:async interaction => {
        await interaction.editReply("🏓 Pong !")
    }
}

export default command