import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// ==========================================
// 1. CONFIGURAÇÕES E CORES
// ==========================================
const BRAND_COLORS = {
  red: '#E53935',    
  green: '#7CB342',  
  orange: '#FB8C00', 
  purple: '#8E24AA', 
  bgLight: '#FAFAFA',
  textDark: '#1C1C1E',
  textGray: '#8E8E93',
  white: '#FFFFFF',
  black: '#000000',
};

// ==========================================
// 2. COMPONENTES INTERNOS
// ==========================================

// Componente Novo: Logo em Texto Estilizado
const LogoPrefeitura = () => (
  <View style={styles.logoWrapper}>
    <Text style={styles.logoPrefeituraText}>PREFEITURA DE</Text>
    <View style={styles.logoCamacariRow}>
      {/* Construindo C-A-M-A-Ç-A-R-I letra por letra com as cores da marca */}
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.red }]}>C</Text>
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.green }]}>A</Text>
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.orange }]}>M</Text>
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.green }]}>A</Text>
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.orange }]}>Ç</Text>
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.green }]}>A</Text>
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.purple }]}>R</Text>
      <Text style={[styles.logoLetter, { color: BRAND_COLORS.purple }]}>I</Text>
    </View>
  </View>
);

const ServiceCard = ({ title, icon, color, onPress }: { title: string; icon: keyof typeof Ionicons.glyphMap; color: string; onPress: () => void }) => (
  <TouchableOpacity 
    style={[styles.card, { borderLeftColor: color, borderLeftWidth: 4 }]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.cardText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" style={{ marginLeft: 'auto' }}/>
  </TouchableOpacity>
);

const SectionHeader = ({ title, actionText }: { title: string; actionText?: string | null }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionText && (
      <TouchableOpacity>
        <Text style={styles.linkText}>{actionText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ==========================================
// 3. TELA PRINCIPAL (HOME)
// ==========================================
export default function HomeScreen() {
  const router = useRouter();

  const services = [
    { id: 1, title: 'Saúde & Vacinas', icon: 'medkit', color: BRAND_COLORS.red },
    { id: 2, title: 'Educação', icon: 'school', color: BRAND_COLORS.green },
    { id: 3, title: 'IPTU e Tributos', icon: 'document-text', color: BRAND_COLORS.orange },
    { id: 4, title: 'Transporte', icon: 'bus', color: BRAND_COLORS.purple },
    { id: 5, title: 'Obras Públicas', icon: 'construct', color: BRAND_COLORS.red },
    { id: 6, title: 'Assistência Social', icon: 'people', color: BRAND_COLORS.green },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* Cabeçalho Superior */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Cidadão</Text>
            <Text style={styles.subtitle}>Bem-vindo</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          
          {/* Logo em Texto (Substituindo a Imagem) */}
          <View style={styles.bannerContainer}>
             <LogoPrefeitura />
          </View>

          {/* Barra de Busca */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={BRAND_COLORS.textGray} style={styles.searchIcon} />
            <TextInput
              placeholder="O que você precisa agendar?"
              placeholderTextColor={BRAND_COLORS.textGray}
              style={styles.searchInput}
            />
          </View>

          {/* Acesso Rápido */}
          <SectionHeader title="Acesso Rápido" actionText={null} />
          <View style={styles.quickAccessContainer}>
            <TouchableOpacity style={[styles.quickButton, { backgroundColor: BRAND_COLORS.purple }]} onPress={() => router.push('/agendamento/agendar')}>
              <Ionicons name="calendar" size={24} color="#FFF" />
              <Text style={styles.quickButtonText}>Agendar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickButton, { backgroundColor: BRAND_COLORS.orange }]}>
              <Ionicons name="newspaper" size={24} color="#FFF" />
              <Text style={styles.quickButtonText}>Notícias</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.quickButton, { backgroundColor: BRAND_COLORS.green }]} onPress={() => router.push('/turismo/turismo')}>
              <Ionicons name="map" size={24} color="#FFF" />
              <Text style={styles.quickButtonText}>Turismo</Text>
            </TouchableOpacity>
          </View>

          {/* Grid de Serviços */}
          <SectionHeader title="Serviços Disponíveis" actionText="Ver todos" />
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                icon={service.icon as keyof typeof Ionicons.glyphMap}
                color={service.color}
                onPress={() => {
                  if (service.title === 'Transporte') {
                    router.push('/transporte/transporte');
                  } else {
                    console.log(`Clicou em ${service.title}`)
                  }
                }} 
              />
            ))}
          </View>

          {/* Banner Informativo */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={30} color="#FFF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Campanha de Vacinação</Text>
              <Text style={styles.infoDesc}>
                Confira as datas e locais para vacinação contra a gripe.
              </Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ==========================================
// 4. ESTILIZAÇÃO
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.bgLight,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 14,
    color: BRAND_COLORS.textGray,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  profileButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // ESTILOS DA LOGO (Novo)
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoPrefeituraText: {
    fontSize: 14,
    color: BRAND_COLORS.black,
    fontWeight: '600',
    letterSpacing: 4, // Espaçamento entre letras para ficar elegante
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  logoCamacariRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoLetter: {
    fontSize: 34, // Tamanho grande para destaque
    fontWeight: '900', // Negrito extra forte
    letterSpacing: 1,
    // Sombra sutil para dar profundidade nas letras
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: BRAND_COLORS.textDark,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.textDark,
  },
  linkText: {
    color: BRAND_COLORS.purple,
    fontSize: 14,
    fontWeight: '600',
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  quickButton: {
    flex: 1,
    height: 90,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  quickButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  servicesGrid: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    padding: 16,
    borderRadius: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: BRAND_COLORS.textDark,
  },
  infoCard: {
    marginHorizontal: 24,
    backgroundColor: '#007AFF', 
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  infoDesc: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 18,
  },
});