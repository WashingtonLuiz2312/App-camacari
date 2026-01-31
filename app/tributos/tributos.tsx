import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==========================================
// 1. DESIGN SYSTEM (TEMA: FINANÇAS = ROXO)
// ==========================================
const { width } = Dimensions.get('window');
const SPACING = 24;

const COLORS = {
  // Primária: Roxo da Marca (Sofisticação Financeira)
  primary: '#8E24AA',
  primaryDark: '#4A148C',
  primaryGradient: ['#8E24AA', '#BA68C8'] as const, // Gradiente Roxo
  primaryLight: '#F3E5F5',

  // Cores Semânticas (A "Brincadeira" com a paleta)
  success: '#7CB342', // Verde (Pago)
  warning: '#FB8C00', // Laranja (A vencer)
  danger: '#E53935',  // Vermelho (Atrasado)
  info: '#039BE5',    // Azul (Informação)
  
  bg: '#F4F6F8',      // Cinza neutro
  surface: '#FFFFFF',
  textHeading: '#111827',
  textBody: '#6B7280',
  border: '#E5E7EB',
};

// ==========================================
// 2. DADOS MOCKADOS
// ==========================================

// Resumo principal
const FINANCIAL_SUMMARY = {
  totalDue: 'R$ 1.250,45',
  nextDueDate: '10/05/2024',
  mainTax: 'IPTU 2024 - Cota Única',
  status: 'warning' // success, warning, danger
};

// Ações Rápidas (Bento Grid)
const QUICK_ACTIONS = [
  { id: 1, title: '2ª Via de Conta', icon: 'barcode', color: COLORS.primary },
  { id: 2, title: 'Negociar Dívida', icon: 'hand-left', color: COLORS.warning },
  { id: 3, title: 'Certidões', icon: 'document-text', color: COLORS.info },
  { id: 4, title: 'Meus Imóveis', icon: 'home', color: COLORS.primary },
];

// Histórico Recente
const RECENT_ACTIVITY = [
  { id: '1', title: 'Pagamento IPTU Cota 03', date: 'Ontem', amount: 'R$ 320,00', status: 'paid', type: 'IPTU' },
  { id: '2', title: 'Taxa de Lixo (TFF)', date: '20/04', amount: 'R$ 85,90', status: 'pending', type: 'TFF' },
  { id: '3', title: 'ISS Autônomo', date: '15/04', amount: 'R$ 150,00', status: 'overdue', type: 'ISS' },
];

// ==========================================
// 3. COMPONENTES DE UI (SÊNIOR LEVEL)
// ==========================================

// Header com saldo ocultável
const Header = ({ onBack }: { onBack: () => void }) => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeading} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tributos & Finanças</Text>
      </View>
      <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={styles.iconBtn}>
        <Ionicons name={balanceVisible ? "eye" : "eye-off"} size={24} color={COLORS.textHeading} />
      </TouchableOpacity>
    </View>
  );
};

// O "Hero" Card - Painel Principal Financeiro
const FinanceHeroCard = ({ summary, visible = true }: any) => {
  const statusColor = summary.status === 'success' ? COLORS.success : summary.status === 'warning' ? COLORS.warning : COLORS.danger;

  return (
    <View style={styles.heroContainer}>
      <LinearGradient
        colors={COLORS.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        {/* Pattern de fundo sutil */}
        <Ionicons name="trending-up" size={150} color="rgba(255,255,255,0.05)" style={styles.cardPatternIcon} />

        <View style={styles.cardTop}>
          <Text style={styles.cardLabel}>TOTAL A PAGAR</Text>
          <View style={[styles.statusBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={styles.statusText}>Vence em breve</Text>
          </View>
        </View>

        <View style={styles.balanceRow}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.balanceValue}>
            {visible ? '1.250,45' : '••••••'}
          </Text>
        </View>

        <Text style={styles.mainTaxText}>{summary.mainTax} • Vence {summary.nextDueDate}</Text>

        <TouchableOpacity style={styles.payButton} activeOpacity={0.9}>
          <Text style={styles.payButtonText}>Pagar Agora</Text>
          <Ionicons name="arrow-forward-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </LinearGradient>
      {/* Glow Roxo */}
      <View style={styles.cardGlow} />
    </View>
  );
};

// Grid de Ações (Estilo App Icon)
const QuickActionGrid = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Serviços Rápidos</Text>
    <View style={styles.grid}>
      {QUICK_ACTIONS.map((item) => (
        <TouchableOpacity key={item.id} style={styles.gridItem} activeOpacity={0.7}>
          <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon as any} size={26} color={item.color} />
          </View>
          <Text style={styles.gridLabel}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// Lista de Transações Recentes
const TransactionHistory = () => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'paid': return { icon: 'checkmark-circle', color: COLORS.success, text: 'Pago' };
      case 'pending': return { icon: 'time', color: COLORS.warning, text: 'Pendente' };
      case 'overdue': return { icon: 'alert-circle', color: COLORS.danger, text: 'Atrasado' };
      default: return { icon: 'help', color: COLORS.textBody, text: '' };
    }
  };

  return (
    <View style={styles.section}>
       <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Atividade Recente</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllLink}>Ver tudo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.historyList}>
        {RECENT_ACTIVITY.map((item) => {
          const statusData = getStatusIcon(item.status);
          return (
            <TouchableOpacity key={item.id} style={styles.historyItem} activeOpacity={0.7}>
              <View style={[styles.typeIcon, { backgroundColor: COLORS.primaryLight }]}>
                <Text style={styles.typeText}>{item.type.substring(0,1)}</Text>
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <View style={styles.historyMeta}>
                  <Ionicons name={statusData.icon as any} size={14} color={statusData.color} />
                  <Text style={[styles.historyStatus, { color: statusData.color }]}>{statusData.text}</Text>
                  <Text style={styles.historyDate}> • {item.date}</Text>
                </View>
              </View>
              <Text style={styles.historyAmount}>{item.amount}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ==========================================
// 4. TELA PRINCIPAL
// ==========================================
export default function TributosScreen() {
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
        
        <FinanceHeroCard summary={FINANCIAL_SUMMARY} />
        
        <QuickActionGrid />
        
        <TransactionHistory />

      </ScrollView>
    </View>
  );
}

// ==========================================
// 5. ESTILIZAÇÃO PROFISSIONAL
// ==========================================
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: SPACING,
    marginBottom: 32,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeading,
    letterSpacing: -0.5,
  },
  seeAllLink: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
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
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.textHeading,
    fontWeight: '800',
  },
  iconBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // HERO CARD (FINANÇAS)
  heroContainer: {
    paddingHorizontal: SPACING,
    marginBottom: 32,
    alignItems: 'center',
    position: 'relative',
  },
  heroCard: {
    width: '100%',
    borderRadius: 28,
    padding: 24,
    zIndex: 2,
    overflow: 'hidden',
    minHeight: 220,
    justifyContent: 'space-between',
  },
  cardPatternIcon: {
    position: 'absolute',
    right: -20,
    top: 20,
    opacity: 0.1,
    transform: [{ rotate: '-15deg' }]
  },
  cardGlow: {
    position: 'absolute',
    bottom: -20,
    width: '85%',
    height: 40,
    backgroundColor: COLORS.primary,
    opacity: 0.25,
    borderRadius: 30,
    zIndex: 1,
    transform: [{ scaleX: 0.9 }],
    // blurRadius removido pois não é suportado em ViewStyle
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  currencySymbol: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 24,
    fontWeight: '600',
    marginRight: 4,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  mainTaxText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 24,
  },
  payButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  payButtonText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 16,
  },

  // QUICK ACTION GRID
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridItem: {
    width: (width - (SPACING * 2) - 16) / 2,
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textHeading,
    textAlign: 'center',
  },

  // TRANSACTION HISTORY
  historyList: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  typeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  typeText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textHeading,
    marginBottom: 4,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  historyDate: {
    fontSize: 12,
    color: COLORS.textBody,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textHeading,
  },
});