/**
 * Merchant Service - Handles merchant profile and settings API calls
 */

import { api } from './api';

/**
 * Get merchant profile
 * @returns {Promise<Object>}
 */
export const getMerchantProfile = async () => {
  const response = await api.get('/merchant/profile');
  return response.data || {};
};

/**
 * Update merchant profile
 * @param {Object} updates - Profile fields to update
 * @returns {Promise<Object>}
 */
export const updateMerchantProfile = async (updates) => {
  // Allowed fields for profile updates
  const allowedFields = [
    'name', 
    'mobile', 
    'avatar', 
    'username'
  ];
  
  const filteredUpdates = {};
  
  Object.keys(updates).forEach(key => {
    if (allowedFields.includes(key)) {
      filteredUpdates[key] = updates[key];
    }
  });

  const response = await api.put('/merchant/profile', filteredUpdates);
  return response.data;
};

/**
 * Get merchant API keys
 * @returns {Promise<Object>}
 */
export const getApiKeys = async () => {
  const response = await api.get('/merchant/api-keys');
  return response.data || {};
};



/**
 * Change password
 * @param {Object} passwordData - { currentPassword, newPassword }
 * @returns {Promise<Object>}
 */
export const changePassword = async (passwordData) => {
  const response = await api.post('/merchant/change-password', passwordData);
  return response.data;
};
