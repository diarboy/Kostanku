import { StyleSheet, View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

const index = () => {
    const router = useRouter();
    // useEffect(() => {
    //     setTimeout(() => {
    //         router.push('/(auth)/welcome')
    //     }, 2000);
    // },[])
  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            resizeMode='contain'
              source={require("@/assets/images/kostanku-logo.png")}
          />
    </View>
  )
}

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
    },
    logo: {
        height: "30%",
        aspectRatio: 1,
    }
})