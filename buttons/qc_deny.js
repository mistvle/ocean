module.exports = {
    customId: "qc_deny",

    async execute(interaction) {

        const data = JSON.parse(JSON.stringify(interaction.message.components));

        const container = data[0];

        // red sidebar
        container.accent_color = 15548997;

        const buttonRow = container.components.find(c => c.type === 1);

        buttonRow.components = [
            {
                style: 4,
                type: 2,
                label: "Denied",
                custom_id: "qc_denied",
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
                `<:xMark:1502681150231941282> ${interaction.user} has denied this quality control request.`
            );

            await thread.setLocked(true).catch(() => {});
            await thread.setArchived(true).catch(() => {});
        }
    }
}