module.exports = {
    name: "say",

    async execute (message, args) {
        const isAdmin = message.member.permissions.has("Administrator");
        if (!isAdmin) {
            return message.reply("<:xMark:1502681150231941282> You do not have permissions to run this command.")
        }

        const text = args.slice(0).join(" ")
        await message.delete();
        await message.channel.send(text)
    }
}