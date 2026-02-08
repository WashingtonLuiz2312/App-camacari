import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  StatusBar, 
  Dimensions,
  Animated,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { 
  FileText, 
  Lock, 
  Unlock, 
  Calendar, 
  Upload, 
  ArrowLeft, 
  ShieldCheck, 
  Plus, 
  Image as ImageIcon,
  MoreVertical,
  Search,
  FileAudio,
  X
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// --- CORES ---
const COLORS = {
  slate950: '#020617',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate300: '#cbd5e1',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  slate50: '#f8fafc',
  
  violet900: '#4c1d95',
  violet800: '#5b21b6',
  violet700: '#6d28d9',
  violet600: '#7c3aed',
  violet500: '#8b5cf6',
  violet400: '#a78bfa',
  violet300: '#c4b5fd',
  violet200: '#ddd6fe',
  violet100: '#ede9fe',
  violet50: '#f5f3ff',
  
  fuchsia600: '#c026d3',
  fuchsia300: '#f0abfc',
  
  pink600: '#db2777',
  pink300: '#f9a8d4',
  
  emerald400: '#34d399',
  
  white: '#ffffff',
  black: '#000000',
};

// --- DADOS MOCKADOS ---
const initialEvidences = [
  { id: 1, title: "Prints WhatsApp - Ameaças", date: "06 Dez, 2025", type: "image", size: "2.4 MB" },
  { id: 2, title: "Áudio da discussão", date: "05 Dez, 2025", type: "audio", size: "5.1 MB" },
  { id: 3, title: "Relato do incidente", date: "01 Dez, 2025", type: "text", size: "15 KB" },
];

export default function EvidenceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Estados
  const [locked, setLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [evidences, setEvidences] = useState(initialEvidences);
  
  // Animação Shake
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Função Shake
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const handleUnlock = () => {
    if (password === "1234") { // Senha simples para demo mobile (numérica é melhor)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setLocked(false);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      triggerShake();
      Alert.alert("Acesso Negado", "Senha incorreta.");
      setPassword("");
    }
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon size={24} color={COLORS.violet600} />;
      case 'audio': return <FileAudio size={24} color={COLORS.pink600} />;
      default: return <FileText size={24} color={COLORS.slate600} />;
    }
  };

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Sucesso", "Evidência salva no cofre criptografado.");
    setIsAdding(false);
  };

  // --- TELA DE BLOQUEIO (DARK VAULT) ---
  if (locked) {
    return (
      <View style={styles.lockedContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.slate950} />
        
        {/* Background Effects */}
        <View style={styles.blobTop} />
        <View style={styles.blobBottom} />
        <View style={styles.noiseOverlay} />

        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButtonLock}
          >
            <ArrowLeft size={20} color={COLORS.slate400} />
            <Text style={styles.backTextLock}>Voltar</Text>
          </TouchableOpacity>

          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.lockContent}
          >
            <Animated.View style={{ transform: [{ translateX: shakeAnimation }], width: '100%', alignItems: 'center' }}>
              
              <View style={styles.lockIconContainer}>
                <View style={styles.lockGlow} />
                <Lock size={40} color={COLORS.violet500} style={{ zIndex: 10 }} />
              </View>

              <Text style={styles.lockTitle}>Cofre Seguro</Text>
              <Text style={styles.lockSubtitle}>Ambiente criptografado e confidencial.</Text>

              <View style={styles.lockCard}>
                <Text style={styles.labelLock}>SENHA DE ACESSO</Text>
                
                <TextInput
                  style={styles.inputLock}
                  placeholder="••••"
                  placeholderTextColor={COLORS.slate600}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  autoFocus
                />

                <TouchableOpacity 
                  style={styles.unlockButton}
                  onPress={handleUnlock}
                  activeOpacity={0.8}
                >
                  <Unlock size={20} color={COLORS.white} style={{ marginRight: 8 }} />
                  <Text style={styles.unlockText}>Desbloquear</Text>
                </TouchableOpacity>

                <Text style={styles.idText}>ID: VIOLET-VAULT-2025 (Senha: 1234)</Text>
              </View>

              <View style={styles.securityBadge}>
                <ShieldCheck size={14} color={COLORS.violet500} />
                <Text style={styles.securityText}>Criptografia AES-256</Text>
              </View>

            </Animated.View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }

  // --- TELA DESBLOQUEADA (DASHBOARD) ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* HEADER APP */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.headerBackBtn}
            >
              <ArrowLeft size={20} color={COLORS.slate600} />
            </TouchableOpacity>
            
            <View style={styles.headerTitleBox}>
              <View style={styles.lockBadge}>
                <Lock size={14} color={COLORS.violet600} />
              </View>
              <Text style={styles.headerTitle}>Cofre de Evidências</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Search size={20} color={COLORS.slate400} />
            </TouchableOpacity>
            <View style={styles.userAvatar}>
              <Text style={styles.userInitials}>JD</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        
        {!isAdding ? (
          <>
            {/* STATS HERO */}
            <View style={styles.heroCard}>
              {/* Orbs */}
              <View style={styles.heroOrb1} />
              <View style={styles.heroOrb2} />

              <View style={styles.heroInner}>
                <View style={styles.heroTop}>
                  <View>
                    <View style={styles.statusRow}>
                      <View style={styles.statusDot} />
                      <Text style={styles.statusText}>STATUS: PROTEGIDO</Text>
                    </View>
                    <Text style={styles.statsCount}>{evidences.length} Arquivos</Text>
                    <Text style={styles.statsSub}>Armazenados com segurança máxima.</Text>
                  </View>
                  <ShieldCheck size={32} color="rgba(167, 139, 250, 0.5)" />
                </View>

                {/* Action Chips */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                  <TouchableOpacity style={styles.chipBtn}>
                    <FileText size={16} color={COLORS.violet300} style={{marginRight: 6}} />
                    <Text style={styles.chipText}>Relatórios</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chipBtn}>
                    <ImageIcon size={16} color={COLORS.fuchsia300} style={{marginRight: 6}} />
                    <Text style={styles.chipText}>Mídia</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chipBtn}>
                    <FileAudio size={16} color={COLORS.pink300} style={{marginRight: 6}} />
                    <Text style={styles.chipText}>Áudios</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>

            {/* LISTA */}
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Recentes</Text>
              <Text style={styles.listSub}>Ordenado por data</Text>
            </View>

            {evidences.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard} activeOpacity={0.7}>
                <View style={styles.itemHoverBar} />
                
                <View style={styles.itemIconBox}>
                  {getIconByType(item.type)}
                </View>

                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.itemMetaRow}>
                    <Text style={styles.itemMetaBadge}>{item.size}</Text>
                    <Text style={styles.itemDate}>• {item.date}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.moreBtn}>
                  <MoreVertical size={20} color={COLORS.slate300} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          /* FORMULÁRIO DE ADIÇÃO */
          <View style={styles.formContainer}>
            <TouchableOpacity 
              onPress={() => setIsAdding(false)}
              style={styles.cancelBtn}
            >
              <View style={styles.cancelIcon}>
                <ArrowLeft size={20} color={COLORS.slate600} />
              </View>
              <Text style={styles.cancelText}>Cancelar Upload</Text>
            </TouchableOpacity>

            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Nova Evidência</Text>
                <Text style={styles.formSub}>Preencha os detalhes para catalogar.</Text>
              </View>

              <View style={styles.formBody}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>TÍTULO DO ARQUIVO</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Ex: Mensagens de ontem"
                    placeholderTextColor={COLORS.slate400}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.inputLabel}>DATA</Text>
                    <View style={styles.dateInputWrapper}>
                      <Calendar size={16} color={COLORS.violet500} style={styles.inputIcon} />
                      <TextInput 
                        style={[styles.input, { paddingLeft: 40 }]}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor={COLORS.slate400}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>TIPO</Text>
                    <View style={styles.selectInput}>
                      <Text style={{color: COLORS.slate600}}>Selecione...</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>DESCRIÇÃO</Text>
                  <TextInput 
                    style={[styles.input, { height: 100, textAlignVertical: 'top', paddingTop: 12 }]}
                    placeholder="Descreva o contexto..."
                    placeholderTextColor={COLORS.slate400}
                    multiline
                  />
                </View>

                <TouchableOpacity style={styles.dropzone}>
                  <View style={styles.uploadIconCircle}>
                    <Upload size={24} color={COLORS.violet600} />
                  </View>
                  <Text style={styles.dropzoneText}>Toque para enviar arquivos</Text>
                  <Text style={styles.dropzoneSub}>Imagens, Vídeos, PDF (Máx 50MB)</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.saveBtn}
                  onPress={handleSave}
                >
                  <Text style={styles.saveBtnText}>Salvar no Cofre</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      {/* FAB (Floating Action Button) */}
      {!isAdding && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => {
            Haptics.selectionAsync();
            setIsAdding(true);
          }}
          activeOpacity={0.8}
        >
          <Plus size={32} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // --- TELA DE BLOQUEIO ---
  lockedContainer: {
    flex: 1,
    backgroundColor: COLORS.slate950,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blobTop: {
    position: 'absolute',
    top: -50, left: -50,
    width: 300, height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(76, 29, 149, 0.3)', // violet-900
    opacity: 0.5,
  },
  blobBottom: {
    position: 'absolute',
    bottom: -50, right: -50,
    width: 300, height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(112, 26, 117, 0.2)', // fuchsia-900
    opacity: 0.5,
  },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.02)',
    // Em produção usaria uma imagem de ruído repetida
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  backButtonLock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
  },
  backTextLock: {
    color: COLORS.slate400,
    marginLeft: 8,
    fontSize: 16,
  },
  lockContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lockIconContainer: {
    width: 96,
    height: 96,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: COLORS.slate800,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  lockGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderRadius: 32,
  },
  lockTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  lockSubtitle: {
    fontSize: 16,
    color: COLORS.slate400,
    marginBottom: 40,
  },
  lockCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(30, 41, 59, 0.5)',
    padding: 32,
  },
  labelLock: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.slate500,
    letterSpacing: 2,
    marginBottom: 12,
  },
  inputLock: {
    backgroundColor: 'rgba(2, 6, 23, 0.5)',
    borderWidth: 1,
    borderColor: COLORS.slate800,
    borderRadius: 16,
    height: 64,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
    marginBottom: 24,
  },
  unlockButton: {
    backgroundColor: COLORS.violet600,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.violet900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  unlockText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  idText: {
    textAlign: 'center',
    color: COLORS.slate600,
    fontSize: 10,
    marginTop: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    gap: 8,
  },
  securityText: {
    color: COLORS.slate500,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // --- APP DASHBOARD ---
  container: {
    flex: 1,
    backgroundColor: COLORS.slate50,
  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate200,
    zIndex: 50,
  },
  headerContent: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lockBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.violet100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.slate800,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.violet600,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInitials: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // HERO CARD
  heroCard: {
    backgroundColor: '#1a103c', // deep violet dark
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.violet900,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  heroOrb1: {
    position: 'absolute',
    top: -50, right: -50,
    width: 200, height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.violet600,
    opacity: 0.3,
    transform: [{ scale: 1.5 }],
  },
  heroOrb2: {
    position: 'absolute',
    bottom: -30, left: -30,
    width: 150, height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.fuchsia600,
    opacity: 0.2,
  },
  heroInner: {
    zIndex: 10,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.emerald400,
  },
  statusText: {
    color: COLORS.violet200,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statsCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statsSub: {
    color: COLORS.slate400,
    fontSize: 14,
    marginTop: 4,
  },
  chipsScroll: {
    flexDirection: 'row',
  },
  chipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 40,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  chipText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },

  // LISTA
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.slate800,
  },
  listSub: {
    fontSize: 12,
    color: COLORS.slate400,
    fontWeight: '500',
  },
  itemCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate200,
    position: 'relative',
    overflow: 'hidden',
  },
  itemHoverBar: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: 4,
    backgroundColor: COLORS.violet500,
    opacity: 0, // Logic for hover not applicable, use active opacity
  },
  itemIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.slate50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate100,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.slate800,
    marginBottom: 4,
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemMetaBadge: {
    backgroundColor: COLORS.slate100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.slate600,
  },
  itemDate: {
    fontSize: 12,
    color: COLORS.slate500,
  },
  moreBtn: {
    padding: 8,
  },

  // FORMULÁRIO
  formContainer: {
    marginTop: 10,
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  cancelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.slate600,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    shadowColor: COLORS.slate200,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  formHeader: {
    backgroundColor: COLORS.violet50,
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.violet100,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.violet900,
    marginBottom: 4,
  },
  formSub: {
    fontSize: 14,
    color: 'rgba(124, 58, 237, 0.8)',
  },
  formBody: {
    padding: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.slate400,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: COLORS.slate50,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.slate900,
  },
  row: {
    flexDirection: 'row',
  },
  dateInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  selectInput: {
    height: 56,
    backgroundColor: COLORS.slate50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  dropzone: {
    borderWidth: 2,
    borderColor: COLORS.violet200,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(245, 243, 255, 0.5)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  dropzoneText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.violet900,
  },
  dropzoneSub: {
    fontSize: 12,
    color: 'rgba(124, 58, 237, 0.7)',
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: COLORS.slate900,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.slate900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.violet600,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.violet600,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});