module.exports = {
    name: "affiliations",

    async execute (message) {
        const isAdmin = message.member.permissions.has("Administrator");
        if (!isAdmin) {
            return;
        }

        const channel = message.guid.channels.cache.get("1502478471568556142");
        await message.delete();
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
                "url": "https://media.discordapp.net/attachments/1502490567056166932/1502490750498242660/AFFILIATIONS.png?ex=6a03db8d&is=6a028a0d&hm=3848f0259b55a0ae01ac973b3d9f2d4fb4c6fe764a535798ff937c321fc90fc1&=&format=webp&quality=lossless"
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
          "content": "Our affiliates are carefully handpicked by our **Executive Team** to ensure the quality of the servers we choose to endorse. While we endorse the servers we affiliate with, we do not encourage or affiliate with any misconduct or scandals related to affiliated servers."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 1,
          "components": [
            {
              "type": 3,
              "custom_id": "p_301235936971198466",
              "options": [
                {
                  "label": "a",
                  "value": "zpytfXdakA",
                  "description": "a"
                }
              ],
              "placeholder": "Current Affiliates",
              "min_values": 1,
              "max_values": 1,
              "disabled": true,
              "id": 7,
              "flows": {}
            }
          ]
        }
      ]
    }
  ]
})
    }
}