const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  customId: "help_modal",

  async execute(interaction) {
    const CATEGORY_ID = "1502482277593125005";
    const STAFF_ROLE_IDS = ["1502473793497469009", "1502473777387147345"];

    const reason = interaction.fields.getTextInputValue("help_reason");

    const username = interaction.user.username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const existing = interaction.guild.channels.cache.find(
      c => c.topic === interaction.user.id
    );

    if (existing) {
      return interaction.reply({
        content: `<:xMark:1502681150231941282> You already have an open ticket: ${existing}`,
        flags: 64
      });
    }

    const staffRoles = STAFF_ROLE_IDS
      .map(roleId => interaction.guild.roles.cache.get(roleId))
      .filter(role => role);

    console.log("Resolved roles:", staffRoles.map(r => `${r.name} (${r.id})`));

    const overwrites = [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks
        ]
      },
      ...staffRoles.map(role => ({
        id: role.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks,
          PermissionFlagsBits.ManageChannels
        ]
      }))
    ];

    const channel = await interaction.guild.channels.create({
      name: `support-${username}`,
      type: ChannelType.GuildText,
      parent: CATEGORY_ID,
      topic: interaction.user.id,
      permissionOverwrites: overwrites
    });

    await interaction.reply({
  ephemeral: true,
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:check:1502681323989504000> Your ticket has been created successfully: ${channel}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1502490567056166932/1502490775034794145/footer.png?ex=6a028a13&is=6a013893&hm=67f88d74d4c227e450f242d35c70c509348e5a9d55f46b206f0c09da847a93a9&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

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
                "url": "https://media.discordapp.net/attachments/1502490567056166932/1502490662405411017/SUPPORT.png?ex=6a0289f8&is=6a013878&hm=9ee5daf9d6bfc2aefeb3edd5aac2c9457bacc328e978c23e1f7f03c136700936&=&format=webp&quality=lossless"
              }
            }
          ]
        },
        {
          "type": 10,
          "content": `-# ${interaction.user} | @everyone`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `<:bell:1503258490599374898> A new support ticket has been opened. Ensure to assist the user promptly.\n\nEnsure to review the following ticket guidelines below to avoid ticket closure and possible moderation\n\n**Ticket Guidelines**\n- Do not ping staff, they have already been notified of your ticket.\n- Remain respectful within your ticket.\n- Remain active within your ticket - no response after **24 hours** will result in ticket closure.\n- Your ticket may be closed for any reason deemed fit.\n\n**Inquiry:** ${reason}`
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
              "label": "Claim",
              "flow": {
                "actions": []
              },
              "custom_id": "claim"
            },
            {
              "style": 4,
              "type": 2,
              "label": "Close",
              "flow": {
                "actions": []
              },
              "custom_id": "close"
            }
          ]
        }
      ]
    }
  ]
});
  }
};