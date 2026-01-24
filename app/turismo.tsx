import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Platform 
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Paleta de cores oficial
const THEME = {
  primary: '#7CB342', // Verde
  bg: '#FAFAFA',
  white: '#FFFFFF',
  textTitle: '#1C1C1E',
  textBody: '#666666',
};

// Dados fictícios das praias (Substitua as URLs por fotos reais depois)
const beaches = [
  {
    id: 1,
    name: 'Guarajuba',
    desc: 'Famosa por suas águas cristalinas e piscinas naturais. Possui excelente infraestrutura.',
    image: require('@/assets/images/guarajuba.png'), 
    distance: '42 km do centro'
  },
  {
    id: 2,
    name: 'Arembepe',
    desc: 'Conhecida pela aldeia hippie. Mescla sofisticação com rusticidade e piscinas tranquilas.',
    image: require('@/assets/images/arembepe.png'),
    distance: '30 km do centro'
  },
  {
    id: 3,
    name: 'Itacimirim',
    desc: 'Perfeita para quem busca sossego. Ondas para surfistas e encontro do rio com o mar.',
    image: require('@/assets/images/itacimirim.jpg'),
    distance: '48 km do centro'
  },
  {
    id: 4,
    name: 'Jauá',
    desc: 'Praia com dunas brancas e vasto coqueiral. O "piscinão" natural é a principal atração.',
    image: require('@/assets/images/jaua.jpg'),
    distance: '25 km do centro'
  },
];

export default function TurismoScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* Header com Botão Voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Turismo & Praias</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.introContainer}>
            <Text style={styles.introTitle}>Descubra Camaçari</Text>
            <Text style={styles.introText}>
              Nossa costa possui 42km de praias paradisíacas. Escolha seu destino.
            </Text>
          </View>

          <View style={styles.listContainer}>
            {beaches.map((beach) => (
              <View key={beach.id} style={styles.card}>
                <Image
                  source={beach.image}
                  style={styles.cardImage}
                  contentFit="cover"
                  transition={500}
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardTitle}>{beach.name}</Text>
                    <View style={styles.distanceBadge}>
                      <Ionicons name="location-outline" size={12} color={THEME.primary} />
                      <Text style={styles.distanceText}>{beach.distance}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardDesc}>{beach.desc}</Text>
                  <TouchableOpacity style={styles.actionButton} onPress={() => alert('Abrindo mapa...')}>
                    <Text style={styles.actionButtonText}>Ver no mapa</Text>
                    <Ionicons name="map-outline" size={16} color={THEME.white} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E5E5EA', marginTop: Platform.OS === 'android' ? 30 : 0 },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: THEME.textTitle },
  scrollContent: { paddingBottom: 40 },
  introContainer: { padding: 24 },
  introTitle: { fontSize: 28, fontWeight: 'bold', color: THEME.textTitle, marginBottom: 8 },
  introText: { fontSize: 16, color: THEME.textBody, lineHeight: 22 },
  listContainer: { paddingHorizontal: 20, gap: 24 },
  card: { backgroundColor: THEME.white, borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 4 },
  cardImage: { width: '100%', height: 200 },
  cardContent: { padding: 20 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: THEME.textTitle },
  distanceBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F8E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  distanceText: { fontSize: 12, color: THEME.primary, fontWeight: '600' },
  cardDesc: { fontSize: 14, color: THEME.textBody, lineHeight: 20, marginBottom: 16 },
  actionButton: { backgroundColor: THEME.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 12, gap: 8 },
  actionButtonText: { color: THEME.white, fontWeight: 'bold', fontSize: 14 },
});