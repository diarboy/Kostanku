import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/contexts/authContext';
import { colors } from '@/constants/theme';

const StackLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.neutral900 },
        }}>
            <Stack.Screen
                name="(modals)/profileModal"
                options={{
                    presentation: 'modal',
                }}
        />
        </Stack>
    );
};

export default function RootLayout() {
    return (
        <AuthProvider>
            <StackLayout />
        </AuthProvider>
    )
}

const styles = StyleSheet.create({})