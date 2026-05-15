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

        const thread = interaction.message.thread;

        if (thread) {

            await thread.send(
                `<:check:1502681323989504000> ${interaction.user} has accepted this quality control request.`
            );

            await thread.setLocked(true).catch(() => {});
            await thread.setArchived(true).catch(() => {});
        }
    }
}