// Template Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const templateCards = document.querySelectorAll('.template-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            button.parentElement.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Filter templates
            const category = button.dataset.category;
            const platform = button.dataset.platform;

            templateCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const cardPlatform = card.dataset.platform;

                if ((category === 'all' || cardCategory === category) &&
                    (platform === 'all' || !platform || cardPlatform === platform)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
