module.exports = {
    name: "rename",
    async execute (message, args) {
        const REQUIRED_ROLE_ID = "1502473790498672741";
        const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);
        const isAdmin = message.permisions.has("Administrator");
        if (!isAdmin && !hasRole) {
            return message.reply("<:xMark:1502681150231941282>  You do not have permission to run this command.")

        }

        const name = args.slice(0).join(" ");
        await message.channel.setName(name);
        await message.reply(`<:check:1502681323989504000> Successfully renamed ticket to **${name}.**`)
    }
}