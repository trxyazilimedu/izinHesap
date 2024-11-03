import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, Linking, useColorScheme } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const DeveloperInfo = ({ icon, label, value, isLink = false }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    if (isLink && value) {
      if (label === 'Instagram') {
        Linking.openURL(`https://instagram.com/${value.replace('@', '')}`);
      } else if (label === 'Email') {
        Linking.openURL(`mailto:${value}`);
      } else if (label === 'Phone') {
        Linking.openURL(`tel:${value}`);
      }
    }
  };

  return (
      <ThemedView style={[styles.infoContainer, isDark && styles.infoContainerDark]}>
        <Ionicons
            name={icon}
            size={24}
            style={[styles.icon, isDark && styles.iconDark]}
        />
        <ThemedView style={styles.infoContent}>
          <ThemedText style={[styles.label, isDark && styles.labelDark]}>
            {label}
          </ThemedText>
          <ThemedText
              style={[
                styles.value,
                isDark && styles.valueDark,
                isLink && (isDark ? styles.linkDark : styles.link)
              ]}
              onPress={handlePress}
          >
            {value}
          </ThemedText>
        </ThemedView>
      </ThemedView>
  );
};

export default function DeveloperProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const developerData = {
    name: 'Yusuf Özbaş',
    title: 'Web Software Developer',
    email: 'yusufozbas7@gmail.com',
    phone: '+90 555 605 4022',
    instagram: '@yusuf.css',
    location: 'Kırşehir, Turkey',
    bio: 'Ahi Evran University Computer Programing student. I am interested in web technologies and software development. I am a software developer who loves to learn and share.',
  };

  return (
      <ParallaxScrollView
          headerBackgroundColor={{ light: '#4F46E5', dark: '#1F2937' }}
          headerImage={
            <Ionicons
                size={200}
                name="person-circle"
                style={[styles.headerImage, isDark && styles.headerImageDark]}
            />
          }>
        <ThemedView style={[styles.profileContainer, isDark && styles.profileContainerDark]}>
          <ThemedText style={[styles.name, isDark && styles.nameDark]}>
            {developerData.name}
          </ThemedText>
          <ThemedText style={[styles.title, isDark && styles.titleDark]}>
            {developerData.title}
          </ThemedText>

          <ThemedView style={[styles.bioContainer, isDark && styles.bioContainerDark]}>
            <ThemedText style={[styles.bio, isDark && styles.bioDark]}>
              {developerData.bio}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.infoSection}>
            <DeveloperInfo
                icon="mail-outline"
                label="Email"
                value={developerData.email}
                isLink
            />
            <DeveloperInfo
                icon="call-outline"
                label="Phone"
                value={developerData.phone}
                isLink
            />
            <DeveloperInfo
                icon="logo-instagram"
                label="Instagram"
                value={developerData.instagram}
                isLink
            />
            <DeveloperInfo
                icon="location-outline"
                label="Location"
                value={developerData.location}
            />
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFFFFF',
    opacity: 0.9,
    bottom: -50,
    alignSelf: 'center',
    position: 'absolute',
  },
  headerImageDark: {
    color: '#E5E7EB',
  },
  profileContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  profileContainerDark: {
    backgroundColor: '#111827',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#111827',
  },
  nameDark: {
    color: '#F9FAFB',
  },
  title: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  titleDark: {
    color: '#9CA3AF',
  },
  bioContainer: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 12,
    marginBottom: 24,
  },
  bioContainerDark: {
    backgroundColor: '#1F2937',
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#4B5563',
  },
  bioDark: {
    color: '#D1D5DB',
  },
  infoSection: {
    gap: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  infoContainerDark: {
    backgroundColor: '#1F2937',
  },
  icon: {
    color: '#4F46E5',
    marginRight: 12,
  },
  iconDark: {
    color: '#6366F1',
  },
  infoContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  labelDark: {
    color: '#9CA3AF',
  },
  value: {
    fontSize: 16,
    color: '#111827',
  },
  valueDark: {
    color: '#F9FAFB',
  },
  link: {
    color: '#4F46E5',
    textDecorationLine: 'underline',
  },
  linkDark: {
    color: '#818CF8',
    textDecorationLine: 'underline',
  },
});