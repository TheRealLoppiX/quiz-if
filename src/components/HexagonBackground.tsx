import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const HexagonBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LinearGradient
      colors={['#1a1a2e', '#0f0f1d']} 
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela toda
  },
});