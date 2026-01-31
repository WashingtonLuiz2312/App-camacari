import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// ==========================================
// 1. DESIGN SYSTEM (TEMA: "JUSTIÇA PREMIUM")
// ==========================================
const { width } = Dimensions.get('window');
const SPACING = 20;

const COLORS = {
  // Base Profunda (Navy Blue)
  primary: '#0F172A',
  primaryLight: '#1E293B',
  primaryAccent: '#334155',
  
  // Acentos de Identidade
  gold: '#D97706',      // Toque de "Justiça" (Bronze/Ouro)
  success: '#059669',   // Verde (Defensoria)
  danger: '#DC2626',    // Vermelho (MPBA)
  purple: '#7C3AED',    // Roxo (TJBA)
  
  // Neutros
  bg: '#F8FAFC',        // Cinza azulado muito claro
  surface: '#FFFFFF',
  textMain: '#0F172A',
  textSec: '#64748B',
  border: '#E2E8F0',
};

// ==========================================
// 2. DADOS INTELIGENTES
// ==========================================
const INSTITUTIONS = [
  {
    id: '1',
    name: 'Defensoria Pública',
    role: 'Não pode pagar advogado?',
    icon: 'shield-checkmark',
    color: COLORS.success,
    bg: '#ECFDF5',
  },
  {
    id: '2',
    name: 'Ministério Público',
    role: 'Denúncias e Direitos',
    icon: 'megaphone', // Ícone de ação
    color: COLORS.danger,
    bg: '#FEF2F2',
  },
  {
    id: '3',
    name: 'Tribunal de Justiça',
    role: 'Processos e Audiências',
    icon: 'library',
    color: COLORS.purple,
    bg: '#F5F3FF',
  },
  {
    id: '4',
    name: 'CAJUC Municipal',
    role: 'Apoio Local',
    icon: 'business',
    color: COLORS.gold,
    bg: '#FFFBEB',
  },
];

const QUICK_ACTIONS = [
  { id: 1, label: 'Certidão Negativa', icon: 'document-text-outline' },
  { id: 2, label: 'Diário Oficial', icon: 'newspaper-outline' },
  { id: 3, label: 'Ouvidoria', icon: 'ear-outline' },
  { id: 4, label: 'Plantão Judiciário', icon: 'time-outline' },
];

// ==========================================
// 3. COMPONENTES DE ALTO NÍVEL
// ==========================================

const Header = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.glassBtn}>
      <Ionicons name="arrow-back" size={24} color="#FFF" />
    </TouchableOpacity>
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerOverline}>JURIDICO</Text>
      <Text style={styles.headerTitle}>Jurídico & Cidadania</Text>
    </View>
    <TouchableOpacity style={styles.glassBtn}>
      <Ionicons name="notifications-outline" size={24} color="#FFF" />
    </TouchableOpacity>
  </View>
);

// Widget de Status do Fórum (UX de Valor)
const ForumStatusWidget = () => {
  // Lógica fake de horário
  const isOpen = true; 
  return (
    <View style={styles.statusWidget}>
      <View style={styles.statusIndicator}>
        <View style={[styles.statusDot, { backgroundColor: isOpen ? '#10B981' : '#EF4444' }]} />
        <Text style={styles.statusText}>
          Fórum de Camaçari: <Text style={{fontWeight: '700', color: isOpen ? '#10B981' : '#EF4444'}}>{isOpen ? 'ABERTO AGORA' : 'FECHADO'}</Text>
        </Text>
      </View>
      <Text style={styles.statusSub}>Fecha às 18:00 • Plantão 24h via telefone</Text>
    </View>
  );
};

// Barra de Busca de Processo (Hero)
const ProcessSearch = () => (
  <View style={styles.searchContainer}>
    <Text style={styles.searchLabel}>CONSULTA PROCESSUAL UNIFICADA</Text>
    <View style={styles.inputWrapper}>
      <View style={styles.inputInner}>
        <Ionicons name="search" size={20} color={COLORS.textSec} style={{marginLeft: 12}} />
        <TextInput 
          style={styles.input}
          placeholder="Digite o Nº do Processo (PJE/PROJUDI)"
          placeholderTextColor={COLORS.textSec}
        />
      </View>
      <TouchableOpacity style={styles.searchBtn}>
        <Ionicons name="arrow-forward" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
    <View style={styles.chipsRow}>
      <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>TJBA</Text></TouchableOpacity>
      <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>TRT5</Text></TouchableOpacity>
      <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Justiça Federal</Text></TouchableOpacity>
    </View>
  </View>
);

// Card Institucional Horizontal (Estilo Apple Wallet)
const InstitutionCard = ({ item }: { item: any }) => (
  <TouchableOpacity style={[styles.instCard, { borderLeftColor: item.color }]} activeOpacity={0.7}>
    <View style={[styles.instIconBox, { backgroundColor: item.bg }]}>
      <Ionicons name={item.icon} size={28} color={item.color} />
    </View>
    <View style={styles.instContent}>
      <Text style={styles.instName}>{item.name}</Text>
      <Text style={styles.instRole}>{item.role}</Text>
    </View>
    <View style={styles.arrowCircle}>
      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
    </View>
  </TouchableOpacity>
);

// ==========================================
// 4. TELA PRINCIPAL
// ==========================================
export default function JuridicoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* HEADER BACKGROUND SOFISTICADO */}
      <View style={styles.headerBgContainer}>
        <LinearGradient
          colors={[COLORS.primary, '#1e293b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.headerBg, { height: 280 + insets.top }]}
        >
          {/* Pattern Geométrico Sutil */}
          <Ionicons name="grid-outline" size={300} color="rgba(255,255,255,0.03)" style={styles.bgPattern} />
        </LinearGradient>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Header onBack={() => router.back()} />

        {/* ÁREA DE DESTAQUE */}
        <View style={styles.heroSection}>
          <ProcessSearch />
          <ForumStatusWidget />
        </View>

        {/* BODY (FUNDO BRANCO ARREDONDADO) */}
        <View style={styles.bodyContainer}>
          
          {/* AÇÕES RÁPIDAS (ÍCONES GRANDES) */}
          <View style={styles.quickActionsRow}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionItem}>
                <View style={styles.actionIconCircle}>
                  <Ionicons name={action.icon as any} size={22} color={COLORS.primary} />
                </View>
                <Text style={styles.actionLabel} numberOfLines={2}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* LISTA DE INSTITUIÇÕES */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Órgãos de Justiça</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver mapa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.instList}>
            {INSTITUTIONS.map((item) => (
              <InstitutionCard key={item.id} item={item} />
            ))}
          </View>

          {/* CARD DE DÚVIDA JURÍDICA */}
          <TouchableOpacity style={styles.helpCard}>
            <LinearGradient
              colors={['#334155', '#0F172A']}
              start={{x:0, y:0}} end={{x:1, y:0}}
              style={styles.helpGradient}
            >
              <View>
                <Text style={styles.helpTitle}>Dúvidas sobre seus direitos?</Text>
                <Text style={styles.helpText}>Fale com a Assistente Virtual da Defensoria.</Text>
              </View>
              <Ionicons name="chatbubbles" size={32} color={COLORS.gold} />
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  headerBgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerBg: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  bgPattern: {
    position: 'absolute',
    top: -50,
    right: -50,
    opacity: 0.5,
    transform: [{ rotate: '15deg' }]
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    marginBottom: 20,
    marginTop: 10,
  },
  glassBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerOverline: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 2,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },

  // HERO & SEARCH
  heroSection: {
    paddingHorizontal: SPACING,
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    height: 56,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 14,
    color: COLORS.textMain,
  },
  searchBtn: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.gold, // Destaque no botão
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chipText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },

  // STATUS WIDGET
  statusWidget: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Fundo escuro translúcido
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  statusSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginLeft: 16,
  },

  // BODY
  bodyContainer: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  
  // QUICK ACTIONS
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 10, // Sobrepor levemente ou dar espaço
  },
  actionItem: {
    alignItems: 'center',
    width: '22%',
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 11,
    color: COLORS.textMain,
    textAlign: 'center',
    fontWeight: '600',
  },

  // INSTITUTIONS LIST
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  instList: {
    gap: 12,
    marginBottom: 32,
  },
  instCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    borderLeftWidth: 4, // Indicador colorido lateral
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  instIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instContent: {
    flex: 1,
  },
  instName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  instRole: {
    fontSize: 12,
    color: COLORS.textSec,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // HELP CARD
  helpCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  helpGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  helpTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  helpText: {
    color: '#CBD5E1',
    fontSize: 12,
    maxWidth: 200,
  },
});