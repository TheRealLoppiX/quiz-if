import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const FormViewer: React.FC<FormViewerProps> = ({ src }) => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: src }} 
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator 
            color="#00e5ff" 
            size="large" 
            style={styles.loading} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20, // Bordas arredondadas igual ao site
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)', // Borda neon suave
    backgroundColor: 'rgba(10, 10, 30, 0.6)',
    margin: 10,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
});

export default FormViewer;