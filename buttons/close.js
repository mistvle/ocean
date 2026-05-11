const discordTranscripts = require("discord-html-transcripts");

module.exports = {
  customId: "close",

  async execute(interaction) {

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has("1502473793497469009");

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "<:xMark:1502681150231941282> You must be a staff member to close this ticket.",
        flags: 64
      });
    }

    // ✅ FIX: allow claimed + unclaimed tickets
    if (!interaction.channel.topic || !/^\d+(\|\d+)?$/.test(interaction.channel.topic)) {
      return interaction.reply({
        content: "<:xMark:1502681150231941282> You can only close a ticket.",
        flags: 64
      });
    }

    try {

      const channel = interaction.channel; // ✅ FIX
      const [ownerId] = (channel.topic || "").split("|"); // ✅ FIX

      const user = await interaction.client.users
        .fetch(ownerId)
        .catch(() => null);

      // =========================
      // DM USER (FULL — YOUR IMAGE KEPT)
      // =========================
      if (user) {
        await user.send({
          "flags": 32768,
          "components": [
            {
              "type": 17,
              "components": [
                {
                  "type": 10,
                  "content": "# <:bell:1503258490599374898> Ticket Closed"
                },
                {
                  "type": 10,
                  "content": "Your ticket in **Oecan Customs** has been closed. If you need further assistance, do not hesitate to contact us again. We hope you enjoyed your experience with our team."
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
                        "url": "https://media.discordapp.net/attachments/1500372374963621898/1501450044153397331/footer.png?ex=69fc1dd2&is=69facc52&hm=37192683e68e7458ba1a797dc8b531fa9bc6c7e0d8b2447062136e68ec3e6ccd&=&format=webp&quality=lossless"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }).catch(() => {});
      }

      await interaction.reply({
        content: "<a:loading:1503258813036232784> Closing ticket...",
        flags: 64
      });

      const logChannel = interaction.guild.channels.cache.get("1502478191003045958");

      // =========================
      // GET INQUIRY FROM PANEL
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

      // =========================
      // LOG EMBED (YOUR DESIGN KEPT)
      // =========================
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

      // =========================
      // DELETE CHANNEL
      // =========================
      setTimeout(() => {
        channel.delete().catch(() => {});
      }, 3000);

    } catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "<:xMark:1502681150231941282> An error occurred.",
          flags: 64
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: "<:xMark:1502681150231941282> An error occurred.",
          flags: 64
        }).catch(() => {});
      }
    }
  }
};