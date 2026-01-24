import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Se tiver o BlurView instalado, fica lindo, se não, usamos view normal
// import { BlurView } from 'expo-blur'; 

// ==========================================
// 1. PALETA DE CORES DA MARCA (PREFEITURA)
// ==========================================
const COLORS = {
  primary: '#7CB342',    // Verde (Ação Principal)
  secondary: '#8E24AA',  // Roxo (Títulos/Cultura)
  accent: '#FB8C00',     // Laranja (Destaques/Sol)
  danger: '#E53935',     // Vermelho (Coração)
  background: '#F8F9FA', // Off-white moderno
  surface: '#FFFFFF',
  textMain: '#1A1A1A',
  textSec: '#666666',
};

const beaches = [
  {
    id: 1,
    name: 'Guarajuba',
    tag: 'Família',
    desc: 'Águas cristalinas e piscinas naturais. Infraestrutura completa.',
    image: require('@/assets/images/guarajuba.png'), 
    distance: '42 km',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Arembepe',
    tag: 'Cultural',
    desc: 'Aldeia hippie famosa mundialmente e piscinas tranquilas.',
    image: require('@/assets/images/arembepe.png'),
    distance: '30 km',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Itacimirim',
    tag: 'Surf & Natureza',
    desc: 'Ondas para surf e encontro do rio com o mar.',
    image: require('@/assets/images/itacimirim.jpg'),
    distance: '48 km',
    rating: 4.8
  },
  {
    id: 4,
    name: 'Jauá',
    tag: 'Lazer',
    desc: 'Dunas brancas e o famoso "piscinão" natural.',
    image: require('@/assets/images/jaua.jpg'),
    distance: '25 km',
    rating: 4.5
  },
];

// Filtros de Categoria (UX: Facilita a busca)
const categories = ['Todas', 'Família', 'Surf', 'Agitadas', 'Calmas'];

export default function TurismoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('Todas');

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* HEADER DINÂMICO */}
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
        
        {/* TÍTULO HERO */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Descubra o <Text style={{ color: COLORS.primary }}>Paraíso</Text>{'\n'}
            na Costa de Camaçari
          </Text>
        </View>

        {/* CATEGORIAS (SCROLL HORIZONTAL) */}
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
                activeCategory === cat && { backgroundColor: COLORS.secondary }
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
              onPress={() => {}}
            >
              {/* IMAGEM COM OVERLAY */}
              <View style={styles.imageWrapper}>
                <Image 
                  source={item.image} 
                  style={styles.cardImage} 
                  contentFit="cover"
                  transition={500}
                />
                
                {/* Badge de Rating */}
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFF" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>

                {/* Botão de Favorito */}
                <TouchableOpacity style={styles.favoriteBtn}>
                  <Ionicons name="heart-outline" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>

              {/* CONTEÚDO DO CARD */}
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
                  
                  <TouchableOpacity style={styles.exploreBtn}>
                    <Text style={styles.exploreText}>Ver Detalhes</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFF" />
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
  // HEADER
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

  // HERO
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

  // CATEGORIAS
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

  // CARDS
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
    backgroundColor: COLORS.accent, // Laranja da marca
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

  // CARD CONTENT
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
    backgroundColor: '#F3E5F5', // Roxo bem clarinho
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: COLORS.secondary, // Roxo da marca
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
    backgroundColor: COLORS.primary, // Verde da marca
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  exploreText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
});