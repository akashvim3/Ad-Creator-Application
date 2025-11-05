// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const messageOverlay = document.getElementById('messageOverlay');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            console.log('Form submitted:', formData);

            // Show success message
            messageOverlay.classList.add('active');

            // Reset form
            contactForm.reset();
        });
    }
});

function closeMessage() {
    const messageOverlay = document.getElementById('messageOverlay');
    messageOverlay.classList.remove('active');
}
