const {SlashCommandBuilder} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("quality")
    .setDescription("quality control stuff")
    .addSubcommand(subcommand => subcommand
        .setName("control")
        .setDescription("Request quality control to review your work.")
        .addChannelOption(option => option
            .setName("ticket")
            .setDescription("Select the ticket channel of the order.")
            .setRequired(true)

        )

    ),

    async execute (interaction) {
        const hasRole = interaction.member.roles.cache.has("1502473779790479390");
        const isAdmin = interaction.member.permissions.has("Administrator");
        if (!hasRole && !isAdmin) {
            return interaction.reply({content: "<:xMark:1502681150231941282> You do **not** have **permission** to run this command.", flags: 64})

        }
        const order = interaction.options.getChannel("ticket");
        const channel = interaction.guild.channels.cache.get("1502482220781146184");
        const msg = await channel.send({
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
                "url": "https://media.discordapp.net/attachments/1502490567056166932/1504739770809450676/image.png?ex=6a08159e&is=6a06c41e&hm=529b9f89340e84bbafa5c8df8fac79f3ab9b86b46300cdd1dacfc7f0beb63e70&=&format=webp&quality=lossless&width=550&height=163"
              }
            }
          ]
        },
        {
          "type": 10,
          "content": "<@&1504739931027673200>"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A quality control request has been submitted by ${interaction.user}. Ensure to review the request below by click the accept or deny button. A thread has been created where you can view the product the designer created. Only accept if the quality of the user's work is up to par, and there are no visible glitches or bugs with the product. Whether you accept or deny the work is **not** dependent on the client's perspective.\n\n**Order:** ${order}`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 1,
          "components": [
            {
              "style": 3,
              "type": 2,
              "label": "Accept",
              "custom_id": "qc_accept"
            },
            {
              "style": 4,
              "type": 2,
              "label": "Deny",
              "custom_id": "qc_deny"
            }
          ]
        }
      ]
    }
  ]
});

const thread = await msg.startThread({
    name: `qc-${interaction.user.username}`,
    autoArchiveDuration: 1440
});

await thread.send(`${interaction.user} Post your work for this order here.`);

await interaction.reply({
    content: "<:check:1502681323989504000> Successfully submitted quality control request.",
    flags: 64
});
    }
}