import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  StatusBar, 
  Dimensions,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Award, 
  Search, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Play, 
  Star, 
  PlayCircle, 
  FileText, 
  ChevronRight, 
  Bookmark, 
  CheckCircle2,
  TrendingUp,
  Video
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- CORES ---
const COLORS = {
  violet950: '#2e1065',
  violet900: '#4c1d95',
  violet700: '#6d28d9',
  violet600: '#7c3aed',
  violet500: '#8b5cf6',
  violet400: '#a78bfa',
  violet300: '#c4b5fd',
  violet200: '#ddd6fe',
  violet100: '#ede9fe',
  violet50: '#f5f3ff',
  
  fuchsia600: '#c026d3',
  fuchsia500: '#d946ef',
  fuchsia100: '#fae8ff',
  fuchsia50: '#fdf4ff',
  
  pink500: '#ec4899',
  pink100: '#fce7f3',
  
  emerald700: '#047857',
  amber500: '#f59e0b',
  amber50: '#fffbeb',
  
  white: '#ffffff',
  bg: '#f8f7ff',
};

// --- DADOS MOCKADOS ---
const categories = ["Todos", "Direitos", "Saúde Mental", "Finanças", "Inclusão"];

const courses = [
  {
    id: 1,
    title: "Violência Psicológica: Identifique e Combata",
    description: "Aprenda a reconhecer sinais sutis de abuso emocional e gaslighting.",
    duration: "45 min",
    lessons: 6,
    rating: 4.9,
    category: "Essencial",
    colorBg: COLORS.pink100,
    colorText: '#be185d', // pink-700
    progress: 0,
    gradientColors: ['#ec4899', '#f43f5e'] // pink-500 to rose-500
  },
  {
    id: 2,
    title: "Guia BPC-LOAS 2025: Passo a Passo",
    description: "Atualizado para solicitar o benefício sem advogado de forma segura.",
    duration: "1h 20m",
    lessons: 8,
    rating: 4.8,
    category: "Direitos",
    colorBg: COLORS.violet100,
    colorText: COLORS.violet700,
    progress: 35,
    gradientColors: ['#8b5cf6', '#6366f1'] // violet-500 to indigo-500
  },
  {
    id: 3,
    title: "Autocuidado na Maternidade Atípica",
    description: "Técnicas de respiração e organização mental para mães sobrecarregadas.",
    duration: "40 min",
    lessons: 5,
    rating: 5.0,
    category: "Bem-estar",
    colorBg: COLORS.fuchsia100,
    colorText: '#a21caf', // fuchsia-700
    progress: 100,
    gradientColors: ['#d946ef', '#a855f7'] // fuchsia-500 to purple-500
  }
];

const articles = [
  { title: "10 Sinais de Relacionamento Abusivo", read: "8 min", views: "15k", tag: "Alerta" },
  { title: "Direito à Escola: O que diz a Lei?", read: "12 min", views: "8k", tag: "Jurídico" },
  { title: "Organizando a rotina de terapias", read: "6 min", views: "5k", tag: "Dicas" }
];

export default function EducationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.violet950} />

      {/* --- HEADER --- */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <ArrowLeft size={20} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Academia Mães Atípicas</Text>
          </View>
          
          <View style={styles.levelBadge}>
            <Award size={16} color={COLORS.fuchsia500} />
            <Text style={styles.levelText}>Nível 3</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent]} 
        showsVerticalScrollIndicator={false}
      >
        {/* --- HERO SECTION --- */}
        <View style={styles.heroWrapper}>
          <LinearGradient
            colors={['#1e1b4b', '#2e1065']} // slate-900 to violet-950
            style={styles.heroBg}
          >
            {/* Background Decor */}
            <View style={styles.blob1} />
            <View style={styles.blob2} />

            <View style={styles.heroContent}>
              <View style={styles.heroBadge}>
                <Sparkles size={14} color={COLORS.violet300} style={{ marginRight: 6 }} />
                <Text style={styles.heroBadgeText}>Educação & Direitos</Text>
              </View>

              <Text style={styles.heroTitle}>
                Conhecimento é a sua{'\n'}
                <Text style={{ color: '#d8b4fe' }}>maior defesa.</Text>
              </Text>

              <Text style={styles.heroDesc}>
                Acesse cursos gratuitos, guias jurídicos simplificados e materiais de apoio para fortalecer você e sua família.
              </Text>

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <View style={styles.searchIconBox}>
                  <Search size={20} color={COLORS.violet300} />
                </View>
                <TextInput 
                  style={styles.searchInput}
                  placeholder="O que você quer aprender?"
                  placeholderTextColor={COLORS.violet400}
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* --- MAIN CONTENT --- */}
        <View style={styles.mainContent}>
          
          {/* 1. TABS DE NAVEGAÇÃO */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.tabsContainer}
            style={{ marginBottom: 24 }}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveTab(cat)}
                style={[
                  styles.tabButton,
                  activeTab === cat ? styles.tabActive : styles.tabInactive
                ]}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === cat ? styles.tabTextActive : styles.tabTextInactive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 2. CONTINUE LEARNING CARD */}
          <View style={styles.continueCard}>
            <View style={styles.continueHeader}>
              <View>
                <View style={styles.continueBadge}>
                  <Text style={styles.continueBadgeText}>Em andamento</Text>
                </View>
                <Text style={styles.continueTitle}>Continue Aprendendo</Text>
                <Text style={styles.continueSub}>Você parou em: Guia BPC-LOAS</Text>
              </View>
              <View style={styles.playIconBox}>
                <Play size={24} color={COLORS.violet600} fill={COLORS.violet600} style={{ marginLeft: 2 }} />
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>Progresso do Curso</Text>
                <Text style={styles.progressValue}>35%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={[COLORS.violet500, COLORS.fuchsia500]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBarFill, { width: '35%' }]}
                />
              </View>
              
              <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}>
                <Text style={styles.continueButtonText}>Continuar Aula</Text>
                <ChevronRight size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. COURSES LIST */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cursos em Destaque</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coursesList}>
            {courses.map((course) => (
              <TouchableOpacity key={course.id} style={styles.courseCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={course.gradientColors as unknown as readonly [string, string, ...string[]]}
                  style={styles.courseImage}
                >
                  <PlayCircle size={48} color={COLORS.white} style={{ opacity: 0.9 }} />
                  {course.progress === 100 && (
                    <View style={styles.completedBadge}>
                      <CheckCircle2 size={12} color={COLORS.emerald700} style={{ marginRight: 4 }} />
                      <Text style={styles.completedText}>Concluído</Text>
                    </View>
                  )}
                </LinearGradient>

                <View style={styles.courseContent}>
                  <View style={styles.courseTags}>
                    <View style={[styles.categoryBadge, { backgroundColor: course.colorBg }]}>
                      <Text style={[styles.categoryText, { color: course.colorText }]}>{course.category}</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Star size={12} color={COLORS.amber500} fill={COLORS.amber500} style={{ marginRight: 4 }} />
                      <Text style={styles.ratingText}>{course.rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                  <Text style={styles.courseDesc} numberOfLines={2}>{course.description}</Text>

                  <View style={styles.courseMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={14} color={COLORS.violet400} />
                      <Text style={styles.metaText}>{course.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <BookOpen size={14} color={COLORS.violet400} />
                      <Text style={styles.metaText}>{course.lessons} aulas</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* 4. ARTICLES CARD */}
          <View style={styles.articlesCard}>
            <View style={styles.articlesHeader}>
              <View style={styles.articlesIconBox}>
                <FileText size={24} color={COLORS.fuchsia600} />
              </View>
              <Text style={styles.articlesTitle}>Leitura Rápida</Text>
            </View>

            <View style={styles.articlesList}>
              {articles.map((art, i) => (
                <TouchableOpacity key={i} style={styles.articleItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.articleTitle} numberOfLines={2}>{art.title}</Text>
                    <Text style={styles.articleMeta}>{art.read} • {art.views} visualizações</Text>
                  </View>
                  <View style={styles.articleTag}>
                    <Text style={styles.articleTagText}>{art.tag}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.libraryLink}>
              <Text style={styles.libraryLinkText}>Ver biblioteca completa</Text>
            </TouchableOpacity>
          </View>

          {/* 5. VIDEO HIGHLIGHT CARD */}
          <TouchableOpacity style={styles.videoCard} activeOpacity={0.9}>
            <ImageBackground 
              source={{ uri: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=600&auto=format&fit=crop' }}
              style={styles.videoBg}
              imageStyle={{ borderRadius: 24, opacity: 0.6 }}
            >
              <LinearGradient
                colors={['transparent', 'rgba(46, 16, 101, 0.9)']}
                style={styles.videoOverlay}
              >
                <View style={styles.videoTop}>
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>Novo Webinar</Text>
                  </View>
                  <View style={styles.bookmarkBtn}>
                    <Bookmark size={20} color={COLORS.white} />
                  </View>
                </View>

                <View>
                  <View style={styles.playBtnLarge}>
                    <Play size={24} color={COLORS.white} style={{ marginLeft: 2 }} fill={COLORS.white} />
                  </View>
                  <Text style={styles.videoTitle}>Direitos na Escola: O que mudou?</Text>
                  <View style={styles.videoMeta}>
                    <Video size={16} color={COLORS.violet200} />
                    <Text style={styles.videoMetaText}>Vídeo Aula • 25 min</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>

          {/* 6. PROGRESS STATS CARD */}
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>Suas Conquistas</Text>
              <View style={styles.trendIcon}>
                <TrendingUp size={20} color={COLORS.emerald700} />
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>CURSOS</Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: COLORS.fuchsia50, borderColor: '#fae8ff' }]}>
                <Text style={[styles.statNumber, { color: COLORS.fuchsia600 }]}>8h</Text>
                <Text style={[styles.statLabel, { color: '#e879f9' }]}>ESTUDADAS</Text>
              </View>
            </View>

            {/* Certificate Promo */}
            <LinearGradient
              colors={[COLORS.violet500, COLORS.fuchsia500]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.certPromo}
            >
              <View style={styles.certContent}>
                <View style={styles.certIconBox}>
                  <Award size={24} color="#fde047" />
                </View>
                <View>
                  <Text style={styles.certTitle}>Certificado Disponível</Text>
                  <Text style={styles.certSub}>Direitos Básicos</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.certButton}>
                <Text style={styles.certButtonText}>Baixar PDF</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* 7. EXPLORE TOPICS */}
          <View style={styles.topicsContainer}>
            <Text style={styles.sectionTitle}>Explorar Temas</Text>
            {['Violência Doméstica', 'Direitos da Criança', 'Saúde Mental', 'Benefícios Sociais', 'Educação Inclusiva'].map((topic, i) => (
              <TouchableOpacity key={i} style={styles.topicButton}>
                <Text style={styles.topicText}>{topic}</Text>
                <ChevronRight size={20} color={COLORS.violet300} />
              </TouchableOpacity>
            ))}
          </View>

          {/* 8. NEWSLETTER */}
          <View style={styles.newsletterCard}>
            <View style={styles.newsletterIconBox}>
              <Bookmark size={28} color={COLORS.violet300} />
            </View>
            <Text style={styles.newsletterTitle}>Resumo Semanal</Text>
            <Text style={styles.newsletterDesc}>Receba as atualizações das leis e novos cursos direto no seu e-mail.</Text>
            
            <View style={styles.newsletterInputBox}>
              <TextInput 
                placeholder="Seu melhor e-mail" 
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={styles.newsletterInput}
              />
              <TouchableOpacity style={styles.newsletterButton}>
                <Text style={styles.newsletterButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>

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
  
  // HEADER
  header: {
    backgroundColor: COLORS.violet950,
    zIndex: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    gap: 6,
  },
  levelText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // SCROLL CONTENT
  scrollContent: {
    paddingBottom: 40,
  },

  // HERO
  heroWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    marginBottom: -40, // Overlap
    zIndex: 0,
  },
  heroBg: {
    paddingTop: 20,
    paddingBottom: 80,
    position: 'relative',
  },
  blob1: {
    position: 'absolute',
    top: -50, right: -50,
    width: 300, height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.violet600,
    opacity: 0.3,
  },
  blob2: {
    position: 'absolute',
    bottom: -50, left: -50,
    width: 250, height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.fuchsia600,
    opacity: 0.3,
  },
  heroContent: {
    paddingHorizontal: 24,
  },
  heroBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)', // violet-500/20
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  heroBadgeText: {
    color: COLORS.violet200,
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: 40,
    marginBottom: 16,
  },
  heroDesc: {
    color: 'rgba(221, 214, 254, 0.8)', // violet-200/80
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIconBox: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    height: '100%',
  },

  // MAIN CONTENT AREA
  mainContent: {
    paddingHorizontal: 20,
    zIndex: 10,
  },

  // TABS
  tabsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: COLORS.violet600,
    borderColor: COLORS.violet600,
  },
  tabInactive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.violet100,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: COLORS.white,
  },
  tabTextInactive: {
    color: 'rgba(124, 58, 237, 0.7)', // violet-600/70
  },

  // CONTINUE CARD
  continueCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.violet50,
    shadowColor: COLORS.violet100,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  continueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  continueBadge: {
    backgroundColor: COLORS.violet100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  continueBadgeText: {
    color: COLORS.violet700,
    fontSize: 12,
    fontWeight: 'bold',
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.violet900,
    marginBottom: 4,
  },
  continueSub: {
    fontSize: 14,
    color: 'rgba(109, 40, 217, 0.7)', // violet-700/70
    fontWeight: '500',
  },
  playIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.violet50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.violet100,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.violet700,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.violet700,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: COLORS.violet100,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor: COLORS.violet900,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: COLORS.violet900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },

  // SECTION HEADER
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.violet900,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.violet600,
  },

  // COURSES LIST
  coursesList: {
    gap: 16,
    marginBottom: 24,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.violet50,
    shadowColor: COLORS.violet100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row', // Horizontal layout for cards on mobile
    gap: 16,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  completedBadge: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.emerald700,
  },
  courseContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  courseTags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)', // amber-50/80
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(254, 243, 199, 0.5)',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.amber500,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.violet900,
    marginBottom: 4,
    lineHeight: 20,
  },
  courseDesc: {
    fontSize: 12,
    color: 'rgba(109, 40, 217, 0.7)',
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.violet50,
    paddingTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(167, 139, 250, 0.8)',
  },

  // ARTICLES CARD
  articlesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.violet50,
    shadowColor: COLORS.violet100,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  articlesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  articlesIconBox: {
    padding: 10,
    backgroundColor: COLORS.fuchsia100,
    borderRadius: 12,
  },
  articlesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.violet900,
  },
  articlesList: {
    gap: 16,
  },
  articleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 12,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.violet900,
    marginBottom: 4,
  },
  articleMeta: {
    fontSize: 12,
    color: COLORS.violet500,
    fontWeight: '500',
  },
  articleTag: {
    backgroundColor: COLORS.violet50,
    borderWidth: 1,
    borderColor: COLORS.violet200,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  articleTagText: {
    fontSize: 10,
    color: COLORS.violet400,
  },
  libraryLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  libraryLinkText: {
    color: COLORS.fuchsia600,
    fontWeight: 'bold',
    fontSize: 14,
  },

  // VIDEO CARD
  videoCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    height: 200,
    shadowColor: COLORS.violet900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  videoBg: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.violet950,
  },
  videoOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  videoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  newBadge: {
    backgroundColor: COLORS.fuchsia500,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookmarkBtn: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  playBtnLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  videoMetaText: {
    fontSize: 12,
    color: COLORS.violet200,
    fontWeight: '500',
  },

  // STATS CARD
  statsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.violet50,
    shadowColor: COLORS.violet100,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.violet900,
  },
  trendIcon: {
    padding: 8,
    backgroundColor: '#dcfce7', // green-100
    borderRadius: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(245, 243, 255, 0.8)', // violet-50
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(237, 233, 254, 0.5)',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.violet600,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.violet400,
    letterSpacing: 1,
  },
  certPromo: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  certIconBox: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  certTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  certSub: {
    fontSize: 10,
    color: COLORS.violet100,
  },
  certButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  certButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.violet900,
  },

  // TOPICS
  topicsContainer: {
    marginBottom: 24,
  },
  topicButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.violet100,
  },
  topicText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(109, 40, 217, 0.8)',
  },

  // NEWSLETTER
  newsletterCard: {
    backgroundColor: '#3b0764', // deep violet
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  newsletterIconBox: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  newsletterDesc: {
    fontSize: 14,
    color: 'rgba(233, 213, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  newsletterInputBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 4,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  newsletterInput: {
    flex: 1,
    paddingHorizontal: 12,
    color: COLORS.white,
    fontSize: 14,
  },
  newsletterButton: {
    backgroundColor: COLORS.fuchsia500,
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 40,
  },
  newsletterButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});