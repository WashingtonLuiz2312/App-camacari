import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  StatusBar, 
  Alert, 
  Linking,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { 
  ArrowLeft, 
  Settings, 
  Siren, 
  ShieldAlert, 
  CheckCircle2, 
  Share2, 
  UserPlus, 
  Trash2, 
  Plus, 
  Mic, 
  MapPin, 
  Phone, 
  AlertTriangle,
  Loader2
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // <--- IMPORTANTE

const { width } = Dimensions.get('window');

// --- CORES ---
const COLORS = {
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate800: '#1e293b',
  slate900: '#0f172a',
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  green500: '#22c55e',
  blue50: '#eff6ff',
  blue600: '#2563eb',
  purple100: '#f3e8ff',
  purple600: '#9333ea',
  white: '#ffffff',
};

export default function EmergencyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // <--- PEGANDO AS MEDIDAS SEGURAS
  
  // --- ESTADOS ---
  const [sosStatus, setSosStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [recording, setRecording] = useState(false);
  const [contacts, setContacts] = useState([
    { id: 1, name: "Mãe", number: "(11) 99999-9999" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // Animação do Pulso
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // --- AÇÕES ---
  const handleSOSActivation = () => {
    if (sosStatus !== 'idle') return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setSosStatus('sending');
    setTimeout(() => {
      setSosStatus('sent');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        "🚨 ALERTA ENVIADO", 
        `Sua localização foi enviada para ${contacts.length} contatos de confiança.`
      );
    }, 2000);
  };

  const toggleRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!recording) {
      setRecording(true);
      Alert.alert("🎙️ Gravando...", "O áudio está sendo gravado em modo seguro.");
    } else {
      setRecording(false);
      Alert.alert("Gravação Salva", "O arquivo foi enviado para o cofre seguro.");
    }
  };

  const handleAddContact = () => {
    if (!newName || !newNumber) {
      Alert.alert("Atenção", "Preencha nome e telefone.");
      return;
    }
    Haptics.selectionAsync();
    const newContact = { id: Date.now(), name: newName, number: newNumber };
    setContacts([...contacts, newContact]);
    setNewName("");
    setNewNumber("");
  };

  const handleRemoveContact = (id: number) => {
    Haptics.selectionAsync();
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleCall = (number: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* --- HEADER IMERSIVO CORRIGIDO --- */}
      <View style={styles.headerWrapper}>
        <LinearGradient
          colors={[COLORS.red600, '#9f1239']}
          style={[styles.headerBg, { paddingTop: insets.top }]} // <--- PADDING DINÂMICO AQUI
        >
          <View style={styles.blob1} />
          <View style={styles.blob2} />

          {/* Removemos o SafeAreaView daqui pois já aplicamos o padding manualmente acima */}
          <View style={styles.headerContent}>
            <View style={styles.topBar}>
              <TouchableOpacity 
                onPress={() => router.back()} 
                style={styles.backButton}
              >
                <ArrowLeft size={20} color={COLORS.red100} />
              </TouchableOpacity>
              <View style={styles.modeBadge}>
                <Siren size={14} color={COLORS.white} />
                <Text style={styles.modeText}>MODO DE EMERGÊNCIA</Text>
              </View>
              <TouchableOpacity style={styles.settingsButton}>
                <Settings size={20} color={COLORS.red100} />
              </TouchableOpacity>
            </View>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>PRECISA DE AJUDA?</Text>
              <Text style={styles.headerSubtitle}>
                Pressione o botão abaixo para alertar seus contatos e enviar sua localização.
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* --- 1. BOTÃO SOS HERO --- */}
        <View style={styles.sosContainer}>
          <View style={styles.pulseContainer}>
            {sosStatus === 'idle' && (
              <Animated.View 
                style={[
                  styles.pulseRing, 
                  { transform: [{ scale: pulseAnim }] }
                ]} 
              />
            )}
            
            <TouchableOpacity 
              onPress={handleSOSActivation}
              disabled={sosStatus !== 'idle'}
              activeOpacity={0.9}
              style={[
                styles.sosButton,
                sosStatus === 'sent' && styles.sosButtonSent
              ]}
            >
              <LinearGradient
                colors={
                  sosStatus === 'idle' ? [COLORS.red500, '#b91c1c'] :
                  sosStatus === 'sending' ? ['#f59e0b', '#b45309'] : 
                  [COLORS.slate800, COLORS.slate900] 
                }
                style={styles.sosGradient}
              >
                {sosStatus === 'idle' && (
                  <>
                    <ShieldAlert size={72} color={COLORS.white} style={{marginBottom: 8}} />
                    <Text style={styles.sosTextMain}>SOS</Text>
                    <Text style={styles.sosTextSub}>TOCAR</Text>
                  </>
                )}
                
                {sosStatus === 'sending' && (
                  <>
                    <Loader2 size={64} color={COLORS.white} style={styles.spin} />
                    <Text style={styles.sosTextStatus}>ENVIANDO...</Text>
                  </>
                )}

                {sosStatus === 'sent' && (
                  <>
                    <CheckCircle2 size={64} color={COLORS.green500} style={{marginBottom: 8}} />
                    <Text style={styles.sosTextStatus}>ENVIADO</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- 2. STATUS BANNER --- */}
        {sosStatus === 'sent' && (
          <View style={styles.statusBanner}>
            <View style={styles.statusIconBox}>
              <Share2 size={24} color={COLORS.green500} />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.statusTitle}>Alerta Compartilhado</Text>
              <Text style={styles.statusDesc}>
                Sua localização em tempo real foi enviada para {contacts.length} contatos.
              </Text>
            </View>
          </View>
        )}

        {/* --- 3. GERENCIAMENTO DE CONTATOS --- */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <UserPlus size={20} color={COLORS.slate500} />
            <Text style={styles.sectionTitle}>REDE DE APOIO ({contacts.length})</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.contactList}>
              {contacts.length === 0 ? (
                <Text style={styles.emptyText}>Adicione pessoas de confiança abaixo.</Text>
              ) : (
                contacts.map((contact) => (
                  <View key={contact.id} style={styles.contactItem}>
                    <View style={styles.contactAvatar}>
                      <Text style={styles.avatarText}>{contact.name.charAt(0)}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.contactName}>{contact.name}</Text>
                      <Text style={styles.contactNumber}>{contact.number}</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => handleRemoveContact(contact.id)}
                      style={styles.deleteBtn}
                    >
                      <Trash2 size={18} color={COLORS.slate400} />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>

            <View style={styles.addContactRow}>
              <TextInput 
                style={[styles.input, { flex: 1.5 }]} 
                placeholder="Nome"
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput 
                style={[styles.input, { flex: 2 }]} 
                placeholder="Telefone"
                keyboardType="phone-pad"
                value={newNumber}
                onChangeText={setNewNumber}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
                <Plus size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- 4. AÇÕES RÁPIDAS --- */}
        <View style={styles.grid}>
          <TouchableOpacity 
            onPress={toggleRecording}
            activeOpacity={0.8}
            style={[
              styles.gridButton, 
              recording && { backgroundColor: '#fef2f2', borderColor: '#fecaca' }
            ]}
          >
            <View style={[
              styles.gridIcon, 
              recording ? { backgroundColor: COLORS.red500 } : { backgroundColor: COLORS.slate100 }
            ]}>
              <Mic size={28} color={recording ? COLORS.white : COLORS.slate500} />
            </View>
            <Text style={[styles.gridTitle, recording && { color: COLORS.red600 }]}>
              {recording ? 'Gravando...' : 'Gravar Áudio'}
            </Text>
            <Text style={styles.gridSub}>Gerar Prova</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleSOSActivation}
            activeOpacity={0.8}
            style={styles.gridButton}
          >
            <View style={[styles.gridIcon, { backgroundColor: COLORS.blue50 }]}>
              <MapPin size={28} color={COLORS.blue600} />
            </View>
            <Text style={styles.gridTitle}>Localização</Text>
            <Text style={styles.gridSub}>Enviar Agora</Text>
          </TouchableOpacity>
        </View>

        {/* --- 5. DISCAGEM DE EMERGÊNCIA --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>DISCAGEM RÁPIDA</Text>
          
          <View style={styles.dialGrid}>
            <TouchableOpacity 
              style={styles.dialCard} 
              onPress={() => handleCall('190')}
              activeOpacity={0.8}
            >
              <View style={[styles.dialIcon, { backgroundColor: '#fee2e2' }]}>
                <Siren size={28} color={COLORS.red600} />
              </View>
              <View>
                <Text style={styles.dialNumber}>190</Text>
                <Text style={styles.dialName}>Polícia</Text>
              </View>
              <View style={styles.callIconFloat}>
                <Phone size={16} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dialCard} 
              onPress={() => handleCall('180')}
              activeOpacity={0.8}
            >
              <View style={[styles.dialIcon, { backgroundColor: '#f3e8ff' }]}>
                <ShieldAlert size={28} color={COLORS.purple600} />
              </View>
              <View>
                <Text style={styles.dialNumber}>180</Text>
                <Text style={styles.dialName}>Mulher</Text>
              </View>
              <View style={[styles.callIconFloat, { backgroundColor: COLORS.purple600 }]}>
                <Phone size={16} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- 6. DICA --- */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <AlertTriangle size={20} color="#fecaca" />
            <Text style={styles.tipLabel}>DICA DE SEGURANÇA</Text>
          </View>
          <Text style={styles.tipText}>
            "Se não puder falar, deixe a linha 190 aberta ou ative o gravador deste app. Sua segurança vem primeiro."
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate50,
  },
  
  // HEADER CORRIGIDO
  headerWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    marginBottom: -50,
    zIndex: 0,
  },
  headerBg: {
    paddingBottom: 70,
    position: 'relative',
    // O padding top é injetado via estilo inline
  },
  blob1: {
    position: 'absolute',
    top: -60, left: -40,
    width: 250, height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.red500,
    opacity: 0.6,
  },
  blob2: {
    position: 'absolute',
    bottom: 0, right: -40,
    width: 200, height: 200,
    borderRadius: 100,
    backgroundColor: '#881337',
    opacity: 0.3,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  settingsButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    gap: 6,
  },
  modeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 280,
  },

  // SCROLL CONTENT
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 24,
    zIndex: 10,
  },

  // SOS BUTTON
  sosContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  pulseContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 240,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    elevation: 15,
    shadowColor: COLORS.red600,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    zIndex: 2,
  },
  sosButtonSent: {
    shadowColor: COLORS.slate900,
  },
  sosGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pulseRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    zIndex: 1,
  },
  sosTextMain: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 2,
  },
  sosTextSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 0,
  },
  sosTextStatus: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  spin: {
    transform: [{ rotate: '45deg' }]
  },

  // STATUS BANNER
  statusBanner: {
    backgroundColor: COLORS.slate900,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  statusIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  statusDesc: {
    color: COLORS.slate400,
    fontSize: 13,
    lineHeight: 18,
  },

  // SECTIONS
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.slate500,
    letterSpacing: 1,
  },

  // CONTACTS CARD
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  contactList: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.slate400,
    fontStyle: 'italic',
    fontSize: 14,
    paddingVertical: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.slate50,
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.slate100,
  },
  contactAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.red100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.red700,
    fontWeight: 'bold',
    fontSize: 14,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.slate800,
  },
  contactNumber: {
    fontSize: 12,
    color: COLORS.slate500,
  },
  deleteBtn: {
    padding: 8,
  },
  addContactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    backgroundColor: COLORS.slate50,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 14,
    color: COLORS.slate800,
  },
  addButton: {
    backgroundColor: COLORS.slate900,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // GRID ACTIONS
  grid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  gridButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  gridIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.slate800,
    marginBottom: 2,
  },
  gridSub: {
    fontSize: 12,
    color: COLORS.slate500,
  },

  // DIAL GRID
  dialGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  dialCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  dialIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dialNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.slate900,
    lineHeight: 24,
  },
  dialName: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.slate500,
    textTransform: 'uppercase',
  },
  callIconFloat: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.red600,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },

  // TIP CARD
  tipCard: {
    backgroundColor: COLORS.slate900,
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  tipLabel: {
    color: '#fecaca',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tipText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});