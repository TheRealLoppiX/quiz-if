import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { HexagonBackground } from '../components/HexagonBackground';
import { supabase } from '../lib/supabase';

export default function AuthScreen() {
  // Estados para controlar os inputs e modo
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Novo campo para o registro

  // Função de Login
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Erro no Login', error.message);
    setLoading(false);
  }

  // Função de Registro (Cadastro)
  async function signUpWithEmail() {
    if (!name) {
        Alert.alert('Erro', 'Por favor, digite seu nome.');
        return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name, // Salva o nome nos metadados do usuário
        },
      },
    });

    if (error) {
        Alert.alert('Erro no Cadastro', error.message);
    } else {
        Alert.alert('Sucesso!', 'Verifique seu email para confirmar o cadastro (se a confirmação estiver ativada).');
    }
    setLoading(false);
  }

  return (
    <HexagonBackground>
      <View style={styles.container}>
        <Text style={styles.title}>QuizIF</Text>
        <Text style={styles.subtitle}>
            {isRegistering ? 'Crie sua conta' : 'Acesse sua conta'}
        </Text>

        <View style={styles.form}>
            {/* Campo de Nome (Só aparece se estiver Registrando) */}
            {isRegistering && (
                <TextInput
                    style={styles.input}
                    placeholder="Seu Nome"
                    placeholderTextColor="#a0a0a0"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#a0a0a0"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#a0a0a0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TouchableOpacity 
                style={styles.actionButton}
                onPress={isRegistering ? signUpWithEmail : signInWithEmail}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#15ff00ff" />
                ) : (
                    <Text style={styles.actionButtonText}>
                        {isRegistering ? 'CADASTRAR' : 'ENTRAR'}
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.toggleButton} 
                onPress={() => setIsRegistering(!isRegistering)}
            >
                <Text style={styles.toggleText}>
                    {isRegistering ? 'Já tem conta? Entre aqui.' : 'Não tem conta? Cadastre-se.'}
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </HexagonBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#15ff00ff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 255, 30, 0.5)',
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#c0c0c0',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(12, 30, 10, 0.6)',
    borderWidth: 1,
    borderColor: '#15ff00ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: 'rgba(0, 255, 51, 0.15)',
    borderWidth: 2,
    borderColor: '#15ff00ff',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#15ff00ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  actionButtonText: {
    color: '#15ff00ff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: '#c0c0c0',
    textDecorationLine: 'underline',
  }
});