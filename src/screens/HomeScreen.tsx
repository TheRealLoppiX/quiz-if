import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HexagonBackground } from '../components/HexagonBackground';

// Props de navegação
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <HexagonBackground>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao QuizIF!</Text>
        <Text style={styles.subtitle}>Pronto para testar seus conhecimentos?</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            navigation.navigate('ModuleSelection');
          }}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </HexagonBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#00e5ff', // Ciano Neon
    textAlign: 'center',
    marginBottom: 20,
    // Sombras de texto não funcionam igual no Android, mas ok
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#c0c0c0',
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    borderColor: '#00e5ff',
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
  },
  buttonText: {
    color: '#00e5ff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});