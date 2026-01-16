const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Ad title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Ad description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  headline: {
    type: String,
    maxlength: [100, 'Headline cannot exceed 100 characters']
  },
  callToAction: {
    type: String,
    required: [true, 'Call to action is required'],
    enum: ['Buy Now', 'Learn More', 'Sign Up', 'Download', 'Contact Us', 'Shop Now', 'Get Started']
  },
  targetAudience: {
    demographics: {
      ageRange: {
        type: String,
        enum: ['18-24', '25-34', '35-44', '45-54', '55+']
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'all', 'other']
      },
      location: [String],
      incomeLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'luxury']
      }
    },
    interests: [String],
    behaviors: [String],
    painPoints: [String]
  },
  product: {
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    category: String,
    keyBenefits: [String],
    uniqueSellingPoints: [String]
  },
  platform: {
    type: String,
    required: [true, 'Platform is required'],
    enum: ['facebook', 'instagram', 'google', 'linkedin', 'twitter', 'tiktok', 'snapchat', 'youtube']
  },
  tone: {
    type: String,
    enum: ['professional', 'casual', 'enthusiastic', 'urgent', 'friendly', 'authoritative'],
    default: 'professional'
  },
  content: {
    headline: String,
    primaryText: String,
    description: String,
    additionalText: String
  },
  media: {
    images: [{
      url: String,
      alt: String,
      dimensions: {
        width: Number,
        height: Number
      }
    }],
    videos: [{
      url: String,
      thumbnail: String,
      duration: Number
    }]
  },
  campaign: {
    name: String,
    budget: Number,
    startDate: Date,
    endDate: Date,
    dailyBudget: Number
  },
  status: {
    type: String,
    enum: ['draft', 'generated', 'published', 'paused', 'archived'],
    default: 'draft'
  },
  performance: {
    impressions: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    },
    spend: {
      type: Number,
      default: 0
    },
    ctr: {
      type: Number,
      default: 0
    },
    cpc: {
      type: Number,
      default: 0
    }
  },
  aiInsights: {
    engagementScore: {
      type: Number,
      min: 0,
      max: 100
    },
    readability: {
      type: Number,
      min: 0,
      max: 100
    },
    emotionalAppeal: {
      type: Number,
      min: 0,
      max: 100
    },
    suggestions: [String]
  },
  tags: [String],
  templateUsed: String,
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Index for better query performance
adSchema.index({ userId: 1, createdAt: -1 });
adSchema.index({ platform: 1, status: 1 });
adSchema.index({ tags: 1 });

// Virtual for calculating CTR
adSchema.virtual('ctrPercentage').get(function() {
  if (this.performance.impressions === 0) return 0;
  return ((this.performance.clicks / this.performance.impressions) * 100).toFixed(2);
});

// Virtual for calculating CPC
adSchema.virtual('costPerClick').get(function() {
  if (this.performance.clicks === 0) return 0;
  return (this.performance.spend / this.performance.clicks).toFixed(2);
});

// Pre-save middleware to update version if content changes
adSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model('Ad', adSchema);