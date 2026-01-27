import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==========================================
// 1. PALETA DE CORES PROFISSIONAL & VIBRANTE
// ==========================================
const { width } = Dimensions.get('window');
const SPACING = 20;
const CARD_GAP = 16;
const CARD_WIDTH = (width - (SPACING * 2) - CARD_GAP) / 2;

const COLORS = {
  // Cores da Marca (Vibrantes)
  green: '#7CB342',
  purple: '#8E24AA',
  orange: '#FB8C00',
  red: '#E53935',
  
  // Cores de Suporte (Neutras)
  bg: '#F8F9FA',         // Fundo levemente cinza
  surface: '#FFFFFF',    // Branco puro para cards
  textMain: '#1F2937',   // Preto suave para leitura
  textSec: '#6B7280',    // Cinza para descrições
  border: '#F3F4F6',     // Bordas sutis
};

// ==========================================
// 2. DADOS DOS SERVIÇOS (COM CORES DEFINIDAS)
// ==========================================
// Estratégia: Atribuir cores da marca a funções específicas para guiar o olhar.
const SERVICES = [
  {
    id: '1',
    title: 'Nova Matrícula',
    desc: 'Inscrição para novos alunos.',
    icon: 'person-add',
    status: 'Aberto',
    color: COLORS.green, // Verde: Início, positivo
  },
  {
    id: '2',
    title: 'Rematrícula',
    desc: 'Renovação anual obrigatória.',
    icon: 'sync',
    status: 'Aberto',
    color: COLORS.purple, // Roxo: Institucional, continuidade
  },
  {
    id: '3',
    title: 'Transferência',
    desc: 'Mudança entre unidades.',
    icon: 'swap-horizontal',
    status: 'Em Breve',
    color: COLORS.orange, // Laranja: Mudança, atenção
  },
  {
    id: '4',
    title: 'Boletim Digital',
    desc: 'Notas e frequência.',
    icon: 'bar-chart',
    status: null,
    color: COLORS.red, // Vermelho: Importante, dados
  },
  {
    id: '5',
    title: 'Transporte',
    desc: 'Rota e carteirinha.',
    icon: 'bus',
    status: null,
    color: COLORS.orange, // Laranja: Logística
  },
  {
    id: '6',
    title: 'Calendário',
    desc: 'Feriados e provas.',
    icon: 'calendar-number',
    status: null,
    color: COLORS.purple, // Roxo: Organização
  },
];

// ==========================================
// 3. COMPONENTES
// ==========================================

const Header = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerTopRow}>
      <TouchableOpacity onPress={onBack} style={styles.iconButtonGlass}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
      
      <View style={styles.profileBadgeGlass}>
        <Text style={styles.profileText}>Olá, Estudante</Text>
        <Ionicons name="happy-outline" size={24} color="#FFF" />
      </View>
    </View>
    
    <View style={styles.headerTexts}>
      <Text style={styles.headerTitle}>Portal da Educação</Text>
      <Text style={styles.headerSubtitle}>
        Gerencie sua vida escolar de forma simples e colorida.
      </Text>
    </View>
  </View>
);

const AlertBanner = () => (
  <View style={styles.bannerContainer}>
    <View style={styles.bannerIcon}>
      <Ionicons name="megaphone" size={24} color="#FFF" />
    </View>
    <View style={styles.bannerContent}>
      <Text style={styles.bannerTitle}>Matrículas Abertas!</Text>
      <Text style={styles.bannerText}>
        Prazo final: 28/02. Toque para saber mais.
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
  </View>
);

const ServiceCard = ({ item }: { item: any }) => {
  // Define a cor do badge baseado no status
  const isAlertStatus = item.status === 'Em Breve';
  const badgeBg = isAlertStatus ? COLORS.orange + '20' : COLORS.green + '20'; // 20% de opacidade
  const badgeText = isAlertStatus ? COLORS.orange : COLORS.green;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        {/* O fundo do ícone usa a cor do item com 15% de opacidade (+ '25') para um efeito sutil */}
        <View style={[styles.iconBox, { backgroundColor: item.color + '25' }]}>
          <Ionicons name={item.icon} size={26} color={item.color} />
        </View>
        
        {item.status && (
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.badgeText, { color: badgeText }]}>
              {item.status}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
    </TouchableOpacity>
  );
};

// ==========================================
// 4. TELA PRINCIPAL
// ==========================================
export default function EducacaoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.green} />
      
      {/* HEADER CURVO VERDE */}
      <View style={[styles.greenBlock, { height: 220 + insets.top }]} />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Header onBack={() => router.back()} />

        <View style={styles.contentLayer}>
          {/* BANNER FLUTUANTE */}
          <View style={styles.bannerWrapper}>
            <AlertBanner />
          </View>

          {/* GRID COLORIDO */}
          <View style={styles.gridSection}>
            <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
            <View style={styles.gridContainer}>
              {SERVICES.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </View>
          </View>
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
  greenBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.green,
    // Curva mais acentuada e moderna
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // HEADER GLASSSMORPHISM (Efeito Vidro sutil)
  headerContainer: {
    paddingHorizontal: SPACING,
    paddingBottom: 40,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  iconButtonGlass: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.2)', // Translúcido
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileBadgeGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  headerTexts: {
    gap: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.95)',
    maxWidth: '80%',
    lineHeight: 22,
  },

  // CAMADA DE CONTEÚDO
  contentLayer: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  
  // BANNER VIBRANTE
  bannerWrapper: {
    marginTop: -30, // Mais sobreposição
    marginBottom: 28,
  },
  bannerContainer: {
    backgroundColor: COLORS.orange, // Laranja vibrante para destaque
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // Sombra colorida e difusa (efeito glow)
    shadowColor: COLORS.orange,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
  },
  bannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 4,
  },
  bannerText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 13,
    lineHeight: 18,
  },

  // GRID
  gridSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  
  // CARD PROFISSIONAL & COLORIDO
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 24, // Bordas mais arredondadas
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    // Sombra muito suave e limpa
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    // A cor de fundo é definida dinamicamente no componente
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.textSec,
    lineHeight: 18,
  },
});