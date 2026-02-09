const merchantService = require('./merchant.service');

/**
 * Get merchant profile
 * GET /api/merchant/profile
 */
exports.getProfile = async (req, res, next) => {
  try {
    const merchantId = req.user._id;
    const profile = await merchantService.getProfile(merchantId);
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update merchant profile
 * PUT /api/merchant/profile
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const merchantId = req.user._id;
    const profile = await merchantService.updateProfile(merchantId, req.body);
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get API keys
 * GET /api/merchant/api-keys
 */
exports.getAPIKeys = async (req, res, next) => {
  try {
    const merchantId = req.user._id;
    const keys = await merchantService.getAPIKeys(merchantId);
    
    res.json({
      success: true,
      data: keys
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Change password
 * POST /api/merchant/change-password
 */
exports.changePassword = async (req, res, next) => {
  try {
    const merchantId = req.user._id;
    const { oldPassword, newPassword } = req.body;
    
    const result = await merchantService.changePassword(merchantId, oldPassword, newPassword);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
