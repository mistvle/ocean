module.exports = {
  name: "close",

  async execute(message) {

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has("1502473793497469009");

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:xMark:1502681150231941282> You do not have permission to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!message.channel.topic || !/^\d+$/.test(message.channel.topic)) {
      return message.reply({
        content: "<:xMark:1502681150231941282> You can only close a ticket channel.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {
      const user = await message.client.users
        .fetch(message.channel.topic)
        .catch(() => null);

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

      await message.delete().catch(() => {});

      await message.channel.send({
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

      setTimeout(async () => {
        await message.channel.delete().catch(() => {});
      }, 3000);

    } catch (err) {
      console.error(err);

      return message.reply({
        content: "<:xMark:1502681150231941282>  An error occurred.",
        allowedMentions: { repliedUser: false }
      });
    }
  }
};