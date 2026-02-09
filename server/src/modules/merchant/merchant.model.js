const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MerchantSchema = new mongoose.Schema({
  merchant_no: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true, // Allow null/undefined for existing records
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Don't return password by default
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
    default: 'ACTIVE'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
    default: 'ACTIVE'
  },
  balance: {
    available: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
      get: (v) => v ? parseFloat(v.toString()) : 0
    },
    pending: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
      get: (v) => v ? parseFloat(v.toString()) : 0
    },
    total: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
      get: (v) => v ? parseFloat(v.toString()) : 0
    }
  },
  

  
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Note: merchant_no and email indexes are defined inline with index:true
// No need for duplicate schema.index() calls

// Hash password before saving
MerchantSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



// Method to compare password
MerchantSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};



// Method to generate merchant number (static)
MerchantSchema.statics.generateMerchantNo = async function() {
  const count = await this.countDocuments();
  return `M${String(count + 1).padStart(6, '0')}`; // M000001, M000002, etc.
};

module.exports = mongoose.model('Merchant', MerchantSchema);
