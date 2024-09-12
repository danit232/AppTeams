import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as microsoftTeams from '@microsoft/teams-js';

export default function App() {
  const [isTeamsContext, setIsTeamsContext] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Intenta establecer el encabezado para evitar la advertencia de ngrok
    if (typeof document !== 'undefined') {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'ngrok-skip-browser-warning';
      meta.content = 'true';
      document.head.appendChild(meta);
    }

    const initializeTeams = async () => {
      try {
        await microsoftTeams.app.initialize();
        setIsTeamsContext(true);
        const context = await microsoftTeams.app.getContext();
        setUserName(context.user.name);
      } catch (error) {
        console.error('No se pudo inicializar Teams:', error);
        setIsTeamsContext(false);
      }
    };

    initializeTeams();
  }, []);

  const sendMessage = () => {
    if (isTeamsContext) {
      microsoftTeams.tasks.submitTask({ message: "Hola desde la app de Expo!" });
    } else {
      alert("Esta función solo está disponible dentro de Teams");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Expo para Teams</Text>
      {isTeamsContext ? (
        <View>
          <Text style={styles.text}>Bienvenido, {userName}!</Text>
          <Button title="Enviar mensaje a Teams" onPress={sendMessage} />
        </View>
      ) : (
        <Text style={styles.text}>Esta app funciona mejor dentro de Teams</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});