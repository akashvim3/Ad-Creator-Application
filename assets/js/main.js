// Main JavaScript File
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
});

// Loading Animation System
class LoadingManager {
    constructor() {
        this.createLoadingOverlay();
    }

    createLoadingOverlay() {
        const loadingHTML = `
            <div class="loading-screen" id="loadingScreen">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">Loading...</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
    }

    show(text = 'Loading...') {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingText = loadingScreen.querySelector('.loading-text');
        loadingText.textContent = text;
        loadingScreen.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.remove('active');
        document.body.style.overflow = '';
    }

    showProgress(percentage) {
        // For future progress bar implementation
        console.log(`Loading progress: ${percentage}%`);
    }
}

// Export for use in other files
window.LoadingManager = new LoadingManager();


// Advanced Notification System
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 3;
        this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = this.createNotification(message, type);
        const container = document.getElementById('notificationContainer');

        // Remove oldest if max reached
        if (this.notifications.length >= this.maxNotifications) {
            this.remove(this.notifications[0]);
        }

        container.appendChild(notification);
        this.notifications.push(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => this.remove(notification), duration);
        }

        return notification;
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        const colors = {
            success: '#43e97b',
            error: '#f5576c',
            warning: '#ffa500',
            info: '#4facfe'
        };

        notification.innerHTML = `
            <div class="notification-icon" style="background: ${colors[type]};">
                <i class="fas ${icons[type]}"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.remove(notification);
        });

        return notification;
    }

    remove(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    clear() {
        this.notifications.forEach(notification => this.remove(notification));
    }
}

// Initialize and expose globally
window.notify = new NotificationManager();

// Usage examples:
// notify.success('Ad created successfully!');
// notify.error('Failed to save changes');
// notify.warning('Your trial is ending soon');
// notify.info('New features available');


// Utility Functions
const Utils = {
    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/B(?=(d{3})+(?!d))/g, ",");
    },

    // Format date
    formatDate(date, format = 'short') {
        const d = new Date(date);
        const options = {
            short: { month: 'short', day: 'numeric', year: 'numeric' },
            long: { month: 'long', day: 'numeric', year: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' }
        };
        return d.toLocaleDateString('en-US', options[format]);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^s@]+@[^s@]+.[^s@]+$/;
        return re.test(email);
    },

    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            notify.success('Copied to clipboard!');
            return true;
        } catch (err) {
            notify.error('Failed to copy');
            return false;
        }
    },

    // Generate random ID
    generateId(length = 8) {
        return Math.random().toString(36).substring(2, length + 2);
    },

    // Truncate text
    truncate(text, length, suffix = '...') {
        if (text.length <= length) return text;
        return text.substring(0, length).trim() + suffix;
    },

    // Get URL parameters
    getUrlParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    },

    // Scroll to element
    scrollTo(element, offset = 0) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Local storage with JSON
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage error:', e);
                return false;
            }
        },
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Storage error:', e);
                return defaultValue;
            }
        },
        remove(key) {
            localStorage.removeItem(key);
        },
        clear() {
            localStorage.clear();
        }
    },

    // Device detection
    device: {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTablet: /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768,
        isDesktop: window.innerWidth >= 1024
    },

    // Wait for element
    waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver(() => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
};

// Export to window
window.Utils = Utils;
