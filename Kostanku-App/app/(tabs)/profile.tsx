import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
import { Image } from 'expo-image'
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import * as Icons from 'phosphor-react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: (
        <Icons.User
          size={26}
          color={colors.white}
          weight='fill'
        />
      ),
      routeName: '/(modals)/profileModal',
      bgColor: '#6366f1',
    },
    {
      title: "Settings",
      icon: (
        <Icons.GearSix
          size={26}
          color={colors.white}
        />
      ),
      // routeName: '/(modals)/profileModal',
      bgColor: '#059669',
    },
    {
      title: "Privacy Policy",
      icon: (
        <Icons.Lock
          size={26}
          color={colors.white}
        />
      ),
      // routeName: '/(modals)/profileModal',
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: (
        <Icons.User
          size={26}
          color={colors.white}
        />
      ),
      // routeName: '/(modals)/profileModal',
      bgColor: '#e11d48',
    },
  ];

  const handleLogout = async () => {
      await signOut(auth);
  }

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to Logout?", [
      {
        text: "Cancel",
        onPress: () => console.log('cancel logout')
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: 'destructive'
      }
    ])
  }
  const handlePress = async (item: accountOptionType) => {
    if (item.title == 'Logout') {
      showLogoutAlert();
    }

    console.log('Navigating to:', item.routeName);
    if (item.routeName) router.push(item.routeName);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header leftIcon={<BackButton />} title='Profile' style={{marginVertical: spacingX._10}} />
      {/* user info */}
      <View style={styles.userInfo}>
          {/* avatar */}
          <View>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit='cover'
              transition={100}
            />
          </View>
      </View>

      {/* name & email */}
      <View style={styles.nameContainer}>
        <Typo size={24} fontWeight={'600'} color={colors.neutral100}>
          {user?.name}
        </Typo>
        <Typo size={15} color={colors.neutral400}>
          {user?.email}
        </Typo>
        </View>
        
      {/* account options */}
      <View style={styles.accountOptions}>
          {
            accountOptions.map((item, index) => {
              return (
                <Animated.View key={index.toString()}
                  entering={FadeInDown.delay(index * 50).springify().damping(14)} style={styles.listItem}>
                  <TouchableOpacity style={styles.flexRow} onPress={()=> handlePress(item)}>
                    {/* Group for Icon and Title */}
                    <View style={styles.leftSection}>
                    
                    {/* icon */}
                    <View
                      style={[
                        styles.listIcon,
                        {
                          backgroundColor: item?.bgColor,
                        },
                      ]}
                    >
                      {item.icon && item.icon}
                    </View>
                    <Typo
                      size={16}
                      fontWeight={'500'}>
                      {item.title}
                    </Typo>
                    </View>
                    <Icons.CaretRight
                      size={verticalScale(20)}
                      weight='bold'
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </Animated.View> 
              );
            })}
          </View>
    </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(10),
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center'
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    marginBottom: verticalScale(20),
  },
  editIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous'
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous'
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._15,
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
    paddingHorizontal: verticalScale(10)
  },
  flexRow: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
  },
})