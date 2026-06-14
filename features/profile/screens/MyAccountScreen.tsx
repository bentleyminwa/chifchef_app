import { COLORS, FONTS } from '@/lib/config/theme';
import BackButton from '@/shared/components/buttons/BackButton';
import EditableAvatar from '@/shared/components/ui/EditableAvatar';
import FormInput from '@/shared/components/ui/FormInput';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileImg = require('@/assets/images/profile/profile.jpg');

const MyAccountScreen = () => {
  const [name, setName] = useState('Minwa Bentley');
  const [email, setEmail] = useState('minwa@chifchef.app');
  const [phone, setPhone] = useState('+254 712 345678');
  const [location, setLocation] = useState('Nairobi, Kenya');

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSave = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);

    // Simulate database saving
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.toolbar}>
          <BackButton />
          <Text style={styles.toolbarTitle}>My Account</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <EditableAvatar
            source={profileImg}
            onPressChange={() => console.log('Change photo pressed')}
          />

          {/* Success Banner */}
          {showSuccess && (
            <View style={styles.successBanner}>
              <Feather name='check-circle' size={16} color={COLORS.success} />
              <Text style={styles.successText}>
                Changes saved successfully!
              </Text>
            </View>
          )}

          {/* Form Fields */}
          <View style={styles.form}>
            <FormInput
              label='Full Name'
              icon='user'
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder='Enter your full name'
              error={errors.name}
            />

            <FormInput
              label='Email Address'
              icon='mail'
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              keyboardType='email-address'
              autoCapitalize='none'
              placeholder='Enter your email address'
              error={errors.email}
            />

            <FormInput
              label='Phone Number'
              icon='phone'
              value={phone}
              onChangeText={setPhone}
              keyboardType='phone-pad'
              placeholder='Enter your phone number'
            />

            <FormInput
              label='Location'
              icon='map-pin'
              value={location}
              onChangeText={setLocation}
              placeholder='City, Country'
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.saveBtn}
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color={COLORS.white} size='small' />
            ) : (
              <Text style={styles.saveBtnText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  toolbarTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 20,
    color: COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  successText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 14,
    color: COLORS.success,
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    width: '50%',
    height: 52,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveBtnText: {
    fontFamily: FONTS.sandBold,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default MyAccountScreen;
