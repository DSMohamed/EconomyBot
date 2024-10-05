const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    // Check if the message author has permission to ban members
    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.channel.send("❌ | You don't have permission to ban members.");
    }

    // Check if a user was mentioned
    const userToBan = message.mentions.members.first();
    if (!userToBan) {
        return message.channel.send("❌ | Please mention a valid user to ban.");
    }

    // Check if the user can be banned (e.g., higher rank or bot's permission)
    if (!userToBan.bannable) {
        return message.channel.send("❌ | I can't ban this user.");
    }

    // Get the reason for the ban or set a default reason
    const reason = args.slice(1).join(' ') || 'No reason provided';

    // Ban the user
    try {
        await userToBan.ban({ reason });

        // Create an embed for the ban confirmation message
        const embed = new MessageEmbed()
            .setTitle("User Banned")
            .setDescription(`**${userToBan.user.tag}** has been banned.`)
            .addField("Banned by", message.author.tag)
            .addField("Reason", reason)
            .setColor("RED")
            .setThumbnail(userToBan.user.displayAvatarURL())
            .setTimestamp();

        return message.channel.send(embed);

    } catch (error) {
        console.error(error);
        return message.channel.send("❌ | There was an error banning this user.");
    }
}

exports.help = {
    name: "ban",
    aliases: [],
    usage: `ban @user [reason]`
};
