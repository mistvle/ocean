module.exports = {
    customId: "qc_accept",

    async execute(interaction) {

        const data = JSON.parse(JSON.stringify(interaction.message.components));

        const container = data[0];

        // green sidebar
        container.accent_color = 5763719;

        const buttonRow = container.components.find(c => c.type === 1);

        buttonRow.components = [
            {
                style: 3,
                type: 2,
                label: "Accepted",
                custom_id: "qc_accepted",
                disabled: true
            }
        ];

        await interaction.update({
            flags: 32768,
            components: data
        });

        await interaction.followUp(`<:check:1502681323989504000> ${interaction.user} accepted this quality control request.`);
    }
}