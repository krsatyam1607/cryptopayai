import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "UTC-8 (Pacific Time)",
    language: "English (US)"
  });
  const [tempData, setTempData] = useState({ ...profileData });
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...profileData });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProfileData({ ...tempData });
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
            <p className="text-sm text-muted-foreground">Manage your personal details and preferences</p>
          </div>
        </div>
        
        {!isEditing && (
          <Button variant="outline" onClick={handleEdit} iconName="Edit" iconPosition="left">
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={32} className="text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="Check" size={12} className="text-background" />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-foreground">Profile Picture</h4>
            <p className="text-sm text-muted-foreground mb-2">Upload a new avatar or use your Google profile picture</p>
            <Button variant="ghost" size="sm" iconName="Upload">
              Change Picture
            </Button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Display Name"
            type="text"
            value={isEditing ? tempData?.displayName : profileData?.displayName}
            onChange={(e) => handleInputChange('displayName', e?.target?.value)}
            disabled={!isEditing}
            className="mb-0"
          />

          <Input
            label="Email Address"
            type="email"
            value={isEditing ? tempData?.email : profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            description="Used for notifications and account recovery"
            className="mb-0"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={isEditing ? tempData?.phone : profileData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            className="mb-0"
          />

          <Input
            label="Timezone"
            type="text"
            value={isEditing ? tempData?.timezone : profileData?.timezone}
            onChange={(e) => handleInputChange('timezone', e?.target?.value)}
            disabled={!isEditing}
            className="mb-0"
          />
        </div>

        {/* Google Account Status */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={16} className="text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-foreground">Google Account</p>
              <p className="text-sm text-muted-foreground">Connected and verified</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-success">Active</span>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="ghost" onClick={handleCancel} disabled={isSaving}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;