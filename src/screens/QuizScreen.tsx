import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HexagonBackground } from '../components/HexagonBackground';
import FormViewer from '../components/FormViewer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

const quizData: Record<string, { title: string; src: string }> = {
  montagem_e_manutenção_de_comutadores: { title: 'Hardware', src: 'https://docs.google.com/forms/d/e/SEU_ID_HARDWARE/viewform' }
};

export default function QuizScreen({ route, navigation }: Props) {
  const { moduleId } = route.params;
  const quiz = quizData[moduleId];

  if (!quiz) return <View><Text>Erro</Text></View>;

  return (
    <HexagonBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{quiz.title}</Text>
        </View>

        <FormViewer src={quiz.src} />
      </View>
    </HexagonBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backArrow: { color: '#c0c0c0', fontSize: 18, marginRight: 20 },
  title: { color: '#00e5ff', fontSize: 20, fontWeight: 'bold' }
});