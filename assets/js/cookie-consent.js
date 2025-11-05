// GDPR Cookie Consent Banner
class CookieConsent {
    constructor() {
        this.cookieName = 'ai_adcreator_consent';
        this.cookieExpiry = 365; // days
        this.init();
    }

    init() {
        if (!this.hasConsent()) {
            this.showBanner();
        }
    }

    hasConsent() {
        return localStorage.getItem(this.cookieName) !== null;
    }

    showBanner() {
        const bannerHTML = `
            <div class="cookie-consent" id="cookieConsent">
                <div class="cookie-content">
                    <div class="cookie-icon">
                        <i class="fas fa-cookie-bite"></i>
                    </div>
                    <div class="cookie-text">
                        <h4>We value your privacy</h4>
                        <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
                        <a href="privacy-policy.html" class="cookie-link">Learn more about our Privacy Policy</a>
                    </div>
                    <div class="cookie-actions">
                        <button class="btn-cookie-settings" id="cookieSettings">
                            Cookie Settings
                        </button>
                        <button class="btn-cookie-reject" id="cookieReject">
                            Reject All
                        </button>
                        <button class="btn-cookie-accept" id="cookieAccept">
                            Accept All
                        </button>
                    </div>
                </div>
            </div>

            <!-- Cookie Settings Modal -->
            <div class="cookie-modal" id="cookieModal">
                <div class="cookie-modal-content">
                    <div class="cookie-modal-header">
                        <h3>Cookie Preferences</h3>
                        <button class="cookie-modal-close" id="cookieModalClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="cookie-modal-body">
                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <div>
                                    <h4>Essential Cookies</h4>
                                    <p>Required for the website to function properly</p>
                                </div>
                                <label class="cookie-toggle disabled">
                                    <input type="checkbox" checked disabled>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <div>
                                    <h4>Analytics Cookies</h4>
                                    <p>Help us understand how visitors interact with our website</p>
                                </div>
                                <label class="cookie-toggle">
                                    <input type="checkbox" id="analyticsConsent" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <div>
                                    <h4>Marketing Cookies</h4>
                                    <p>Used to deliver personalized advertisements</p>
                                </div>
                                <label class="cookie-toggle">
                                    <input type="checkbox" id="marketingConsent">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <div>
                                    <h4>Preference Cookies</h4>
                                    <p>Remember your preferences and settings</p>
                                </div>
                                <label class="cookie-toggle">
                                    <input type="checkbox" id="preferenceConsent" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="cookie-modal-footer">
                        <button class="btn-secondary" id="cookieSaveSettings">
                            Save Settings
                        </button>
                        <button class="btn-primary" id="cookieAcceptAllModal">
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('cookieAccept').addEventListener('click', () => this.acceptAll());
        document.getElementById('cookieReject').addEventListener('click', () => this.rejectAll());
        document.getElementById('cookieSettings').addEventListener('click', () => this.openSettings());
        document.getElementById('cookieModalClose').addEventListener('click', () => this.closeSettings());
        document.getElementById('cookieSaveSettings').addEventListener('click', () => this.saveSettings());
        document.getElementById('cookieAcceptAllModal').addEventListener('click', () => {
            this.acceptAll();
            this.closeSettings();
        });
    }

    acceptAll() {
        const consent = {
            essential: true,
            analytics: true,
            marketing: true,
            preference: true,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(consent);
        this.hideBanner();
    }

    rejectAll() {
        const consent = {
            essential: true,
            analytics: false,
            marketing: false,
            preference: false,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(consent);
        this.hideBanner();
    }

    openSettings() {
        document.getElementById('cookieModal').classList.add('active');
    }

    closeSettings() {
        document.getElementById('cookieModal').classList.remove('active');
    }

    saveSettings() {
        const consent = {
            essential: true,
            analytics: document.getElementById('analyticsConsent').checked,
            marketing: document.getElementById('marketingConsent').checked,
            preference: document.getElementById('preferenceConsent').checked,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(consent);
        this.closeSettings();
        this.hideBanner();
    }

    saveConsent(consent) {
        localStorage.setItem(this.cookieName, JSON.stringify(consent));
        console.log('Cookie consent saved:', consent);

        // Initialize analytics/tracking based on consent
        if (consent.analytics) {
            this.initAnalytics();
        }
        if (consent.marketing) {
            this.initMarketing();
        }
    }

    initAnalytics() {
        console.log('Analytics initialized');
        // Initialize Google Analytics or other analytics tools
    }

    initMarketing() {
        console.log('Marketing cookies initialized');
        // Initialize marketing pixels, etc.
    }

    hideBanner() {
        const banner = document.getElementById('cookieConsent');
        banner.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => banner.remove(), 300);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
