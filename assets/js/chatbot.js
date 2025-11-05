// AI Chatbot Widget - Advanced Implementation
class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        this.loadChatHistory();
        this.showWelcomeMessage();
    }

    createChatWidget() {
        const chatHTML = `
            <!-- Chat Button -->
            <button class="chat-bubble" id="chatBubble" title="Chat with AI Assistant">
                <i class="fas fa-comments"></i>
                <span class="chat-badge">1</span>
            </button>

            <!-- Chat Window -->
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chat-header-text">
                            <h4>AI Assistant</h4>
                            <span class="chat-status">
                                <span class="status-dot"></span> Online
                            </span>
                        </div>
                    </div>
                    <div class="chat-header-actions">
                        <button class="chat-minimize" id="chatMinimize">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="chat-close" id="chatClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <div class="chat-messages" id="chatMessages">
                    <!-- Messages will be inserted here -->
                </div>

                <div class="chat-quick-replies" id="quickReplies">
                    <button class="quick-reply" data-message="How does AI Ad Creator work?">
                        <i class="fas fa-question-circle"></i> How it works
                    </button>
                    <button class="quick-reply" data-message="What are your pricing plans?">
                        <i class="fas fa-dollar-sign"></i> Pricing
                    </button>
                    <button class="quick-reply" data-message="Show me examples">
                        <i class="fas fa-images"></i> Examples
                    </button>
                    <button class="quick-reply" data-message="Contact support">
                        <i class="fas fa-headset"></i> Support
                    </button>
                </div>

                <div class="chat-input-container">
                    <button class="chat-attachment" title="Attach file">
                        <i class="fas fa-paperclip"></i>
                    </button>
                    <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
                    <button class="chat-send" id="chatSend">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>

                <div class="chat-footer">
                    <small>Powered by AI AdCreator</small>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        const chatBubble = document.getElementById('chatBubble');
        const chatClose = document.getElementById('chatClose');
        const chatMinimize = document.getElementById('chatMinimize');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');

        chatBubble.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.toggleChat());
        chatMinimize.addEventListener('click', () => this.minimizeChat());
        chatSend.addEventListener('click', () => this.sendMessage());

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick replies
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', (e) => {
                const message = e.currentTarget.dataset.message;
                this.sendMessage(message);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        const chatBubble = document.getElementById('chatBubble');
        const chatBadge = chatBubble.querySelector('.chat-badge');

        if (this.isOpen) {
            chatWindow.classList.add('active');
            chatBubble.classList.add('hidden');
            if (chatBadge) chatBadge.style.display = 'none';
        } else {
            chatWindow.classList.remove('active');
            chatBubble.classList.remove('hidden');
        }
    }

    minimizeChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.add('minimized');

        setTimeout(() => {
            chatWindow.classList.remove('minimized');
            this.toggleChat();
        }, 300);
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', "👋 Hi! I'm your AI Assistant. How can I help you today?");
        }, 1000);
    }

    sendMessage(text = null) {
        const chatInput = document.getElementById('chatInput');
        const message = text || chatInput.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage('user', message);

        // Clear input
        if (!text) chatInput.value = '';

        // Show typing indicator
        this.showTyping();

        // Simulate AI response
        setTimeout(() => {
            this.hideTyping();
            const response = this.getAIResponse(message);
            this.addMessage('bot', response);
        }, 1500);
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            ${sender === 'bot' ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>' : ''}
            <div class="message-content">
                <div class="message-text">${this.formatMessage(text)}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Save to history
        this.messages.push({ sender, text, timestamp });
        this.saveChatHistory();
    }

    formatMessage(text) {
        // Convert URLs to links
        text = text.replace(/(https?://[^s]+)/g, '<a href="$1" target="_blank">$1</a>');

        // Convert line breaks
        text = text.replace(/
/g, '<br>');

        return text;
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.isTyping = true;
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Response patterns
        const responses = {
            greeting: [
                "Hello! 👋 How can I assist you with AI Ad Creator today?",
                "Hi there! I'm here to help you create amazing ads. What would you like to know?",
                "Hey! Welcome to AI AdCreator. How can I help you?"
            ],
            pricing: "We offer three plans:

💎 Starter - $29/month: 50 AI-generated ads, 5 campaigns
🚀 Professional - $79/month: 200 ads, unlimited campaigns
⭐ Enterprise - $199/month: Unlimited everything!

Visit our <a href='pricing.html'>pricing page</a> for details.",
            features: "AI AdCreator offers:

✨ AI-powered ad generation
🎨 Professional templates
📊 Advanced analytics
🌐 Multi-platform support
🎯 Customer targeting
📈 Performance optimization

Want to learn more about a specific feature?",
            howItWorks: "Creating ads is easy!

1️⃣ Define your target customer
2️⃣ AI generates personalized content
3️⃣ Export to your platform

It takes less than 5 minutes! Try our <a href='create-ad.html'>ad creator</a> now.",
            support: "I'm here to help! You can also:

📧 Email: support@aiadcreator.com
📞 Call: +1 (555) 123-4567
💬 Live chat (that's me!)

Or visit our <a href='contact.html'>contact page</a>.",
            demo: "I'd love to show you a demo! You can:

🎥 Watch our <a href='#'>video tutorial</a>
🆓 Start a <a href='signup.html'>free 14-day trial</a>
📞 <a href='contact.html'>Schedule a call</a> with our team

Which would you prefer?",
            default: "That's a great question! Let me help you with that. You can:

• Check our <a href='about.html'>About page</a>
• Browse <a href='templates.html'>templates</a>
• Contact our <a href='contact.html'>support team</a>

What specific information are you looking for?"
        };

        // Match patterns
        if (lowerMessage.match(/hello|hi|hey|greetings/)) {
            return this.randomResponse(responses.greeting);
        }
        if (lowerMessage.match(/price|pricing|cost|plan/)) {
            return responses.pricing;
        }
        if (lowerMessage.match(/feature|capability|what can/)) {
            return responses.features;
        }
        if (lowerMessage.match(/how.*work|how to use/)) {
            return responses.howItWorks;
        }
        if (lowerMessage.match(/support|help|contact/)) {
            return responses.support;
        }
        if (lowerMessage.match(/demo|example|show me/)) {
            return responses.demo;
        }

        return responses.default;
    }

    randomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.messages));
    }

    loadChatHistory() {
        const history = localStorage.getItem('chatHistory');
        if (history) {
            this.messages = JSON.parse(history);
            // Optionally restore messages to UI
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new AIChatbot();
});
