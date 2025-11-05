// Ad Generator - AI-Powered Ad Creation
class AdGenerator {
    constructor() {
        this.form = document.getElementById('customerProfileForm');
        this.generateBtn = document.getElementById('generateAdBtn');
        this.previewContainer = document.getElementById('adPreviewContainer');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.init();
    }

    init() {
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => this.generateAd());
        }

        const refreshBtn = document.getElementById('refreshAd');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.regenerateAd());
        }

        const downloadBtn = document.getElementById('downloadAd');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadAd());
        }
    }

    async generateAd() {
        // Collect form data
        const profile = this.collectCustomerProfile();

        // Validate inputs
        if (!this.validateProfile(profile)) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Show loading
        this.showLoading();

        // Simulate AI processing (replace with actual API call)
        setTimeout(() => {
            const adContent = this.createAdContent(profile);
            this.displayAd(adContent);
            this.showAdAnalytics(adContent);
            this.hideLoading();
            this.showNotification('Ad generated successfully!', 'success');
        }, 2500);
    }

    collectCustomerProfile() {
        return {
            targetAudience: document.getElementById('targetAudience').value,
            ageRange: document.getElementById('ageRange').value,
            gender: document.getElementById('gender').value,
            interests: document.getElementById('interests').value,
            painPoints: document.getElementById('painPoints').value,
            productService: document.getElementById('productService').value,
            keyBenefits: document.getElementById('keyBenefits').value,
            ctaType: document.getElementById('ctaType').value,
            tone: document.getElementById('tone').value,
            platforms: Array.from(document.querySelectorAll('input[name="platform"]:checked'))
                .map(cb => cb.value)
        };
    }

    validateProfile(profile) {
        return profile.targetAudience &&
               profile.productService &&
               profile.keyBenefits &&
               profile.platforms.length > 0;
    }

    createAdContent(profile) {
        // AI-powered content generation logic
        const headlines = this.generateHeadlines(profile);
        const descriptions = this.generateDescriptions(profile);
        const ctas = this.generateCTAs(profile);

        return {
            headline: headlines[0],
            description: descriptions[0],
            cta: ctas[0],
            profile: profile,
            variants: {
                headlines: headlines,
                descriptions: descriptions,
                ctas: ctas
            }
        };
    }

    generateHeadlines(profile) {
        const toneMap = {
            professional: [
                `Transform Your ${profile.productService} Experience`,
                `Discover Premium ${profile.productService} Solutions`,
                `Elevate Your Business with ${profile.productService}`
            ],
            casual: [
                `You're Gonna Love This ${profile.productService}!`,
                `Finally, a ${profile.productService} That Gets You`,
                `Meet Your New Favorite ${profile.productService}`
            ],
            enthusiastic: [
                `🚀 Revolutionary ${profile.productService} is Here!`,
                `Amazing ${profile.productService} You Can't Miss!`,
                `Game-Changing ${profile.productService} Alert!`
            ],
            urgent: [
                `⏰ Limited Time: ${profile.productService} Deal`,
                `Don't Miss Out on ${profile.productService}`,
                `Last Chance for ${profile.productService} Offer`
            ],
            friendly: [
                `Hey There! Check Out Our ${profile.productService}`,
                `We Think You'll Love This ${profile.productService}`,
                `Something Special for You: ${profile.productService}`
            ]
        };

        return toneMap[profile.tone] || toneMap.professional;
    }

    generateDescriptions(profile) {
        const benefits = profile.keyBenefits.split(',')[0] || 'amazing benefits';
        const audience = profile.targetAudience || 'people like you';

        const templates = [
            `Designed specifically for ${audience}. ${benefits}. Join thousands of satisfied customers who've made the switch.`,
            `${benefits}. Perfect for ${audience}. Experience the difference today and see why everyone is talking about it.`,
            `Why do ${audience} love us? ${benefits}. Plus, we're offering exclusive deals just for you.`
        ];

        return templates;
    }

    generateCTAs(profile) {
        const ctaMap = {
            buy: ['Shop Now', 'Buy Today', 'Get Yours Now'],
            learn: ['Learn More', 'Discover How', 'Find Out More'],
            signup: ['Sign Up Free', 'Join Now', 'Get Started'],
            download: ['Download Now', 'Get the App', 'Install Today'],
            contact: ['Contact Us', 'Get in Touch', 'Talk to Us']
        };

        return ctaMap[profile.ctaType] || ctaMap.learn;
    }

    displayAd(adContent) {
        // Create visual ad preview
        const adHTML = `
            <div class="generated-ad">
                <div class="generated-ad-header">
                    <div class="generated-ad-badge">${adContent.profile.platforms[0]}</div>
                </div>
                <h2 class="generated-ad-headline">${adContent.headline}</h2>
                <p class="generated-ad-description">${adContent.description}</p>
                <a href="#" class="generated-ad-cta">${adContent.cta}</a>
                <div class="generated-ad-footer">
                    <span>Sponsored</span>
                </div>
            </div>
        `;

        this.previewContainer.innerHTML = adHTML;

        // Display ad copy variants
        document.getElementById('headlineText').textContent = adContent.headline;
        document.getElementById('descriptionText').textContent = adContent.description;
        document.getElementById('ctaText').textContent = adContent.cta;

        // Show sections
        document.getElementById('adCopySection').style.display = 'block';
        document.getElementById('aiInsights').style.display = 'block';
        document.getElementById('exportOptions').style.display = 'block';
    }

    showAdAnalytics(adContent) {
        // Simulate AI analytics
        const engagementScore = (Math.random() * 30 + 70).toFixed(1);
        const readability = ['Easy', 'Moderate', 'Advanced'][Math.floor(Math.random() * 3)];
        const emotionalAppeal = ['High', 'Medium', 'Strong'][Math.floor(Math.random() * 3)];

        document.getElementById('engagementScore').textContent = engagementScore + '%';
        document.getElementById('readability').textContent = readability;
        document.getElementById('emotionalAppeal').textContent = emotionalAppeal;
    }

    regenerateAd() {
        this.generateAd();
    }

    downloadAd() {
        this.showNotification('Preparing download...', 'info');
        // Implement actual download logic here
    }

    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    showNotification(message, type) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#43e97b' : type === 'error' ? '#f5576c' : '#4facfe'};
            color: white;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Copy text function
function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(event.target);
    });
}

function showCopyFeedback(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = '#43e97b';
    button.style.borderColor = '#43e97b';
    button.style.color = 'white';

    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
}

// Export functions
function exportAd(format) {
    console.log(`Exporting ad as ${format}...`);
    alert(`Exporting ad as ${format}. This feature will download your ad in the selected format.`);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('generateAdBtn')) {
        new AdGenerator();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .generated-ad-badge {
        display: inline-block;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 16px;
    }

    .generated-ad-footer {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        font-size: 12px;
        opacity: 0.7;
    }
`;
document.head.appendChild(style);
