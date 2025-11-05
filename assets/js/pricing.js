// Pricing Page - Billing Toggle
document.addEventListener('DOMContentLoaded', () => {
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');

    if (billingToggle) {
        billingToggle.addEventListener('change', () => {
            const isAnnual = billingToggle.checked;

            monthlyPrices.forEach(price => {
                price.style.display = isAnnual ? 'none' : 'inline';
            });

            annualPrices.forEach(price => {
                price.style.display = isAnnual ? 'inline' : 'none';
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
