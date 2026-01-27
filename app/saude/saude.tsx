import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions,
  Alert,
  Modal,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// ==========================================
// 1. DESIGN SYSTEM (PREMIUM HEALTH THEME)
// ==========================================
const { width } = Dimensions.get('window');
const SPACING = 24;

const COLORS = {
  // Primária: Vermelho Camaçari (Sofisticado)
  primary: '#E53935',
  primaryGradient: ['#E53935', '#FF5252'] as const, 
  
  // Neutros
  bg: '#F2F4F7',        // Cinza azulado (frio e limpo)
  surface: '#FFFFFF',   // Branco puro
  textHeading: '#111827',
  textBody: '#6B7280',
  border: '#E5E7EB',

  // Funcionais
  success: '#10B981', // Verde Saúde
  info: '#3B82F6',    // Azul Clínico
  warning: '#F59E0B', // Laranja Alerta
  
  // Empty State
  dashedBorder: '#D1D5DB',
};

// ==========================================
// 2. COMPONENTES DE UI (ATÓMICOS)
// ==========================================

// Header Limpo e Moderno
const Header = ({ onBack, userName }: { onBack: () => void, userName: string }) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <TouchableOpacity 
        onPress={onBack} 
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.textHeading} />
      </TouchableOpacity>
      <View>
        <Text style={styles.greeting}>Olá, <Text style={styles.userName}>{userName}</Text></Text>
        <Text style={styles.location}>Camaçari - BA</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.notificationBtn}>
      <Ionicons name="notifications-outline" size={24} color={COLORS.textHeading} />
      <View style={styles.badge} />
    </TouchableOpacity>
  </View>
);

// Cartão Vazio (Estado "Adicionar")
const EmptyCardState = ({ onAdd }: { onAdd: () => void }) => (
  <TouchableOpacity style={styles.emptyCardContainer} onPress={onAdd} activeOpacity={0.7}>
    <View style={styles.dashedBorder}>
      <View style={styles.addIconCircle}>
        <Ionicons name="add" size={32} color={COLORS.primary} />
      </View>
      <Text style={styles.addCardTitle}>Adicionar Cartão SUS</Text>
      <Text style={styles.addCardSubtitle}>
        Toque para cadastrar seu cartão digital e ter acesso rápido aos serviços.
      </Text>
    </View>
  </TouchableOpacity>
);

// Cartão Preenchido (Estado "Visualizar")
const HealthCard = ({ number }: { number: string }) => (
  <View style={styles.cardWrapper}>
    <LinearGradient
      colors={COLORS.primaryGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.realCard}
    >
      {/* Background Pattern Sutil */}
      <Ionicons name="medkit" size={180} color="rgba(255,255,255,0.06)" style={styles.cardBgIcon} />
      
      <View style={styles.cardHeader}>
        <View style={styles.susTag}>
          <Text style={styles.susText}>SUS</Text>
          <Text style={styles.digitalText}>Digital</Text>
        </View>
        <Ionicons name="qr-code" size={24} color="#FFF" />
      </View>

      <View style={styles.cardChipRow}>
        <View style={styles.chip} />
        <Ionicons name="wifi" size={20} color="rgba(255,255,255,0.6)" style={{ transform: [{ rotate: '90deg' }] }} />
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>CNS</Text>
          <Text style={styles.cardNumber}>{number}</Text>
        </View>
      </View>
    </LinearGradient>
    {/* Sombra Glow para dar profundidade */}
    <View style={styles.cardGlow} />
  </View>
);

// Botão de Ação Rápida (Bento Grid Style)
const QuickAction = ({ title, subtitle, icon, color, onPress, fullWidth = false }: any) => (
  <TouchableOpacity 
    style={[styles.actionCard, fullWidth && styles.actionCardFull]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <View style={styles.actionContent}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle} numberOfLines={1}>{subtitle}</Text>
    </View>
    <View style={styles.arrowCircle}>
      <Ionicons name="chevron-forward" size={16} color={COLORS.textBody} />
    </View>
  </TouchableOpacity>
);

// ==========================================
// 3. TELA PRINCIPAL
// ==========================================
export default function SaudeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // ESTADO: Controla se o usuário tem cartão ou não
  const [hasCard, setHasCard] = useState(false); 

  const handleAddCard = () => {
    // Simulação de cadastro
    Alert.alert("Sucesso", "Cartão adicionado com sucesso!", [
      { text: "OK", onPress: () => setHasCard(true) }
    ]);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 10 }]}
        showsVerticalScrollIndicator={false}
      >
        <Header onBack={() => router.back()} userName="Cidadão" />

        {/* ÁREA DO CARTÃO (DINÂMICA) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Meu Documento</Text>
          {hasCard ? (
            <TouchableOpacity onLongPress={() => setHasCard(false)}> 
               {/* Dica: Long press para remover e testar o botão de novo */}
               <HealthCard number="8900 1020 3040 5000" />
            </TouchableOpacity>
          ) : (
            <EmptyCardState onAdd={handleAddCard} />
          )}
        </View>

        {/* GRID DE AÇÕES */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          
          <View style={styles.grid}>
            {/* Linha 1 */}
            <QuickAction 
              title="Agendar" 
              subtitle="Consulta ou Exame" 
              icon="calendar" 
              color={COLORS.primary} 
            />
            <QuickAction 
              title="Vacinas" 
              subtitle="Carteira Digital" 
              icon="shield-checkmark" 
              color={COLORS.success} 
            />
            
            {/* Linha 2 (Full Width) */}
            <QuickAction 
              title="Medicamentos" 
              subtitle="Verificar disponibilidade na farmácia popular" 
              icon="medkit" 
              color={COLORS.info} 
              fullWidth
            />
             <QuickAction 
              title="UPA 24h" 
              subtitle="Tempo de espera: 20 min" 
              icon="time" 
              color={COLORS.warning} 
              fullWidth
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

// ==========================================
// 4. ESTILIZAÇÃO PROFISSIONAL
// ==========================================
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionContainer: {
    paddingHorizontal: SPACING,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeading,
    marginBottom: 16,
    letterSpacing: -0.5,
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
    // Micro sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textBody,
  },
  userName: {
    color: COLORS.textHeading,
    fontWeight: '700',
  },
  location: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },

  // EMPTY STATE (ADICIONAR CARTÃO)
  emptyCardContainer: {
    width: '100%',
    height: 180,
    backgroundColor: 'rgba(229, 57, 53, 0.04)', // Tintura vermelha muito leve
    borderRadius: 24,
    overflow: 'hidden',
  },
  dashedBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FECACA', // Vermelho bem claro
    borderStyle: 'dashed',
    borderRadius: 24,
    margin: 2, // Para não cortar a borda
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  addCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textHeading,
    marginBottom: 4,
  },
  addCardSubtitle: {
    fontSize: 13,
    color: COLORS.textBody,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: '80%',
  },

  // REAL CARD (CARTÃO SUS)
  cardWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  realCard: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  cardGlow: {
    position: 'absolute',
    bottom: -15,
    width: '85%',
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    opacity: 0.3,
    zIndex: 1,
    transform: [{ scaleX: 0.9 }],
  },
  cardBgIcon: {
    position: 'absolute',
    right: -30,
    bottom: -30,
    opacity: 0.15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  susTag: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  susText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    fontStyle: 'italic',
  },
  digitalText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  cardChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chip: {
    width: 45,
    height: 34,
    backgroundColor: '#FCD34D', // Ouro
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    opacity: 0.9,
  },
  cardFooter: {
    marginTop: 'auto',
  },
  cardLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: '600',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Fonte monoespaçada para números
  },

  // GRID ACTIONS
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    width: (width - (SPACING * 2) - 16) / 2, // 2 colunas
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    // Sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  actionCardFull: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionContent: {
    flex: 1,
    marginLeft: 0, // Ajustado para flex row
  },
  // Ajuste específico para cards full width
  actionCardFull_Content: {
    marginLeft: 16,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textHeading,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: COLORS.textBody,
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
  },
});