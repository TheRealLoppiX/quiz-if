import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { HexagonBackground } from '../components/HexagonBackground';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ModuleSelection'>;

const modulos = [
  { id: 'hardware', title: 'Hardware Básico', description: 'Componentes e placas.' },
  { id: 'software', title: 'Software', description: 'Sistemas e Apps.' },
  { id: 'redes', title: 'Redes', description: 'Conceitos de redes.' },
];

export default function ModuleSelectionScreen({ navigation }: Props) {
  return (
    <HexagonBackground>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Escolha um Módulo</Text>
        
        <ScrollView contentContainerStyle={styles.list}>
          {modulos.map((mod) => (
            <TouchableOpacity 
              key={mod.id} 
              style={styles.card}
              onPress={() => navigation.navigate('Quiz', { moduleId: mod.id })}
            >
              <Text style={styles.cardTitle}>{mod.title}</Text>
              <Text style={styles.cardDesc}>{mod.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </HexagonBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00e5ff',
    textAlign: 'center',
    marginBottom: 40,
  },
  list: { paddingBottom: 50 },
  card: {
    backgroundColor: 'rgba(10, 10, 30, 0.5)', // Vidro fosco fake
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00e5ff',
    marginBottom: 10,
  },
  cardDesc: { fontSize: 16, color: '#c0c0c0' },
  backButton: { marginTop: 20, alignSelf: 'center' },
  backText: { color: '#c0c0c0', fontSize: 16 }
});