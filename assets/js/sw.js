// Service Worker for PWA
const CACHE_NAME = 'ai-adcreator-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/dashboard.html',
    '/create-ad.html',
    '/templates.html',
    '/analytics.html',
    '/pricing.html',
    '/about.html',
    '/contact.html',
    '/login.html',
    '/signup.html',
    '/css/style.css',
    '/js/main.js',
    '/js/ad-generator.js',
    '/js/analytics.js',
    '/js/chatbot.js',
    '/js/cookie-consent.js',
    '/js/notifications.js',
    '/js/utils.js',
    '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    response => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Push notification
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from AI AdCreator',
        icon: '/images/icon-192x192.png',
        badge: '/images/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('AI AdCreator', options)
    );
});

// Notification click
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        clients.openWindow('/dashboard.html');
    }
});

// Progressive Web App Registration
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.init();
    }

    init() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }

        // Handle install prompt
        this.handleInstallPrompt();

        // Check if already installed
        this.checkIfInstalled();
    }

    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered:', registration);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        this.showUpdateNotification();
                    }
                });
            });
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    handleInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallBanner();
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA installed');
            this.deferredPrompt = null;
            notify.success('App installed successfully!');
        });
    }

    showInstallBanner() {
        const banner = document.createElement('div');
        banner.className = 'pwa-install-banner';
        banner.innerHTML = `
            <div class="pwa-banner-content">
                <div class="pwa-banner-icon">
                    <i class="fas fa-download"></i>
                </div>
                <div class="pwa-banner-text">
                    <h4>Install AI AdCreator</h4>
                    <p>Install our app for a better experience</p>
                </div>
                <div class="pwa-banner-actions">
                    <button class="btn-secondary" id="pwaInstallLater">Later</button>
                    <button class="btn-primary" id="pwaInstallNow">Install</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        setTimeout(() => banner.classList.add('show'), 100);

        document.getElementById('pwaInstallNow').addEventListener('click', () => {
            this.installApp();
            banner.remove();
        });

        document.getElementById('pwaInstallLater').addEventListener('click', () => {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        });
    }

    async installApp() {
        if (!this.deferredPrompt) {
            notify.warning('Installation not available');
            return;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        this.deferredPrompt = null;
    }

    checkIfInstalled() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('Running as PWA');
            document.body.classList.add('pwa-installed');
        }
    }

    showUpdateNotification() {
        const updateBanner = document.createElement('div');
        updateBanner.className = 'pwa-update-banner';
        updateBanner.innerHTML = `
            <div class="update-content">
                <i class="fas fa-sync-alt"></i>
                <span>New version available!</span>
                <button class="btn-primary btn-sm" id="updateApp">Update Now</button>
            </div>
        `;

        document.body.appendChild(updateBanner);
        setTimeout(() => updateBanner.classList.add('show'), 100);

        document.getElementById('updateApp').addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Request notification permission
    async requestNotificationPermission() {
        if (!('Notification' in window)) {
            console.log('Notifications not supported');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }

        return false;
    }

    // Show notification
    showNotification(title, options = {}) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                icon: '/images/icon-192x192.png',
                badge: '/images/icon-72x72.png',
                ...options
            });

            notification.onclick = (e) => {
                e.preventDefault();
                window.focus();
                notification.close();
            };
        }
    }
}

// Initialize PWA Manager
document.addEventListener('DOMContentLoaded', () => {
    window.pwaManager = new PWAManager();
});
