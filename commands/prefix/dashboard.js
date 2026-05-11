module.exports = {
    name: "dashboard",
    
    async execute (message) {
        const isAdmin = message.member.permissions.has("Administrator");
        if (!isAdmin) {
            return message.reply("<:xMark:1502681150231941282> You do not have permission to run this command.")

        }

        await message.delete();
        const channel = message.guild.channels.cache.get("1502478453050572921");
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
                "url": "https://media.discordapp.net/attachments/1502490567056166932/1502490628272165037/DASHBOARD.png?ex=6a008fb0&is=69ff3e30&hm=998a5b51fc2b75a6efbfae6e4bc80cdee9a75a62deb6598b0f77cceea373f458&=&format=webp&quality=lossless&width=1768&height=529"
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
          "content": "Welcome to **Ocean Customs** — your go-to ER:LC design server hub. Ocean Customs is a design server where you can receive top-notch products for the cheapest prices. Our designers are of the highest quality to ensure you receive the best products possible. Order today for an unforgettable order experience."
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
              "label": "Help",
              "custom_id": "help",
              "flow": {
                "actions": []
              }
            },
            {
              "style": 1,
              "type": 2,
              "label": "Server Info",
              "custom_id": "server_info",
              "flow": {
                "actions": []
              }
            },
            {
              "style": 2,
              "type": 2,
              "label": "Guidelines",
              "custom_id": "guidelines",
              "flow": {
                "actions": []
              }
            }
          ]
        }
      ]
    }
  ]
})
    }
}