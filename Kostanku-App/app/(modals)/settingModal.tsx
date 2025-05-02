import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import ScreenWrapper from '@/components/ScreenWrapper'
import { spacingX } from '@/constants/theme'

const testmodal = () => {
  return (
    <ModalWrapper>
      <Typo style={{padding: spacingX._40}}>Test</Typo>
    </ModalWrapper>
  )
}

export default testmodal

const styles = StyleSheet.create({})