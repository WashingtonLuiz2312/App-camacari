import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions,
  Platform,
  Linking, // Importação essencial para abrir apps externos
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ==========================================
// 1. PALETA DE CORES DA MARCA
// ==========================================
const COLORS = {
  primary: '#7CB342',    // Verde
  secondary: '#8E24AA',  // Roxo
  accent: '#FB8C00',     // Laranja
  danger: '#E53935',     // Vermelho
  background: '#F8F9FA', 
  surface: '#FFFFFF',
  textMain: '#1A1A1A',
  textSec: '#666666',
};

// ==========================================
// 2. DADOS (COM COORDENADAS REAIS)
// ==========================================
const beaches = [
  {
    id: 1,
    name: 'Jauá',
    tag: 'Lazer',
    desc: 'Dunas brancas e o famoso "piscinão" natural.',
    image: require('@/assets/images/jaua.jpg'),
    distance: '25 km',
    rating: 4.5,
    coords: { lat: -12.8492, lng: -38.2456 } // Coordenadas de Jauá
  },
  {
    id: 2,
    name: 'Arembepe',
    tag: 'Cultural',
    desc: 'Aldeia hippie famosa mundialmente e piscinas tranquilas.',
    image: require('@/assets/images/arembepe.png'),
    distance: '30 km',
    rating: 4.7,
    coords: { lat: -12.7589, lng: -38.1697 } // Coordenadas de Arembepe
  },
  {
    id: 3,
    name: 'Guarajuba',
    tag: 'Família',
    desc: 'Águas cristalinas e piscinas naturais. Infraestrutura completa.',
    image: require('@/assets/images/guarajuba.png'), 
    distance: '42 km',
    rating: 4.9,
    coords: { lat: -12.6515187, lng: -38.0697291 } // Coordenadas de Guarajuba
  },
  {
    id: 4,
    name: 'Itacimirim',
    tag: 'Surf & Natureza',
    desc: 'Ondas para surf e encontro do rio com o mar.',
    image: require('@/assets/images/itacimirim.jpg'),
    distance: '48 km',
    rating: 4.8,
    coords: { lat: -12.6074, lng: -38.0465 } // Coordenadas de Itacimirim
  },
];

const categories = ['Todas', 'Família', 'Surf', 'Agitadas', 'Calmas'];

export default function TurismoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('Todas');

  // ==========================================
  // FUNÇÃO DE NAVEGAÇÃO INTELIGENTE
  // ==========================================
  const openNavigation = (lat: number, lng: number, label: string) => {
    // Esquema para Apple Maps (iOS)
    const schemeIOS = `maps://?daddr=${lat},${lng}&dirflg=d&t=m`;
    // Esquema para Google Maps (Android)
    const schemeAndroid = `google.navigation:q=${lat},${lng}`;

    const url = Platform.select({
      ios: schemeIOS,
      android: schemeAndroid
    });

    if (url) {
      Linking.openURL(url).catch(() => {
        Alert.alert(
          'Erro ao abrir mapa', 
          'Não foi possível abrir o aplicativo de mapas.'
        );
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Explorar Camaçari</Text>
        
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HERO */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Descubra o <Text style={{ color: COLORS.primary }}>Paraíso</Text>{'\n'}
            na Costa de Camaçari
          </Text>
        </View>

        {/* CATEGORIAS */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryChip, 
                activeCategory === cat && { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary }
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[
                styles.categoryText, 
                activeCategory === cat && { color: '#FFF' }
              ]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LISTA DE CARDS */}
        <View style={styles.cardsContainer}>
          {beaches.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              activeOpacity={0.9} 
              style={styles.card}
              // AÇÃO DE CLIQUE NO CARD INTEIRO
              onPress={() => openNavigation(item.coords.lat, item.coords.lng, item.name)}
            >
              <View style={styles.imageWrapper}>
                <Image 
                  source={item.image} 
                  style={styles.cardImage} 
                  contentFit="cover"
                  transition={500}
                />
                
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFF" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>

                <TouchableOpacity style={styles.favoriteBtn}>
                  <Ionicons name="heart-outline" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                  </View>
                </View>
                
                <Text style={styles.cardDesc} numberOfLines={2}>
                  {item.desc}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={16} color={COLORS.primary} />
                    <Text style={styles.infoText}>{item.distance} do centro</Text>
                  </View>
                  
                  {/* BOTÃO ESPECÍFICO DE IR */}
                  <TouchableOpacity 
                    style={styles.exploreBtn}
                    onPress={() => openNavigation(item.coords.lat, item.coords.lng, item.name)}
                  >
                    <Text style={styles.exploreText}>Ir Agora</Text>
                    <Ionicons name="navigate-circle" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: COLORS.background,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  heroSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textMain,
    lineHeight: 36,
  },
  categoriesScroll: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  categoryText: {
    fontWeight: '600',
    color: COLORS.textSec,
    fontSize: 14,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  imageWrapper: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  tagBadge: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: 14,
    color: COLORS.textSec,
    lineHeight: 20,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSec,
    fontWeight: '500',
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 6,
    // Sombra sutil no botão
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  exploreText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
});