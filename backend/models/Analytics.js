const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  metrics: {
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
    revenue: {
      type: Number,
      default: 0
    },
    cost: {
      type: Number,
      default: 0
    },
    engagement: {
      likes: {
        type: Number,
        default: 0
      },
      shares: {
        type: Number,
        default: 0
      },
      comments: {
        type: Number,
        default: 0
      },
      saves: {
        type: Number,
        default: 0
      }
    }
  },
  platformMetrics: {
    facebook: {
      reach: Number,
      engagementRate: Number
    },
    instagram: {
      reach: Number,
      engagementRate: Number
    },
    google: {
      reach: Number,
      qualityScore: Number
    },
    linkedin: {
      reach: Number,
      engagementRate: Number
    }
  },
  audienceDemographics: {
    ageGroups: {
      '18-24': Number,
      '25-34': Number,
      '35-44': Number,
      '45-54': Number,
      '55+': Number
    },
    gender: {
      male: Number,
      female: Number,
      other: Number
    },
    locations: [{
      country: String,
      city: String,
      impressions: Number,
      conversions: Number
    }]
  },
  timeSeriesData: [{
    hour: Number,
    impressions: Number,
    clicks: Number,
    conversions: Number
  }],
  attribution: {
    firstClick: {
      source: String,
      conversions: Number
    },
    lastClick: {
      source: String,
      conversions: Number
    },
    linear: {
      sources: [{
        source: String,
        contribution: Number
      }]
    }
  },
  roi: {
    type: Number,
    default: 0
  },
  roas: {
    type: Number,
    default: 0
  },
  conversionRate: {
    type: Number,
    default: 0
  },
  costPerConversion: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
analyticsSchema.index({ userId: 1, date: -1 });
analyticsSchema.index({ adId: 1 });
analyticsSchema.index({ date: 1 });

// Virtual for calculating CTR
analyticsSchema.virtual('ctr').get(function() {
  if (this.metrics.impressions === 0) return 0;
  return (this.metrics.clicks / this.metrics.impressions) * 100;
});

// Virtual for calculating conversion rate
analyticsSchema.virtual('conversionRatePercentage').get(function() {
  if (this.metrics.clicks === 0) return 0;
  return (this.metrics.conversions / this.metrics.clicks) * 100;
});

// Virtual for calculating ROI
analyticsSchema.virtual('roiPercentage').get(function() {
  if (this.metrics.cost === 0) return 0;
  return ((this.metrics.revenue - this.metrics.cost) / this.metrics.cost) * 100;
});

// Virtual for calculating ROAS
analyticsSchema.virtual('roasValue').get(function() {
  if (this.metrics.cost === 0) return 0;
  return this.metrics.revenue / this.metrics.cost;
});

// Pre-save middleware to calculate derived metrics
analyticsSchema.pre('save', function(next) {
  // Calculate conversion rate
  if (this.metrics.clicks > 0) {
    this.conversionRate = (this.metrics.conversions / this.metrics.clicks) * 100;
  }
  
  // Calculate cost per conversion
  if (this.metrics.conversions > 0) {
    this.costPerConversion = this.metrics.cost / this.metrics.conversions;
  }
  
  // Calculate ROI
  if (this.metrics.cost > 0) {
    this.roi = ((this.metrics.revenue - this.metrics.cost) / this.metrics.cost) * 100;
  }
  
  // Calculate ROAS
  if (this.metrics.cost > 0) {
    this.roas = this.metrics.revenue / this.metrics.cost;
  }
  
  next();
});

module.exports = mongoose.model('Analytics', analyticsSchema);