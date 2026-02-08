import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  StatusBar, 
  Dimensions,
  SafeAreaView,
  Linking 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  ShieldAlert, 
  FileText, 
  Heart, 
  Scale, 
  Users, 
  MapPin, 
  GraduationCap, 
  ArrowRight, 
  PhoneCall, 
  Lock 
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// --- CORES & TEMA ---
const COLORS = {
  primary: '#9333ea', // purple-600
  primaryLight: '#f3e8ff', // purple-100
  slate900: '#0f172a',
  slate600: '#475569',
  slate50: '#f8fafc',
  red600: '#dc2626',
  red50: '#fef2f2',
  white: '#ffffff',
  violet950: '#2e1065',
  violet200: '#ddd6fe',
};

// --- COMPONENTES UI REUTILIZÁVEIS ---

const Button = ({ 
  label, 
  icon: Icon, 
  variant = 'primary', 
  onPress, 
  style 
}: any) => {
  const isDestructive = variant === 'destructive';
  const isOutline = variant === 'outline';

  const bg = isDestructive 
    ? [COLORS.red600, '#b91c1c'] 
    : isOutline 
      ? ['transparent', 'transparent'] 
      : [COLORS.red600, '#b91c1c']; 

  const containerStyle = [
    styles.button,
    isOutline && styles.buttonOutline,
    style
  ];

  const content = (
    <View style={styles.buttonContent}>
      {Icon && <Icon size={20} color={isOutline ? COLORS.slate600 : COLORS.white} style={{ marginRight: 8 }} />}
      <Text style={[
        styles.buttonText, 
        isOutline && { color: COLORS.slate600 }
      ]}>
        {label}
      </Text>
    </View>
  );

  if (isOutline) {
    return (
      <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.8}>
      <LinearGradient
        colors={bg as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, styles.shadow]}
      >
        {content}
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Atualizado para ser clicável (TouchableOpacity)
const FeatureCard = ({ icon: Icon, title, desc, colorClass, onPress }: any) => {
  let iconColor = COLORS.primary;
  let bgIcon = COLORS.primaryLight;
  let borderColor = '#e2e8f0';

  if (colorClass === 'purple') { iconColor = '#9333ea'; bgIcon = '#f3e8ff'; }
  if (colorClass === 'pink') { iconColor = '#ec4899'; bgIcon = '#fce7f3'; borderColor = '#fbcfe8'; }
  if (colorClass === 'blue') { iconColor = '#2563eb'; bgIcon = '#dbeafe'; borderColor = '#bfdbfe'; }
  if (colorClass === 'teal') { iconColor = '#0d9488'; bgIcon = '#ccfbf1'; borderColor = '#99f6e4'; }
  if (colorClass === 'orange') { iconColor = '#f97316'; bgIcon = '#ffedd5'; borderColor = '#fed7aa'; }

  return (
    <TouchableOpacity 
      style={[styles.card, { borderColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.cardIconBox, { backgroundColor: bgIcon }]}>
        <Icon size={24} color={iconColor} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </TouchableOpacity>
  );
};

// --- TELA PRINCIPAL ---

const Index = () => {
  
  // Função auxiliar para abrir telefone
  const handleCallPolice = () => {
    Linking.openURL('tel:190');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- NAV BAR FLUTUANTE --- */}
      <BlurView intensity={90} tint="light" style={styles.navbar}>
        <SafeAreaView>
          <View style={styles.navContent}>
            {/* Logo Home Link */}
            <TouchableOpacity 
              style={styles.logoContainer} 
              onPress={() => router.push('/')}
              activeOpacity={0.7}
            >
              <Image 
                source={{ uri: "https://i.ibb.co/5XwYFhWb/M-es-At-picas.png" }} 
                style={styles.logo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.logoTextSmall}>VOZES DE</Text>
                <Text style={styles.logoText}>MÃES ATÍPICAS</Text>
              </View>
            </TouchableOpacity>

            {/* SOS Navbar */}
            <TouchableOpacity 
              style={styles.sosButtonSmall}
              onPress={() => router.push('/maeatipica/emergencia/sos')}
            >
              <ShieldAlert size={16} color={COLORS.white} />
              <Text style={styles.sosTextSmall}>SOS</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        {/* --- HERO SECTION --- */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={[COLORS.primaryLight, COLORS.white]}
            style={styles.heroGradient}
          />
          
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>PLATAFORMA DE APOIO INTEGRAL</Text>
            </View>

            <Text style={styles.heroTitle}>
              Sua rede de <Text style={{ color: COLORS.primary }}>força</Text>,{'\n'}
              seu espaço de <Text style={{ color: COLORS.primary }}>direito</Text>.
            </Text>

            <Text style={styles.heroSubtitle}>
              Um ecossistema seguro para mães atípicas combaterem a violência, garantirem direitos e encontrarem acolhimento real.
            </Text>

            <View style={styles.heroButtons}>
              <Button 
                label="PEDIR AJUDA AGORA" 
                icon={ShieldAlert} 
                variant="destructive"
                style={{ width: '100%', marginBottom: 12 }}
                onPress={() => router.push('/maeatipica/emergencia/sos')} 
              />
              <Button 
                label="Entrar na Comunidade" 
                icon={Users} 
                variant="outline"
                style={{ width: '100%' }}
                onPress={() => router.push('/community')} 
              />
            </View>

            <View style={styles.securityNote}>
              <Lock size={14} color={COLORS.slate600} />
              <Text style={styles.securityText}>Ambiente seguro, criptografado e discreto.</Text>
            </View>
          </View>
        </View>

        {/* --- TRUST BAR (STATS) --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>+5k</Text>
            <Text style={styles.statLabel}>MÃES UNIDAS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24h</Text>
            <Text style={styles.statLabel}>SUPORTE</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>SIGILO</Text>
          </View>
        </View>

        {/* --- FEATURES GRID --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recursos Essenciais</Text>
          <Text style={styles.sectionSubtitle}>Ferramentas projetadas para sua proteção e empoderamento.</Text>

          {/* Destaque: Cofre de Provas */}
          <TouchableOpacity 
            style={styles.featureHighlight}
            onPress={() => router.push('/maeatipica/evidencia/cofre')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#7e22ce', '#581c87']}
              style={styles.highlightGradient}
            >
              <View style={styles.iconBoxGlass}>
                <FileText size={28} color={COLORS.white} />
              </View>
              <Text style={styles.highlightTitle}>Cofre de Provas</Text>
              <Text style={styles.highlightDesc}>
                Grave áudios, salve fotos e registre ocorrências em um ambiente nuvem criptografado.
              </Text>
              <View style={styles.linkRow}>
                <Text style={styles.linkText}>Acessar Cofre Seguro</Text>
                <ArrowRight size={18} color="rgba(255,255,255,0.8)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Outros Cards */}
          <View style={styles.grid}>
            <FeatureCard 
              icon={Scale} 
              title="Guia Jurídico" 
              desc="Entenda seus direitos e medidas protetivas." 
              colorClass="purple" 
              onPress={() => router.push('/maeatipica/juridico/legal')}
            />
            <FeatureCard 
              icon={Heart} 
              title="Apoio Emocional" 
              desc="Acolhimento psicológico especializado." 
              colorClass="pink" 
              onPress={() => router.push('/support')}
            />
            <FeatureCard 
              icon={MapPin} 
              title="Rede Próxima" 
              desc="Geolocalização de delegacias e ONGs." 
              colorClass="blue" 
              onPress={() => router.push('/maeatipica/servicos/servicos')}
            />
            <FeatureCard 
              icon={Users} 
              title="Fórum Seguro" 
              desc="Troque experiências com quem te entende." 
              colorClass="teal" 
              onPress={() => router.push('/community')}
            />
            <FeatureCard 
              icon={GraduationCap} 
              title="Capacitação" 
              desc="Cursos para independência financeira." 
              colorClass="orange" 
              onPress={() => router.push('/maeatipica/educacao/educacao')}
            />
          </View>
        </View>

        {/* --- EMERGENCY BANNER --- */}
        <View style={styles.emergencyWrapper}>
          <View style={styles.emergencyContainer}>
            <View style={styles.emergencyHeader}>
              <View style={styles.emergencyIconPulse}>
                <PhoneCall size={20} color={COLORS.red600} />
              </View>
              <Text style={styles.emergencyLabel}>EMERGÊNCIA IMEDIATA</Text>
            </View>
            
            <Text style={styles.emergencyTitle}>Você está em situação de perigo?</Text>
            <Text style={styles.emergencyDesc}>
              Se você não puder falar agora, use nosso botão de pânico silencioso.
            </Text>

            <View style={{ gap: 12 }}>
              <Button 
                label="Ativar SOS Silencioso" 
                variant="destructive"
                style={{ width: '100%' }}
                onPress={() => router.push('/maeatipica/emergencia/sos')}
              />
              <Button 
                label="Ligar 190 (Polícia)" 
                variant="outline"
                style={{ width: '100%', backgroundColor: COLORS.white, borderColor: '#fecaca' }}
                onPress={handleCallPolice}
              />
            </View>
          </View>
        </View>

        {/* --- FOOTER (NAV LINKS) --- */}
        <View style={styles.footer}>
          <View style={styles.footerHeader}>
            <Heart size={20} color={COLORS.primary} style={{marginRight: 8}} />
            <Text style={styles.footerTitle}>Vozes de Mães Atípicas</Text>
          </View>
          <Text style={styles.footerDesc}>
            Construindo um futuro onde nenhuma mãe atípica precise enfrentar a violência ou a solidão sozinha.
          </Text>
          
          {/* Links Rápidos Footer */}
          <View style={styles.footerLinks}>
             <TouchableOpacity onPress={() => router.push('/maeatipica/emergencia/sos')}>
               <Text style={styles.footerLinkText}>Botão de Pânico</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => router.push('/maeatipica/juridico/legal')}>
               <Text style={styles.footerLinkText}>Direitos da Mulher</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => router.push('/maeatipica/servicos/servicos')}>
               <Text style={styles.footerLinkText}>Delegacias Próximas</Text>
             </TouchableOpacity>
          </View>

          <View style={styles.footerDivider} />
          
          <Text style={styles.footerCopy}>
            © {new Date().getFullYear()} Vozes de Mães Atípicas.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate50,
  },
  // --- NAVBAR ---
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
  },
  navContent: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoTextSmall: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '800',
    marginTop: -2,
  },
  sosButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.red600,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: COLORS.red600,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sosTextSmall: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 12,
  },

  // --- HERO ---
  heroContainer: {
    paddingTop: 100, // Space for navbar
    paddingBottom: 40,
    position: 'relative',
  },
  heroGradient: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.6,
  },
  heroContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.2)',
    marginBottom: 20,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.slate900,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.slate600,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  heroButtons: {
    width: '100%',
    marginBottom: 24,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityText: {
    fontSize: 12,
    color: COLORS.slate600,
  },

  // --- BUTTONS ---
  button: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: COLORS.red600,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // --- STATS ---
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.slate900,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.slate600,
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#cbd5e1',
  },

  // --- FEATURES ---
  sectionContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.slate900,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: COLORS.slate600,
    marginBottom: 24,
  },
  featureHighlight: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#581c87',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  highlightGradient: {
    padding: 24,
  },
  iconBoxGlass: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  highlightTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 8,
  },
  highlightDesc: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 24,
    marginBottom: 24,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.slate900,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: COLORS.slate600,
    lineHeight: 20,
  },

  // --- EMERGENCY ---
  emergencyWrapper: {
    padding: 24,
    paddingTop: 0,
  },
  emergencyContainer: {
    backgroundColor: COLORS.red50,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  emergencyIconPulse: {
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 50,
  },
  emergencyLabel: {
    color: COLORS.red600,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  emergencyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.slate900,
    marginBottom: 8,
  },
  emergencyDesc: {
    fontSize: 16,
    color: COLORS.slate600,
    marginBottom: 24,
    lineHeight: 22,
  },

  // --- FOOTER ---
  footer: {
    backgroundColor: COLORS.violet950,
    padding: 32,
    paddingBottom: 60,
  },
  footerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  footerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerDesc: {
    color: COLORS.violet200,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 8,
  },
  footerLinkText: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.8,
  },
  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 20,
  },
  footerCopy: {
    color: COLORS.slate600,
    textAlign: 'center',
    fontSize: 12,
  }
});

export default Index;