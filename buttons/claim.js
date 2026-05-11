module.exports = {
  customId: "claim",

  async execute(interaction) {

    const STAFF_ROLE_ID = "1502473790498672741";

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has(STAFF_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "<:xMark:1502681150231941282>  You must be a staff member to claim this ticket.",
        flags: 64
      });
    }

    const channel = interaction.channel;
    const msg = interaction.message;

    let topic = channel.topic || "";
    let [ownerId, claimerId] = topic.split("|");

    const components = JSON.parse(JSON.stringify(msg.components));
    const container = components[0];

    const buttonRow = container.components.find(c => c.type === 1);
    if (!buttonRow) return interaction.deferUpdate();

    const claimBtn = buttonRow.components.find(b => b.custom_id === "claim");
    if (!claimBtn) return interaction.deferUpdate();

    // =========================
    // CLAIM
    // =========================
    if (!claimerId) {

      claimerId = interaction.user.id;
      await channel.setTopic(`${ownerId}|${claimerId}`);

      claimBtn.label = "Unclaim";
      claimBtn.style = 4;
      container.accent_color = 0x3E3E41;

      await interaction.update({
        components
      });

      await channel.send({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `<:check:1502681323989504000> Your ticket has been **claimed** by ${interaction.user}.`
              }
            ]
          }
        ]
      });

    }

    // =========================
    // UNCLAIM
    // =========================
    else {

      if (claimerId !== interaction.user.id && !isAdmin) {
        return interaction.reply({
          content: "<:xMark:1502681150231941282>  Only the user who has claimed the ticket can unclaim it.",
          flags: 64
        });
      }

      await channel.setTopic(ownerId);

      claimBtn.label = "Claim";
      claimBtn.style = 3;
      container.accent_color = 0x3E3E41;

      await interaction.update({
        components
      });

      await channel.send({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `<:xMark:1502681150231941282>  Your ticket has been **unclaimed** by ${interaction.user}.`
              }
            ]
          }
        ]
      });
    }

  }
};