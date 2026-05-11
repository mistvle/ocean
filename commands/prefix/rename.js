module.exports = {
  name: "rename",

  async execute(message, args) {
    if (message.author.bot) return;

    const STAFF_ROLE_IDS = "1502473790498672741";

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(STAFF_ROLE_IDS);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:xMark:1502681150231941282> You do not have permission to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!message.channel.topic) {
      return message.reply({
        content: "<:xMark:1502681150231941282> This channel is not a ticket channel.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!/^\d+$/.test(message.channel.topic)) {
      return message.reply({
        content: "<:xMark:1502681150231941282> You can only rename ticket channels.",
        allowedMentions: { repliedUser: false }
      });
    }

    const newName = args.slice(0).join(" ");

    if (!newName) {
      return message.reply({
        content: "<:xMark:1502681150231941282> Failed to detect a valid new ticket name.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {
      await message.channel.setName(newName);

      await message.reply(`<:check:1502681323989504000> Successfully renamed ticket to ${newName}.`);
    } catch (err) {
      console.error(err);

      return message.reply({
        content: "<:xMark:1497479677755785379> An eror occured.",
        allowedMentions: { repliedUser: false }
      });
    }
  }
};