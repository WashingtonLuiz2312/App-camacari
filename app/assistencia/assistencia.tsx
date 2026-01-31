import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==========================================
// 1. CONFIGURAÇÕES & CORES (Tema: Assistência Social = Laranja)
// ==========================================
const { width } = Dimensions.get('window');
const SPACING = 20;
const CARD_GAP = 16;
const CARD_WIDTH = (width - (SPACING * 2) - CARD_GAP) / 2;

const COLORS = {
  primary: '#FB8C00',     // Laranja Marca
  primaryDark: '#EF6C00', 
  primaryLight: '#FFF3E0', 
  bg: '#F8F9FA',
  surface: '#FFFFFF',
  textMain: '#1F2937',
  textSec: '#6B7280',
  white: '#FFFFFF',
  border: '#F3F4F6',
};

// ==========================================
// 2. DADOS DOS SERVIÇOS
// ==========================================
const SOCIAL_SERVICES = [
  {
    id: '1',
    title: 'CadÚnico',
    desc: 'Inscrição e atualização cadastral.',
    icon: 'document-text',
    status: 'Agendamento',
  },
  {
    id: '2',
    title: 'Bolsa Família',
    desc: 'Consulta de benefícios e calendário.',
    icon: 'wallet',
    status: 'Consulta',
  },
  {
    id: '3',
    title: 'CRAS / CREAS',
    desc: 'Localize a unidade mais próxima.',
    icon: 'location',
    status: null,
  },
  {
    id: '4',
    title: 'Auxílio Emergencial',
    desc: 'Verifique se você tem direito.',
    icon: 'alert-circle',
    status: 'Novo',
  },
  {
    id: '5',
    title: 'Cesta Básica',
    desc: 'Solicitação de benefício eventual.',
    icon: 'basket',
    status: null,
  },
  {
    id: '6',
    title: 'Idoso & PCD',
    desc: 'Carteira e benefícios específicos.',
    icon: 'accessibility',
    status: null,
  },
];

// ==========================================
// 3. COMPONENTES
// ==========================================

const Header = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerTop}>
      <TouchableOpacity onPress={onBack} style={styles.iconButton}>
        <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.profileBox}>
        <Ionicons name="person-circle" size={32} color={COLORS.primaryLight} />
      </View>
    </View>
    
    <View style={styles.headerTexts}>
      <Text style={styles.headerTitle}>Assistência Social</Text>
      <Text style={styles.headerSubtitle}>
        Programas, benefícios e apoio ao cidadão de Camaçari.
      </Text>
    </View>
  </View>
);

const HighlightBanner = () => (
  <View style={styles.bannerContainer}>
    <View style={styles.bannerContent}>
      <View style={styles.bannerTag}>
        <Text style={styles.bannerTagText}>IMPORTANTE</Text>
      </View>
      <Text style={styles.bannerTitle}>Atualize seu CadÚnico</Text>
      <Text style={styles.bannerText}>
        Evite o bloqueio do seu benefício. O prazo para atualização vai até 30/06.
      </Text>
      <TouchableOpacity style={styles.bannerButton}>
        <Text style={styles.bannerButtonText}>Agendar Agora</Text>
        <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
    <View style={styles.bannerIconBox}>
      <Ionicons name="people" size={60} color="rgba(255,255,255,0.2)" />
    </View>
  </View>
);

const ServiceCard = ({ item }: { item: any }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.7}>
    <View style={styles.cardHeader}>
      <View style={styles.iconBox}>
        <Ionicons name={item.icon} size={24} color={COLORS.primaryDark} />
      </View>
      {item.status && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      )}
    </View>
    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
    <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
  </TouchableOpacity>
);

// ==========================================
// 4. TELA PRINCIPAL
// ==========================================
export default function AssistenciaScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* HEADER BACKGROUND (Bloco Laranja Curvo) */}
      <View style={[styles.orangeBlock, { height: 240 + insets.top }]} />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Header onBack={() => router.back()} />

        <View style={styles.contentLayer}>
          {/* BANNER DE DESTAQUE */}
          <View style={styles.bannerWrapper}>
            <HighlightBanner />
          </View>

          {/* GRID DE SERVIÇOS */}
          <View style={styles.gridSection}>
            <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
            <View style={styles.gridContainer}>
              {SOCIAL_SERVICES.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </View>
          </View>

          {/* CARD DE AJUDA */}
          <TouchableOpacity style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Ionicons name="call" size={24} color="#FFF" />
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Central de Atendimento</Text>
              <Text style={styles.helpText}>Dúvidas? Ligue para o Social: 156</Text>
            </View>
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
  orangeBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // HEADER
  headerContainer: {
    paddingHorizontal: SPACING,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileBox: {
    padding: 4,
  },
  headerTexts: {
    gap: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '90%',
    lineHeight: 20,
  },

  // CONTEÚDO
  contentLayer: {
    flex: 1,
    paddingHorizontal: SPACING,
  },

  // BANNER DESTAQUE
  bannerWrapper: {
    marginTop: 10,
    marginBottom: 24,
  },
  bannerContainer: {
    backgroundColor: '#EF6C00', // Tom mais escuro para contraste
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerContent: {
    flex: 1,
    zIndex: 2,
  },
  bannerIconBox: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    zIndex: 1,
  },
  bannerTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bannerTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
  },
  bannerButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  // GRID
  gridSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },

  // CARD DE SERVIÇO
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: COLORS.primaryDark,
    fontSize: 10,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.textSec,
    lineHeight: 16,
  },

  // CARD AJUDA
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  helpText: {
    fontSize: 12,
    color: COLORS.textSec,
  },
});