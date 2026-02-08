import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  StatusBar, 
  Dimensions,
  Linking,
  FlatList,
  Platform,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { 
  ArrowLeft, 
  MapPin, 
  Search, 
  Shield, 
  Heart, 
  Users, 
  Building2, 
  Navigation, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Siren, 
  ShieldAlert,
  X
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- DESIGN TOKENS ---
const COLORS = {
  primary: '#0f172a',   
  secondary: '#334155', 
  muted: '#64748b',     
  border: '#e2e8f0',    
  bg: '#f8fafc',        
  white: '#ffffff',
  
  rose: { main: '#e11d48', light: '#ffe4e6', bg: '#fff1f2' },
  violet: { main: '#7c3aed', light: '#ede9fe', bg: '#f5f3ff' },
  emerald: { main: '#059669', light: '#d1fae5', bg: '#ecfdf5' },
  blue: { main: '#2563eb', light: '#dbeafe', bg: '#eff6ff' },
  pink: { main: '#db2777', light: '#fce7f3', bg: '#fdf2f8' },
};

// --- DADOS ---
const servicesData = [
  {
    id: 1,
    name: "Delegacia da Mulher (DDM)",
    category: "Segurança",
    address: "Rua das Flores, 123 - Centro",
    distance: "1.2 km",
    phone: "190",
    hours: "Aberto 24h",
    isOpen: true,
    verified: true,
    icon: Shield,
    theme: "rose"
  },
  {
    id: 2,
    name: "Hospital da Mulher",
    category: "Saúde",
    address: "Av. Principal, 456 - Jd. América",
    distance: "2.5 km",
    phone: "(11) 3555-6666",
    hours: "Aberto 24h",
    isOpen: true,
    verified: true,
    icon: Heart,
    theme: "pink"
  },
  {
    id: 3,
    name: "ONG Mães Unidas",
    category: "Comunidade",
    address: "Rua da Esperança, 789",
    distance: "3.1 km",
    phone: "(11) 3777-8888",
    hours: "09:00 - 18:00",
    isOpen: false,
    verified: true,
    icon: Users,
    theme: "violet"
  },
  {
    id: 4,
    name: "Defensoria Pública",
    category: "Direito",
    address: "Fórum Central - Sala 10",
    distance: "4.2 km",
    phone: "129",
    hours: "08:00 - 17:00",
    isOpen: true,
    verified: true,
    icon: Building2,
    theme: "blue"
  }
];

const categories = ["Todos", "Segurança", "Saúde", "Direito", "Comunidade"];

const getThemeStyles = (theme: string) => {
  const map = {
    rose: COLORS.rose,
    pink: COLORS.pink,
    violet: COLORS.violet,
    blue: COLORS.blue
  };
  return map[theme as keyof typeof map] || COLORS.rose;
};

// --- COMPONENTES ---

const ServiceCard = ({ data, onPressRoute, onPressCall }: any) => {
  const theme = getThemeStyles(data.theme);
  const Icon = data.icon;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, { backgroundColor: theme.light }]}>
          <Icon size={24} color={theme.main} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.badgeRow}>
            <View style={[styles.catBadge, { backgroundColor: theme.bg }]}>
              <Text style={[styles.catText, { color: theme.main }]}>{data.category}</Text>
            </View>
            {data.verified && (
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={10} color={COLORS.emerald.main} style={{ marginRight: 3 }} />
                <Text style={styles.verifiedText}>Verificado</Text>
              </View>
            )}
            <View style={[styles.statusBadge, { backgroundColor: data.isOpen ? COLORS.emerald.bg : COLORS.bg }]}>
              <Text style={[styles.statusText, { color: data.isOpen ? COLORS.emerald.main : COLORS.muted }]}>
                {data.isOpen ? 'Aberto' : 'Fechado'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.cardTitle}>{data.name}</Text>
          <Text style={styles.cardAddress} numberOfLines={1}>{data.address}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MapPin size={13} color={COLORS.muted} />
              <Text style={styles.metaText}>{data.distance}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Clock size={13} color={COLORS.muted} />
              <Text style={styles.metaText}>{data.hours}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.btnRoute} 
          onPress={() => onPressRoute(data.address)}
          activeOpacity={0.8}
        >
          <Navigation size={16} color={COLORS.white} style={{marginRight: 6}} />
          <Text style={styles.btnRouteText}>Rota</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnCall} 
          onPress={() => onPressCall(data.phone)}
          activeOpacity={0.8}
        >
          <Phone size={16} color={COLORS.secondary} style={{marginRight: 6}} />
          <Text style={styles.btnCallText}>Ligar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const EmergencyBanner = ({ onCall }: { onCall: (n: string) => void }) => (
  <View style={styles.emergencyContainer}>
    <LinearGradient
      colors={[COLORS.rose.main, '#be123c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.emergencyGradient}
    >
      <View style={styles.emergencyHeader}>
        <View style={styles.emergencyTitleRow}>
          <View style={styles.pulseIcon}>
            <Siren size={18} color={COLORS.white} />
          </View>
          <Text style={styles.emergencyTitle}>Emergência</Text>
        </View>
        <View style={styles.emergencyBadge}>
          <Text style={styles.emergencyBadgeText}>24h</Text>
        </View>
      </View>
      
      <View style={styles.emergencyActions}>
        <TouchableOpacity onPress={() => onCall('190')} style={styles.btnEmergencyPrimary}>
          <Text style={styles.btnEmergencyTextPrimary}>Ligar 190</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onCall('180')} style={styles.btnEmergencySecondary}>
          <Text style={styles.btnEmergencyTextSecondary}>Ligar 180</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
);

export default function ServicesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredData = useMemo(() => {
    const list = servicesData.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeFilter === "Todos" || item.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
    return list;
  }, [searchTerm, activeFilter]);

  const handleCall = (number: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${number}`);
  };

  const handleRoute = (address: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
    });
    if (url) Linking.openURL(url);
  };

  const clearSearch = () => {
    setSearchTerm("");
    Keyboard.dismiss();
  };

  // --- HEADER UNIFICADO (Hero + Busca + Filtros) ---
  // Isso resolve o problema de "ficar descendo junto". Agora é um bloco só.
  const renderCombinedHeader = () => (
    <View style={styles.headerWrapper}>
      {/* 1. Hero Background */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[COLORS.primary, '#1e293b']}
          style={[styles.headerBg, { paddingTop: insets.top + 10 }]}
        >
          <View style={styles.blob1} />
          <View style={styles.blob2} />

          <View style={styles.headerContent}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <ArrowLeft size={20} color={COLORS.white} />
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.geoBadge}>
              <MapPin size={12} color={COLORS.rose.main} />
              <Text style={styles.geoText}>Geolocalização Ativa</Text>
            </View>

            <Text style={styles.title}>
              Rede de Apoio{'\n'}
              <Text style={styles.subtitle}>Verificada & Segura</Text>
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* 2. Barra de Busca e Filtros (Sobreposta) */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color={COLORS.muted} />
            <TextInput 
              placeholder="Buscar delegacia, hospital..." 
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {searchTerm.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <X size={18} color={COLORS.muted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                Haptics.selectionAsync();
                setActiveFilter(item);
              }}
              style={[
                styles.filterChip,
                activeFilter === item ? styles.filterChipActive : styles.filterChipInactive
              ]}
            >
              <Text style={[
                styles.filterText,
                activeFilter === item ? styles.filterTextActive : styles.filterTextInactive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 3. Banner de Emergência */}
      <EmergencyBanner onCall={handleCall} />
      
      {/* 4. Título da Lista */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Resultados</Text>
        <Text style={styles.resultsCount}>({filteredData.length})</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderCombinedHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Search size={40} color={COLORS.border} />
            <Text style={styles.emptyTitle}>Nenhum local encontrado</Text>
            <Text style={styles.emptyText}>Tente buscar por outro termo.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço extra no final
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <ServiceCard 
              data={item} 
              onPressRoute={handleRoute} 
              onPressCall={handleCall} 
            />
          </View>
        )}
      />
      
      {/* Botão Flutuante de Dica */}
      <View style={[styles.tipCard, { bottom: insets.bottom + 20 }]}>
        <ShieldAlert size={20} color={COLORS.emerald.main} />
        <Text style={styles.tipText}>
          Dica: Em caso de perseguição, entre em um comércio e ligue 190.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  
  // --- HEADER WRAPPER (Agrupa tudo que fica no topo) ---
  headerWrapper: {
    marginBottom: 10,
  },

  // HERO BACKGROUND
  headerContainer: {
    marginBottom: -30, // Faz a barra de busca subir sobre o azul
    zIndex: 0,
  },
  headerBg: {
    paddingBottom: 60, // Espaço extra para a sobreposição
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    top: -50, right: -50,
    width: 250, height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.violet.main,
    opacity: 0.2,
  },
  blob2: {
    position: 'absolute',
    bottom: -20, left: -20,
    width: 200, height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.rose.main,
    opacity: 0.15,
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  backText: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: '600',
  },
  geoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(225, 29, 72, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(225, 29, 72, 0.3)',
  },
  geoText: {
    color: '#fda4af',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 34,
  },
  subtitle: {
    color: '#c084fc', 
  },

  // --- SEARCH & FILTERS SECTION ---
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 10, 
  },
  searchBox: {
    marginBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  filterList: {
    gap: 8,
    paddingBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: COLORS.violet.main,
    borderColor: COLORS.violet.main,
  },
  filterChipInactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  filterTextInactive: {
    color: COLORS.muted,
  },

  // --- EMERGENCY BANNER ---
  emergencyContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  emergencyGradient: {
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.rose.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 6,
    borderRadius: 20,
  },
  emergencyTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emergencyBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  emergencyBadgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  emergencyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  btnEmergencyPrimary: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnEmergencySecondary: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  btnEmergencyTextPrimary: {
    color: COLORS.rose.main,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnEmergencyTextSecondary: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- RESULTS TITLE ---
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  resultsCount: {
    fontSize: 16,
    color: COLORS.muted,
  },

  // --- SERVICE CARD ---
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  catText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.emerald.bg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.emerald.light,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.emerald.main,
  },
  statusBadge: {
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: COLORS.border,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  btnRoute: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 12,
  },
  btnRouteText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnCall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 44,
    borderRadius: 12,
  },
  btnCallText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 14,
  },

  // --- EMPTY & TIPS ---
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 16,
  },
  emptyText: {
    color: COLORS.muted,
    marginTop: 4,
  },
  tipCard: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.secondary,
    lineHeight: 18,
  },
});