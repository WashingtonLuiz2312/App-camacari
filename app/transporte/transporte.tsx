import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==========================================
// 1. PALETA DE CORES (Transporte = Roxo)
// ==========================================
const COLORS = {
  primary: '#8E24AA',   // Roxo (Tema Transporte)
  green: '#7CB342',     
  orange: '#FB8C00', 
  red: '#E53935',
  bg: '#F8F9FA',
  cardBg: '#FFFFFF',
  textMain: '#111827',
  textSec: '#6B7280',
  border: '#E5E7EB',
  accentLight: '#F3E5F5', // Roxo bem clarinho para fundos
};

// ==========================================
// 2. DADOS DAS LINHAS (Seus dados inseridos)
// ==========================================
interface Schedule {
  loc: string;
  times: string;
}

interface BusLine {
  id: string;
  code: string;
  name: string;
  type: string;
  route: string;
  schedules: Schedule[];
}

const BUS_LINES: BusLine[] = [
  {
    id: '0101',
    code: '0101',
    name: 'TIR x Bairro Novo/Parque das Palmeiras',
    type: 'Circular',
    route: 'Centro, Praça dos 46, Correios, Prefeitura, Av. Jorge Amado, HGC, Bairro Novo, Limpec, Parque Palmeiras.',
    schedules: [
      { loc: 'Saída Rodoviária', times: '5h45, 6h30, 7h20, 8h25, 9h40, 11h, 12h30, 13h30, 15h, 16h30, 18h, 19h25' },
      { loc: 'Saída Bairro Novo', times: 'CIRCULAR (previsão de 20 a 25 min da Rodoviária)' }
    ]
  },
  {
    id: '0104',
    code: '0104',
    name: 'Terminal da Feira/TISO x Jardim Limoeiro',
    type: 'Circular',
    route: 'Centro, Praça dos 46, Correios, Prefeitura, Avenida Jorge Amado, HGC, Assembleia, Estrada 25, retorno Praça Sol Nascente, Residencial Havana/Santa Clara, Pardais I, retorno via Assembleia.',
    schedules: [
      { loc: 'Saída Terminal Feira', times: '5h20, 6h20, 7h20, 8h30, 9h45, 11h, 12h10, 13h20, 14h30, 15h50, 17h, 18h, 19h' },
      { loc: 'Saída Assembleia', times: 'CIRCULAR (previsão de 20 a 25 min do Term. Feira)' }
    ]
  },
  {
    id: '0203',
    code: '0203',
    name: 'Algarobas/Lama Preta x Novo Horizonte/TIR',
    type: 'Circular',
    route: 'Santa Maria, Gleba H, Hospital Santa Helena/Policlínica, Radial A, Centro, Casa do Trabalho, Avenida Luís Eduardo, Nova Vitória, Novo Horizonte, Travessa Leste, Avenida Jorge Amado, Prefeitura.',
    schedules: [
      { loc: 'Saída Algarobas', times: '5h, 5h40, 6h20, 7h, 7h40, 8h20, 9h30, 11h, 12h20, 13h40, 15h, 15h40, 16h20, 17h, 17h40, 18h20' },
      { loc: 'Saída Rodoviária', times: 'CIRCULAR (previsão de 25 a 30 min do Algarobas)' }
    ]
  },
  {
    id: '0203.1',
    code: '0203.1',
    name: 'Burissatuba x Verde Ville/Boulevard',
    type: 'Circular',
    route: 'Sentido Boulevard: Gleba H, Casinhas, Burissatuba, Phoc II, Praça dos 46, Eixo Urbano, Centro... Sentido Algarobas: Atacadão, Assaí, Av. Industrial...',
    schedules: [
      { loc: 'Saída Burissatuba', times: '5h20, 6h35, 7h50, 9h, 10h25, 11h45, 13h, 14h20, 16h, 17h20, 18h30' },
      { loc: 'Saída Boulevard', times: 'CIRCULAR (previsão de 47 a 54 min do Algarobas)' }
    ]
  },
  {
    id: '0210',
    code: '0210',
    name: 'Parque Verde II/Gleba E/Phoc x Jd. Limoeiro',
    type: 'Circular',
    route: 'Sentido Limoeiro: Gleba E, Phoc I/II/III, Praça 46... Sentido Pq Verde: Micos, Av. Jorge Amado...',
    schedules: [
      { loc: 'Saída Parque Verde', times: '5h, 5h40, 6h20, 7h, 7h50, 8h20... (até 18h40)' },
      { loc: 'Saída Jardim Limoeiro', times: '5h; demais horários CIRCULAR' }
    ]
  },
  {
    id: '0211',
    code: '0211',
    name: 'Jardim Limoeiro x Pq Verde II via Micos',
    type: 'Circular',
    route: 'Sentido Pq Verde: Micos, Av. Jorge Amado... Sentido Limoeiro: Gleba E, Gleba C, Coco Gelado...',
    schedules: [
      { loc: 'Saída Parque Verde II', times: '5h20, 6h, 6h40, 7h25... (até 18h40)' },
      { loc: 'Saída Jardim Limoeiro', times: '5h25; demais horários CIRCULAR' }
    ]
  },
];

// ==========================================
// 3. COMPONENTE: CARTÃO DE ÔNIBUS
// ==========================================
const BusLineCard = ({ item }: { item: BusLine }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      {/* Header do Card (Sempre visível) */}
      <TouchableOpacity 
        style={styles.cardHeader} 
        activeOpacity={0.7}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.iconBox}>
          <Ionicons name="bus" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{item.code}</Text>
          </View>
          <Text style={styles.lineName} numberOfLines={expanded ? 0 : 1}>
            {item.name}
          </Text>
        </View>
        <Ionicons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={COLORS.textSec} 
        />
      </TouchableOpacity>

      {/* Detalhes (Visível apenas se expandido) */}
      {expanded && (
        <View style={styles.cardDetails}>
          <View style={styles.divider} />
          
          {/* Rota */}
          <View style={styles.detailSection}>
            <View style={styles.detailTitleRow}>
              <Ionicons name="map-outline" size={16} color={COLORS.textMain} />
              <Text style={styles.detailTitle}>Itinerário</Text>
            </View>
            <Text style={styles.detailText}>{item.route}</Text>
          </View>

          {/* Horários */}
          <View style={styles.detailSection}>
            <View style={styles.detailTitleRow}>
              <Ionicons name="time-outline" size={16} color={COLORS.textMain} />
              <Text style={styles.detailTitle}>Horários de Saída</Text>
            </View>
            
            {item.schedules.map((sch, index) => (
              <View key={index} style={styles.scheduleRow}>
                <Text style={styles.scheduleLoc}>• {sch.loc}:</Text>
                <Text style={styles.scheduleTime}>{sch.times}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

// ==========================================
// 4. TELA PRINCIPAL
// ==========================================
export default function TransporteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filteredBus = BUS_LINES.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.code.includes(search)
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transporte Público</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="map-outline" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Consulte horários e{'\n'}
            <Text style={{ color: COLORS.primary }}>rotas em tempo real</Text>
          </Text>
        </View>

        {/* BUSCA */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={COLORS.textSec} style={{ marginRight: 10 }} />
          <TextInput 
            style={styles.input}
            placeholder="Buscar linha (ex: 0101 ou Centro)"
            placeholderTextColor={COLORS.textSec}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* LISTA DE ÔNIBUS */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Linhas Urbanas ({filteredBus.length})</Text>
          
          {filteredBus.map((bus) => (
            <BusLineCard key={bus.id} item={bus} />
          ))}

          {filteredBus.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="bus-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>Nenhuma linha encontrada.</Text>
            </View>
          )}
        </View>

      </ScrollView>
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
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // HERO
  hero: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textMain,
    lineHeight: 32,
  },

  // BUSCA
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textMain,
  },

  // LISTA
  listContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
    gap: 10,
  },
  emptyText: {
    color: COLORS.textSec,
    fontSize: 14,
  },

  // CARD DE ÔNIBUS
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  codeBadge: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  codeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  lineName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMain,
    lineHeight: 20,
  },

  // DETALHES DO CARD
  cardDetails: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#FAFAFA', // Fundo levemente cinza para os detalhes
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSec,
    lineHeight: 20,
  },
  scheduleRow: {
    marginTop: 6,
  },
  scheduleLoc: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 13,
    color: COLORS.textSec,
    lineHeight: 18,
  },
});