import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  TextInput,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==========================================
// 1. PALETA DE CORES (IDENTIDADE CAMAÇARI)
// ==========================================
const COLORS = {
  primary: '#8E24AA',   // Roxo (Cor tema desta tela)
  red: '#E53935',    
  green: '#7CB342',  
  orange: '#FB8C00', 
  bg: '#F8F9FA',
  white: '#FFFFFF',
  textMain: '#111827',
  textSec: '#6B7280',
  border: '#E5E7EB',
};

// ==========================================
// 2. DADOS MOCKADOS (SERVIÇOS)
// ==========================================
const SERVICES = [
  {
    id: '1',
    category: 'Saúde',
    title: 'Clínico Geral',
    desc: 'Consultas de rotina e avaliações médicas.',
    icon: 'medkit',
    color: COLORS.red,
  },
  {
    id: '2',
    category: 'Saúde',
    title: 'Odontologia',
    desc: 'Limpeza, extração e cuidados bucais.',
    icon: 'happy', // ou 'body' se preferir
    color: COLORS.red,
  },
  {
    id: '3',
    category: 'Documentos',
    title: 'Emissão de RG (1ª e 2ª via)',
    desc: 'Agendamento para SAC municipal.',
    icon: 'card',
    color: COLORS.green,
  },
  {
    id: '4',
    category: 'Tributos',
    title: 'Atendimento IPTU',
    desc: 'Regularização e parcelamento de dívidas.',
    icon: 'receipt',
    color: COLORS.orange,
  },
  {
    id: '5',
    category: 'Social',
    title: 'Cadastro Único (CadÚnico)',
    desc: 'Atualização e novos cadastros para benefícios.',
    icon: 'people',
    color: COLORS.primary,
  },
  {
    id: '6',
    category: 'Trânsito',
    title: 'Recurso de Multas',
    desc: 'Abertura de processo na STT.',
    icon: 'car',
    color: COLORS.green,
  },
];

// ==========================================
// 3. COMPONENTE DE ITEM DE SERVIÇO
// ==========================================
interface ServiceItemProps {
  item: typeof SERVICES[0];
}

const ServiceItem = ({ item }: ServiceItemProps) => (
  <TouchableOpacity style={styles.serviceCard} activeOpacity={0.7}>
    <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
      <Ionicons name={item.icon as any} size={28} color={item.color} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardCategory}>{item.category}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
    </View>
    <View style={styles.arrowBox}>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </View>
  </TouchableOpacity>
);

// ==========================================
// 4. TELA DE AGENDAMENTO
// ==========================================
export default function AgendarScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');

  // Filtro de busca simples
  const filteredServices = SERVICES.filter(service => 
    service.title.toLowerCase().includes(searchText.toLowerCase()) ||
    service.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendamento Online</Text>
        <View style={{ width: 40 }} /> {/* Espaçador para centralizar */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Qual serviço você{'\n'}precisa <Text style={{ color: COLORS.primary }}>agendar hoje?</Text></Text>
          <Text style={styles.heroSubtitle}>Selecione uma opção abaixo para verificar a disponibilidade de datas.</Text>
        </View>

        {/* BARRA DE BUSCA */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSec} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar serviço (ex: RG, Médico...)"
            placeholderTextColor={COLORS.textSec}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* LISTA DE SERVIÇOS */}
        <View style={styles.listContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
            <Text style={styles.resultsCount}>{filteredServices.length} encontrados</Text>
          </View>

          {filteredServices.map((service) => (
            <ServiceItem key={service.id} item={service} />
          ))}

          {filteredServices.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color="#E5E7EB" />
              <Text style={styles.emptyText}>Nenhum serviço encontrado.</Text>
            </View>
          )}
        </View>

      </ScrollView>

      {/* BOTÃO FLUTUANTE DE AJUDA (UX EXTRA) */}
      <TouchableOpacity style={[styles.fab, { bottom: insets.bottom + 20 }]}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFF" />
        <Text style={styles.fabText}>Ajuda</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollContent: {
    paddingBottom: 100, // Espaço para o FAB
  },

  // HERO
  heroSection: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textMain,
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.textSec,
    marginTop: 8,
    lineHeight: 22,
  },

  // SEARCH
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
    // Sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textMain,
    height: '100%',
  },

  // LISTA
  listContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  resultsCount: {
    fontSize: 12,
    color: COLORS.textSec,
    fontWeight: '500',
  },

  // SERVICE CARD
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    // Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardCategory: {
    fontSize: 11,
    color: COLORS.textSec,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.textSec,
    lineHeight: 18,
  },
  arrowBox: {
    marginLeft: 8,
  },

  // EMPTY STATE
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 12,
  },
  emptyText: {
    color: COLORS.textSec,
    fontSize: 16,
  },

  // FAB (Botão Flutuante)
  fab: {
    position: 'absolute',
    right: 24,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  fabText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});