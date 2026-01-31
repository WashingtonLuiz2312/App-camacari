import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  StatusBar,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// ==========================================
// 1. DESIGN SYSTEM (TEMA: UNIVERSITÁRIO PREMIUM)
// ==========================================
const { width } = Dimensions.get('window');
const COLORS = {
  primary: '#7B1FA2',     // Roxo Profundo
  primaryLight: '#E1BEE7',
  secondary: '#00E676',   // Verde Neon (Status Ativo)
  bg: '#F8F9FA',
  surface: '#FFFFFF',
  textMain: '#1F2937',
  textSec: '#6B7280',
  inputBg: '#F3F4F6',
  white: '#FFFFFF',
};

// ==========================================
// 2. TELA DE LOGIN (CLEAN & MODERN)
// ==========================================
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!cpf) {
      Alert.alert('Erro', 'Por favor, informe seu CPF.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <View style={styles.loginContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.loginContent}>
        
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Ionicons name="bus" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.appTitle}>Transporte <Text style={{fontWeight: '300'}}>Universitário</Text></Text>
          <Text style={styles.appSubtitle}>Acesso do Estudante</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>CPF DO ALUNO</Text>
          <TextInput 
            style={styles.input}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
            value={cpf}
            onChangeText={setCpf}
          />
          
          <Text style={styles.label}>SENHA</Text>
          <TextInput 
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity 
            style={styles.loginBtn} 
            onPress={handleLogin}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[COLORS.primary, '#9C27B0']}
              start={{x:0, y:0}} end={{x:1, y:0}}
              style={styles.btnGradient}
            >
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>ENTRAR</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
};

// ==========================================
// 3. COMPONENTES DO DASHBOARD
// ==========================================

// Cartão Digital Sênior
const StudentCard = () => (
  <View style={styles.cardContainer}>
    <LinearGradient
      colors={['#4A148C', '#7B1FA2', '#8E24AA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.idCard}
    >
      {/* Background Pattern */}
      <View style={styles.cardPatternCircle} />
      <Ionicons name="school" size={140} color="rgba(255,255,255,0.03)" style={styles.cardBgIcon} />

      {/* Header do Cartão */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.uniLabel}>INSTITUIÇÃO</Text>
          <Text style={styles.uniName}>UNIJORGE</Text>
        </View>
        <Ionicons name="qr-code" size={28} color="#FFF" style={{ opacity: 0.8 }} />
      </View>

      {/* Corpo do Cartão */}
      <View style={styles.cardBody}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: 'https://github.com/shadcn.png' }} style={styles.avatar} />
          <View style={styles.activeDot} />
        </View>
        
        <View style={styles.infoCol}>
          <Text style={styles.studentName}>Washington Luiz</Text>
          <Text style={styles.course}>Direito</Text>
          <Text style={styles.matricula}>Matrícula: xxxxxx</Text>
        </View>
      </View>

      {/* Footer com ROTEIRO EM DESTAQUE */}
      <View style={styles.cardFooter}>
        <View style={styles.roteiroBox}>
          <Text style={styles.roteiroLabel}>SEU ROTEIRO</Text>
          <Text style={styles.roteiroValue}>R-06</Text>
        </View>
        
        <View style={styles.validityBox}>
          <Text style={styles.validityLabel}>VALIDADE</Text>
          <Text style={styles.validityValue}>12/2024</Text>
        </View>
      </View>

    </LinearGradient>
    
    {/* Sombra Glow */}
    <View style={styles.cardGlow} />
  </View>
);

const MenuButton = ({ title, icon, color, onPress, badge }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.menuIcon, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={26} color={color} />
    </View>
    <Text style={styles.menuText}>{title}</Text>
    {badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
  </TouchableOpacity>
);

// ==========================================
// 4. TELA PRINCIPAL
// ==========================================
export default function TransporteUniversitarioScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Se não estiver logado, mostra Login
  if (!isLoggedIn) {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={[styles.backFloat, { top: insets.top + 10 }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Topo Roxo */}
      <View style={[styles.headerBg, { height: 280 + insets.top }]} />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}>
        
        {/* Header Navigation */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Portal do Aluno</Text>
          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="settings-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* O Cartão */}
        <StudentCard />

        {/* Menu de Opções */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Serviços</Text>
          
          <View style={styles.grid}>
            <MenuButton 
              title="Recadastramento" 
              icon="refresh-circle" 
              color="#FB8C00" 
              badge="Pendente"
            />
            <MenuButton 
              title="Novo Cadastro" 
              icon="person-add" 
              color={COLORS.primary} 
            />
            <MenuButton 
              title="Reclamação" 
              icon="megaphone" 
              color="#E53935" 
            />
            <MenuButton 
              title="Meus Roteiros" 
              icon="map" 
              color="#43A047" 
            />
            <MenuButton 
              title="Declaração" 
              icon="document-text" 
              color="#1E88E5" 
            />
            <MenuButton 
              title="Ajuda" 
              icon="chatbubble-ellipses" 
              color="#546E7A" 
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  
  // --- LOGIN ---
  loginContainer: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
  },
  loginContent: {
    padding: 30,
    justifyContent: 'center',
  },
  backFloat: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  appSubtitle: {
    fontSize: 16,
    color: COLORS.textSec,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSec,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.textMain,
  },
  loginBtn: {
    marginTop: 10,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,
  },
  btnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },

  // --- DASHBOARD ---
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 10,
  },
  navBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  // CARD ESTUDANTE
  cardContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  idCard: {
    width: '100%',
    height: 230,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    zIndex: 2,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    bottom: -15,
    width: '85%',
    height: 30,
    backgroundColor: COLORS.primary,
    opacity: 0.4,
    borderRadius: 30,
    zIndex: 1,
    transform: [{ scaleX: 0.9 }],
  },
  cardPatternCircle: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cardBgIcon: {
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  uniLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  uniName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  activeDot: {
    width: 14,
    height: 14,
    backgroundColor: '#00E676',
    borderRadius: 7,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#4A148C',
  },
  infoCol: {
    flex: 1,
  },
  studentName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  course: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 4,
  },
  matricula: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  roteiroBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  roteiroLabel: {
    color: '#E1BEE7',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  roteiroValue: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  validityBox: {
    alignItems: 'flex-end',
  },
  validityLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '700',
  },
  validityValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // MENU
  menuContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  menuItem: {
    width: (width - 48 - 16) / 2, // 2 colunas
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
    position: 'relative',
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FB8C00',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});