module.exports = {
    name: "tax",
    
    async execute (message, args) {
        const amount = args[0];
        const newAmount = price = Math.ceil(amount / 0.7);

        await message.reply(`To receive **${amount} ROBUX**, you must charge **${newAmount} ROBUX**.`)
    }
}