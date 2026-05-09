const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("review")
    .setDescription("Leave a review for your recent order.")
    .addUserOption(option => option
        .setName("designer")
        .setDescription("Select the designer who completed your order.")
        .setRequired(true)

    )

    .addStringOption(option => option
        .setName("product")
        .setDescription("Select the product you ordered.")
        .addChoices(
            {name: "Liveries", value: "Liveries"},
            {name: "Clothing", value: "Clothing"},
            {name: "Bots", value: "Bots"},
            {name: "Graphics", value: "Graphics"},
            {name: "Discord", value: "Discord"}
        )
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("rating")
        .setDescription("Select the rating of your order experience.")
        .addChoices(
            {name: "⭐", value: "⭐"},
            {name: "⭐⭐", value: "⭐⭐"},
            {name: "⭐⭐⭐", value: "⭐⭐⭐"},
            {name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐"},
            {name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐"}

        )
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("feedback")
        .setDescription("Input feedback for your designer.")
        .setRequired(true)
    ),

    async execute (interaction) {
        const isClient = interaction.member.roles.cache.has("1502473819150094356");
        const isAdmin = interaction.member.permissions.has("Administrator");
        if (!isClient && !isAdmin) {
            return interaction.reply({content: "<:xMark:1502681150231941282> You must be a **client** to leave a review.", flags: 64})

        }

        const designer = interaction.options.getUser("designer");
        const product = interaction.options.getString("product");
        const rating = interaction.options.getString("rating");
        const feedback = interaction.options.getString("feedback");

        const channel = interaction.guild.channels.cache.get("1502479232205328475");
        await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1502490567056166932/1502684019803033620/image.png?ex=6a009b0c&is=69ff498c&hm=608a535b05495a6be10f866a713dd3dbc6dc38cdc7bb55fda696a4715ac1554b&=&format=webp&quality=lossless&width=550&height=163"
              }
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A new review has been submitted. ${interaction.user} is the client of this order.\n\n**Designer:** ${designer}\n**Product:** ${product}\n**Rating:** ${rating}\n**Feedback:** ${feedback}\n\nThank you for ordering with **Ocean Customs**. We hope you enjoyed your order experience.`
        }
      ]
    }
  ]
});
    await interaction.reply({content: "<:check:1502681323989504000> **Successfully** submitted review in <#1502479232205328475>.", flags: 64})
    }
}