module.exports = {
  name: "guildMemberAdd",

  async execute(member) {

    const channel = member.guild.channels.cache.get("1502479721701707877");

    if (channel) {
      channel.send({
  "content": `<:wave:1503639751465631745> Welcome ${member} to **Ocean Customs** — your go-to ER:LC service hub provider. If you're looking to order top-notch products for the cheapest prices, order today in our [services](https://discord.com/channels/1502473705127809044/1502479201326858461) channel.`,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 2,
          "type": 2,
          "label": `${member.guild.memberCount}`,
          "emoji": {
            "id": "1502684333209817149",
            "name": "m_Heart",
            "animated": false
          },
          "disabled": true,
          "flow": {
            "actions": []
          },
          "custom_id": "p_301237153558433793"
        },
        {
          "type": 2,
          "style": 5,
          "label": "Dashboard",
          "url": "https://discord.com/channels/1502473705127809044/1502478453050572921",
        }
      ]
    }
  ]
});
    }


  }
};