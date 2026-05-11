module.exports = {
    customId: "server_info",

    async execute (interaction) {
        await interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://cdn.discordapp.com/attachments/1502490567056166932/1502490662849872002/SERVER_INFO.png?ex=6a0289f8&is=6a013878&hm=1e99c33705d2bbd2be835336900865ac3afe2ad93cb15adbc19e3e9f177b797b&"
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
          "content": "**Ocean Customs** is an ER:LC service hub which offers many fields of services to ensure your server receives the highest quality assets for the cheapest prices. Review the services we offer below.\n\n**Services**\n- Clothing\n- Liveries\n- Graphics\n- Bots\n- Discord"
        }
      ]
    }
  ]
})
    }
}