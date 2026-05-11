const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const STAFF_ROLE_ID = "1499678975964745840";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket management")

    .addSubcommand(sub =>
      sub.setName("rename")
        .setDescription("Rename a ticket.")
        .addStringOption(opt =>
          opt.setName("name").setDescription("Input the new name of the ticket.").setRequired(true)
        )
    )

    .addSubcommand(sub =>
      sub.setName("add")
        .setDescription("Add a user or role to the ticket.")
        .addUserOption(opt => opt.setName("user").setDescription("Select the user to add."))
        .addRoleOption(opt => opt.setName("role").setDescription("Select the role to add."))
    )

    .addSubcommand(sub =>
      sub.setName("remove")
        .setDescription("Remove a user or role from the ticket.")
        .addUserOption(opt => opt.setName("user").setDescription("Select the user to remove."))
        .addRoleOption(opt => opt.setName("role").setDescription("Select the role to remove."))
    )

    .addSubcommand(sub =>
      sub.setName("close").setDescription("Close  the ticket.")
    )

    .addSubcommand(sub =>
      sub.setName("closerequest").setDescription("Send a close request.")
    ),

  async execute(interaction) {

    const sub = interaction.options.getSubcommand(); // ✅ FIXED typo
    const channel = interaction.channel; // ✅ FIXED undefined

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has("1502473790498672741");

    if (!hasRole && !isAdmin) {
      return interaction.reply("<:xMark:1502681150231941282>  You must be a staff member to use this command.");
    }

    if (!channel.topic || !/^\d+(\|\d+)?$/.test(channel.topic)) {
      return interaction.reply({
        content: "<:xMark:1502681150231941282> This command must be used in a ticket.",
        flags: 64
      });
    }

    if (sub === "rename") { // ✅ FIXED
      const name = interaction.options.getString("name");

      await channel.setName(name);

      return interaction.reply({
        content: `<:check:1502681323989504000> Successfully renamed ticket to ${name}.`,
        flags: 64
      });
    }

    if (sub === "add") {
      const user = interaction.options.getUser("user");
      const role = interaction.options.getRole("role");

      if (!user && !role) {
        return interaction.reply({
          content: "<:xMark:1502681150231941282> Failed to detect a valid user or role.",
          flags: 64
        });
      }

      if (user) {
        await channel.permissionOverwrites.edit(user.id, {
          ViewChannel: true,
          SendMessages: true
        });

        return interaction.reply({
          content: `<:check:1502681323989504000> Successfully added ${user} to the ticket.`,
          flags: 64
        });
      }

      if (role) {
        await channel.permissionOverwrites.edit(role.id, {
          ViewChannel: true,
          SendMessages: true
        });

        return interaction.reply({
          content: `<:check:1502681323989504000> Successfully added ${role} to the ticket.`,
          flags: 64
        });
      }
    }

    if (sub === "remove") {
      const user = interaction.options.getUser("user");
      const role = interaction.options.getRole("role");

      if (!user && !role) {
        return interaction.reply({
          content: "<:xMark:1502681150231941282> Failed to detect a valid user or role.",
          flags: 64
        });
      }

      if (user) {
        await channel.permissionOverwrites.delete(user.id);
        return interaction.reply({
          content: `<:check:1502681323989504000> Successfully removed ${user} from the ticket.`,
          flags: 64
        });
      }

      if (role) {
        await channel.permissionOverwrites.delete(role.id);
        return interaction.reply({
          content: `<:check:1502681323989504000> Successfully removed ${role} from the ticket.`,
          flags: 64
        });
      }
    }

const discordTranscripts = require("discord-html-transcripts");

if (sub === "close") {
  const [ownerId] = (channel.topic || "").split("|");

  await interaction.reply({
        "flags": 32832,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": "<a:loading:1503258813036232784> Closing ticket..."
              },
              { "type": 14, "spacing": 2 },
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

  const user = await interaction.client.users.fetch(ownerId).catch(() => null);
  if (user) {
    await user.send({
          "flags": 32768,
          "components": [
            {
              "type": 17,
              "components": [
                { "type": 10, "content": "# <:bell:1503258490599374898> Ticket Closed" },
                {
                  "type": 10,
                  "content": "Your ticket in **Ocean Customs** has been closed. If you need further assistance, do not hesitate to contact us again. We hope you enjoyed your experience with our team."
                },
                { "type": 14, "spacing": 2 },
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
        }).catch(() => {});
  }

  // =========================
  // GET INQUIRY
  // =========================
  const messages = await channel.messages.fetch({ limit: 10 });

  const panel = messages.find(m =>
    m.components?.[0]?.components?.some(c =>
      c.content?.includes("Inquiry:")
    )
  );

  let inquiry = "N/A";

  if (panel) {
    const textBlock = panel.components[0].components.find(c =>
      c.content?.includes("Inquiry:")
    );

    if (textBlock) {
      const match = textBlock.content.match(/\*\*Inquiry:\*\* (.+)/);
      if (match) inquiry = match[1];
    }
  }

  // =========================
  // TRANSCRIPT
  // =========================
  const attachment = await discordTranscripts.createTranscript(channel, {
    limit: -1,
    returnType: "attachment",
    filename: `transcript-${channel.id}.html`
  });

  const logChannel = interaction.guild.channels.cache.get("1502478191003045958");

  const embed = {
    title: "Ticket Closed",
    color: 4079169,
    image: {
      url: "https://media.discordapp.net/attachments/1502490567056166932/1502490775034794145/footer.png?ex=6a028a13&is=6a013893&hm=67f88d74d4c227e450f242d35c70c509348e5a9d55f46b206f0c09da847a93a9&=&format=webp&quality=lossless"
    },
    description:
`A ticket has been closed. Review information regarding it below.

**Channel Name:** ${channel.name}
**Channel ID:** ${channel.id}
**Inquiry:** ${inquiry || "N/A"}

**Opened By:** <@${ownerId}>
**Closed By:** ${interaction.user}`
  };

  await logChannel.send({
    embeds: [embed],
    files: [attachment]
  });

  setTimeout(() => {
    channel.delete().catch(() => {});
  }, 2000);
}

if (sub === "closerequest") {

  const [userId] = (channel.topic || "").split("|");

  return channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# <:bell:1503258490599374898> Close Request\n-# <@${userId}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "Our team feels you do not need further support within this ticket. If you do not need further support, please click the 'Close' button below. If you would like this ticket to remain open, please click the 'Keep Open' button to notify our team that you still need support."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 1,
          "components": [
            {
              "style": 4,
              "type": 2,
              "label": "Close",
              "flow": {
                "actions": []
              },
              "custom_id": "close"
            },
            {
              "style": 2,
              "type": 2,
              "label": "Keep Open",
              "flow": {
                "actions": []
              },
              "custom_id": "keep_open"
            }
          ]
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
}
  }
};