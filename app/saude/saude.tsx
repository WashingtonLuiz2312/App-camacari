import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// ==========================================
// 1. PALETA DE CORES & TEMA
// ==========================================
const { width } = Dimensions.get('window');
const SPACING = 24;

const COLORS = {
  primary: '#E53935',     // Vermelho Marca
  primaryDark: '#C62828', 
  primarySoft: '#FFEBEE',
  
  bg: '#F4F6F9',          // Off-white mais frio para saúde
  surface: '#FFFFFF',
  
  textTitle: '#1A1A1A',
  textBody: '#71717A',
  
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
};

// ==========================================
// 2. COMPONENTES VISUAIS AVANÇADOS
// ==========================================

// Header com Perfil
const Header = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerSubtitle}>Bem-vindo,</Text>
        <Text style={styles.headerTitle}>João da Silva</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.profileBtn}>
      <Image source={{ uri: 'https://github.com/shadcn.png' }} style={styles.avatar} />
      <View style={styles.onlineBadge} />
    </TouchableOpacity>
  </View>
);

// Cartão SUS com Efeito Premium
const SUSCard = () => (
  <View style={styles.cardContainer}>
    <LinearGradient
      colors={[COLORS.primary, '#FF5252', '#FF8A80']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.susCard}
    >
      {/* Background Decorativo */}
      <View style={styles.cardPattern} />
      <Ionicons name="medical" size={140} color="rgba(255,255,255,0.05)" style={styles.bgIcon} />

      {/* Topo do Cartão */}
      <View style={styles.cardTop}>
        <View style={styles.susLogo}>
          <Text style={styles.susText}>SUS</Text>
          <Text style={styles.digitalText}>Digital</Text>
        </View>
        <Ionicons name="qr-code" size={28} color="#FFF" />
      </View>

      {/* Chip Simulado */}
      <View style={styles.chip} />

      {/* Dados do Usuário */}
      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.cardLabel}>NÚMERO DO CARTÃO</Text>
          <Text style={styles.cardNumber}>8900 1234 5678 9010</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>VALIDADE</Text>
          <Text style={styles.cardValue}>12/28</Text>
        </View>
      </View>
    </LinearGradient>
    
    {/* Sombra Colorida (Glow Effect) */}
    <View style={styles.cardShadow} />
  </View>
);

// Próximo Compromisso (UX Vital)
const NextAppointment = () => (
  <View style={styles.appointmentContainer}>
    <Text style={styles.sectionTitle}>Próximo Agendamento</Text>
    <TouchableOpacity style={styles.appointmentCard} activeOpacity={0.8}>
      <View style={styles.dateBox}>
        <Text style={styles.dateDay}>28</Text>
        <Text style={styles.dateMonth}>MAI</Text>
      </View>
      
      <View style={styles.appointmentInfo}>
        <Text style={styles.doctorName}>Dr. Carlos Mendes</Text>
        <Text style={styles.specialty}>Cardiologista • Policlínica</Text>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={14} color={COLORS.primary} />
          <Text style={styles.timeText}>14:30</Text>
        </View>
      </View>
      
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </View>
    </TouchableOpacity>
  </View>
);

// Grid de Serviços
const ServiceGrid = () => {
  const services = [
    { id: 1, title: 'Vacinas', icon: 'shield-checkmark', color: COLORS.success },
    { id: 2, title: 'Exames', icon: 'flask', color: COLORS.info },
    { id: 3, title: 'Remédios', icon: 'medkit', color: COLORS.warning },
    { id: 4, title: 'UPA 24h', icon: 'navigate', color: COLORS.primary },
  ];

  return (
    <View style={styles.gridContainer}>
      <Text style={styles.sectionTitle}>Serviços Rápidos</Text>
      <View style={styles.grid}>
        {services.map((item) => (
          <TouchableOpacity key={item.id} style={styles.gridItem} activeOpacity={0.7}>
            <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <Text style={styles.gridLabel}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Botão de Emergência Flutuante
const EmergencyFAB = () => (
  <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
    <View style={styles.fabIcon}>
      <Ionicons name="call" size={24} color="#FFF" />
    </View>
    <Text style={styles.fabText}>Ligar 192</Text>
  </TouchableOpacity>
);

// ==========================================
// 3. TELA PRINCIPAL
// ==========================================
export default function SaudeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 10 }]}
        showsVerticalScrollIndicator={false}
      >
        <Header onBack={() => router.back()} />
        
        <SUSCard />
        
        <NextAppointment />
        
        <ServiceGrid />

        {/* Banner Informativo */}
        <View style={styles.bannerInfo}>
          <Ionicons name="information-circle" size={24} color={COLORS.primary} />
          <Text style={styles.bannerText}>
            Campanha de vacinação contra a Dengue ativa nos postos de saúde.
          </Text>
        </View>

      </ScrollView>

      {/* Botão de Emergência Fixo */}
      <View style={[styles.fabContainer, { bottom: insets.bottom + 20 }]}>
        <EmergencyFAB />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 100, // Espaço para o FAB
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textBody,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.textTitle,
    fontWeight: '800',
  },
  profileBtn: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  onlineBadge: {
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: COLORS.bg,
  },

  // SUS CARD (O Highlight)
  cardContainer: {
    paddingHorizontal: SPACING,
    marginBottom: 32,
    alignItems: 'center',
  },
  susCard: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    overflow: 'hidden',
    zIndex: 2,
  },
  cardPattern: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bgIcon: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    opacity: 0.2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  susLogo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  susText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  digitalText: {
    color: '#FFEBEE',
    fontSize: 14,
    fontWeight: '500',
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#FFD700', // Dourado
    borderRadius: 6,
    opacity: 0.8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontVariant: ['tabular-nums'],
  },
  cardValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cardShadow: {
    position: 'absolute',
    bottom: -15,
    width: '90%',
    height: 40,
    backgroundColor: COLORS.primary,
    opacity: 0.3,
    borderRadius: 20,
    zIndex: 1,
    transform: [{ scaleX: 0.9 }],
  },

  // TITULOS DE SEÇÃO
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textTitle,
    marginBottom: 16,
    marginLeft: SPACING,
  },

  // APPOINTMENT
  appointmentContainer: {
    paddingHorizontal: SPACING,
    marginBottom: 32,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 20,
    // Sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  dateBox: {
    backgroundColor: COLORS.primarySoft,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 16,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textTitle,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 13,
    color: COLORS.textBody,
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  arrowContainer: {
    padding: 8,
  },

  // GRID DE SERVIÇOS
  gridContainer: {
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING,
    gap: 16,
  },
  gridItem: {
    width: (width - (SPACING * 2) - 16) / 2, // 2 por linha
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textTitle,
  },

  // BANNER INFO
  bannerInfo: {
    marginHorizontal: SPACING,
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
  },

  // FAB (Botão de Emergência)
  fabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#D32F2F', // Vermelho Emergência
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    gap: 10,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 6,
    borderRadius: 20,
  },
  fabText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});