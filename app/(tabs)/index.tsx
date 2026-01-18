import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Alert, 
  useColorScheme, 
  View // <--- ADICIONADO: Faltava importar isso
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isDark = colorScheme === 'dark';
  // Cores dinâmicas para os inputs
  const inputBgColor = isDark ? '#2C2C2E' : '#F2F2F7';
  const inputTextColor = isDark ? '#FFFFFF' : '#000000';
  const placeholderColor = isDark ? '#8E8E93' : '#A1A1A6';

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    Alert.alert('Sucesso', `Logado como: ${email}`);
    // router.replace('/(tabs)'); // Descomente para navegar após o login
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/partial-react-logo.png')} // <--- CORRIGIDO: Nome exato do arquivo do seu projeto
            style={styles.logo}
            contentFit="contain"
          />
          <ThemedText type="title" style={styles.title}>Bem-vindo</ThemedText>
          <ThemedText style={styles.subtitle}>Faça login para continuar</ThemedText>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText type="defaultSemiBold" style={styles.label}>Email</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: inputTextColor }]}
              placeholder="exemplo@email.com"
              placeholderTextColor={placeholderColor}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="defaultSemiBold" style={styles.label}>Senha</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: inputBgColor, color: inputTextColor }]}
              placeholder="********"
              placeholderTextColor={placeholderColor}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={() => Alert.alert('Info', 'Funcionalidade em desenvolvimento')}>
            <ThemedText style={styles.linkText}>Esqueceu a senha?</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <ThemedText style={styles.buttonText}>Entrar</ThemedText>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <ThemedText>Não tem uma conta? </ThemedText>
          {/* Certifique-se de que a rota /signup existe ou mude para onde desejar */}
          <TouchableOpacity onPress={() => Alert.alert('Info', 'Ir para cadastro')}> 
            <ThemedText type="defaultSemiBold" style={styles.linkText}>Cadastre-se</ThemedText>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120, // Aumentei um pouco para ficar mais visível
    height: 120,
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 16,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    marginLeft: 4,
    fontSize: 14,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    // Removemos borda padrão para ficar mais moderno, usamos apenas a cor de fundo
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#0a7ea4', 
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 4,
  },
  linkText: {
    color: '#0a7ea4',
  },
});