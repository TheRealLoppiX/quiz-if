import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Session } from '@supabase/supabase-js'; // Importar tipo Session
import { supabase } from './src/lib/supabase'; // Importar sua config

import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ModuleSelectionScreen from './src/screens/ModuleSelectionScreen';
import QuizScreen from './src/screens/QuizScreen';

// Seus tipos de navegação
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  ModuleSelection: undefined;
  Quiz: { moduleId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 1. Verifica se já existe uma sessão salva no celular
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Fica ouvindo mudanças (Login, Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpeza ao desmontar
    return () => subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        {session && session.user ? (
           // --- AREA LOGADA ---
           <>
             <Stack.Screen name="Home" component={HomeScreen} />
             <Stack.Screen name="ModuleSelection" component={ModuleSelectionScreen} />
             <Stack.Screen name="Quiz" component={QuizScreen} />
           </>
        ) : (
           // --- AREA DESLOGADA ---
           <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}