import { StyleSheet, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { HeaderProps } from '@/types'

const Header = ({ title = "", leftIcon, rightIcon, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {/* Left Icon */}
      <View style={styles.leftContainer}>
        {leftIcon}
      </View>

      {/* Title di tengah */}
      {title && (
        <View style={styles.centerContainer}>
          <Typo size={22} fontWeight={'600'} style={{ textAlign: 'center' }}>
            {title}
          </Typo>
        </View>
      )}

      {/* Right Icon */}
      <View style={styles.rightContainer}>
        {rightIcon}
      </View>
    </View>
  );
};

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  leftContainer: {
    width: 56,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    zIndex: 1,
  },
  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    width: 56,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
    zIndex: 1,
  },
});
