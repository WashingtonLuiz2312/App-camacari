import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  Linking,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Scale, 
  FileText, 
  Shield, 
  Heart, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

// --- CONFIGURAÇÃO DE CORES ---
const COLORS = {
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate600: '#475569',
  slate300: '#cbd5e1',
  slate50: '#f8fafc',
  purple600: '#9333ea',
  purple500: '#a855f7',
  purple100: '#f3e8ff',
  purple50: '#faf5ff',
  pink600: '#db2777',
  pink200: '#fbcfe8',
  blue600: '#2563eb',
  blue200: '#bfdbfe',
  indigo600: '#4f46e5',
  indigo200: '#c7d2fe',
  indigo50: '#eef2ff',
  emerald600: '#059669',
  emerald50: '#ecfdf5',
  red600: '#dc2626',
  red100: '#fee2e2',
  red50: '#fef2f2',
  white: '#ffffff',
};

const { width } = Dimensions.get('window');

// --- COMPONENTES AUXILIARES ---

// Card Genérico (Atualizado para ser clicável)
const Card = ({ children, style, noShadow, onPress }: any) => {
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container 
      style={[styles.card, !noShadow && styles.shadow, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </Container>
  );
};

// Accordion Item (FAQ)
const AccordionItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.accordionQuestion}>{question}</Text>
        {isOpen ? <ChevronUp size={20} color={COLORS.slate600} /> : <ChevronDown size={20} color={COLORS.slate600} />}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.accordionContent}>
          <Text style={styles.accordionAnswer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

// Botão Link Externo
const ExternalLinkButton = ({ label, url }: any) => (
  <TouchableOpacity 
    style={styles.externalLinkBtn}
    onPress={() => Linking.openURL(url)}
  >
    <Text style={styles.externalLinkText}>{label}</Text>
    <ExternalLink size={14} color={COLORS.purple600} />
  </TouchableOpacity>
);

// --- TELA PRINCIPAL ---

const LegalScreen = () => {
  const router = useRouter();

  // Dados das Leis com Links Reais
  const lawsData = [
    { 
      label: "Lei 11.340", 
      title: "Maria da Penha", 
      desc: "Contra violência doméstica e familiar.", 
      color: COLORS.pink600, 
      border: COLORS.pink200,
      url: "http://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
    },
    { 
      label: "Lei 8.742", 
      title: "BPC-LOAS", 
      desc: "Benefício assistencial de 1 salário mínimo.", 
      color: COLORS.blue600, 
      border: COLORS.blue200,
      url: "https://www.gov.br/mds/pt-br/acoes-e-programas/assistencia-social/beneficios-assistenciais/bpc"
    },
    { 
      label: "Lei 13.146", 
      title: "Estatuto PCD", 
      desc: "Direitos fundamentais da pessoa com deficiência.", 
      color: COLORS.purple600, 
      border: COLORS.purple100,
      url: "http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm"
    },
    { 
      label: "Lei 13.438", 
      title: "Diagnóstico", 
      desc: "Obrigatoriedade de protocolo para detecção precoce.", 
      color: COLORS.indigo600, 
      border: COLORS.indigo200,
      url: "http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13438.htm"
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Reúna Evidências",
      description: "Salve prints, áudios e fotos em nosso Cofre Seguro ou na nuvem. Testemunhas também são fundamentais.",
      icon: FileText,
      color: "#2563eb", 
      bg: "#eff6ff" 
    },
    {
      number: "02",
      title: "Procure uma Delegacia",
      description: "Dirija-se à Delegacia da Mulher (DEAM) ou à delegacia mais próxima. Você tem direito a atendimento prioritário.",
      icon: Shield,
      color: "#9333ea", 
      bg: "#faf5ff" 
    },
    {
      number: "03",
      title: "Registre o B.O.",
      description: "Relate todos os detalhes sem medo. O Boletim de Ocorrência é o primeiro passo oficial para sua proteção.",
      icon: Scale,
      color: "#4f46e5", 
      bg: "#eef2ff" 
    },
    {
      number: "04",
      title: "Medida Protetiva",
      description: "Solicite a medida protetiva de urgência imediata. O juiz tem o prazo de 48 horas para decidir.",
      icon: CheckCircle2,
      color: "#059669", 
      bg: "#ecfdf5" 
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* --- HERO HEADER --- */}
        <LinearGradient
          colors={[COLORS.slate900, '#2e1065']}
          style={styles.heroHeader}
        >
          <SafeAreaView>
            <View style={styles.heroContent}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()} // AÇÃO DE VOLTAR
              >
                <View style={styles.backIconBox}>
                  <ArrowLeft size={16} color={COLORS.white} />
                </View>
                <Text style={styles.backText}>Voltar para Início</Text>
              </TouchableOpacity>

              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>GUIA OFICIAL</Text>
              </View>

              <Text style={styles.heroTitle}>
                Orientação Jurídica{'\n'}
                <Text style={{ color: '#d8b4fe' }}>Simplificada</Text>
              </Text>

              <Text style={styles.heroDesc}>
                Conheça seus direitos, entenda as leis e saiba exatamente como agir para proteger você e sua família. Linguagem clara, sem "juridiquês".
              </Text>

              <TouchableOpacity 
                style={styles.heroButton} 
                activeOpacity={0.8}
                onPress={() => Linking.openURL('https://www.gov.br/mulheres/pt-br/central-de-conteudos/publicacoes')} // LINK EXEMPLO PDF
              >
                <BookOpen size={20} color={COLORS.purple600} style={{ marginRight: 8 }} />
                <Text style={styles.heroButtonText}>Baixar Guia PDF Completo</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* --- MAIN CONTENT --- */}
        <View style={styles.mainContainer}>
          
          {/* --- CARDS DE LEIS --- */}
          <View style={styles.lawsGrid}>
            {lawsData.map((item, index) => (
              <Card 
                key={index} 
                style={[styles.lawCard, { borderTopColor: item.border }]}
                onPress={() => Linking.openURL(item.url)} // LINK PARA A LEI
              >
                <Text style={styles.lawLabel}>{item.label}</Text>
                <Text style={[styles.lawTitle, { color: item.color }]}>{item.title}</Text>
                <Text style={styles.lawDesc}>{item.desc}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                   <Text style={{color: item.color, fontSize: 12, fontWeight: '600', marginRight: 4}}>Ler na íntegra</Text>
                   <ExternalLink size={12} color={item.color} />
                </View>
              </Card>
            ))}
          </View>

          {/* --- TRILHA DA DENÚNCIA --- */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIndicator} />
              <Text style={styles.sectionTitle}>Trilha da Denúncia Segura</Text>
            </View>

            <View style={styles.stepsContainer}>
              <View style={styles.stepsLine} />

              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Card key={idx} style={styles.stepCard} noShadow>
                    <View style={[styles.stepIconBox, { backgroundColor: step.bg }]}>
                      <Icon size={24} color={step.color} />
                    </View>
                    <View style={styles.stepContent}>
                      <Text style={styles.stepNumber}>PASSO {step.number}</Text>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDesc}>{step.description}</Text>
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>

          {/* --- FAQ --- */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIndicator, { backgroundColor: COLORS.indigo600 }]} />
              <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
            </View>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <AccordionItem 
                question="O que é medida protetiva de urgência?" 
                answer="É uma ordem judicial que obriga o agressor a se afastar. Pode ser pedida na delegacia, sem advogado, e o juiz deve decidir em 48h."
              />
              <AccordionItem 
                question="Preciso de provas físicas para denunciar?" 
                answer="Não. Em crimes domésticos, a palavra da vítima tem grande peso. Porém, reunir mensagens e testemunhas fortalece o caso."
              />
              <AccordionItem 
                question="Tenho direito a advogado gratuito?" 
                answer="Sim. A Defensoria Pública atende gratuitamente quem não pode pagar. Em casos de violência, você tem prioridade."
              />
              <AccordionItem 
                question="Como pedir o BPC-LOAS?" 
                answer="Pelo app 'Meu INSS' ou telefone 135. É necessário laudo médico atualizado e cadastro único (CadÚnico) em dia."
              />
            </Card>
          </View>

          {/* --- SIDEBAR CONTENT (EMERGÊNCIA) --- */}
          <View style={styles.sidebarContainer}>
            
            {/* Card Emergência */}
            <Card style={{ padding: 0, overflow: 'hidden', borderWidth: 0 }}>
              <View style={styles.emergencyHeader}>
                <AlertTriangle size={20} color={COLORS.white} />
                <Text style={styles.emergencyHeaderText}>Emergência?</Text>
              </View>
              
              <View style={styles.emergencyBody}>
                <Text style={styles.emergencySubtext}>Toque nos números para ligar imediatamente:</Text>
                
                <TouchableOpacity 
                  style={styles.callBtn}
                  onPress={() => Linking.openURL('tel:190')} // LIGA PARA 190
                >
                  <View style={[styles.callIcon, { backgroundColor: COLORS.red100 }]}>
                    <Phone size={20} color={COLORS.red600} />
                  </View>
                  <View>
                    <Text style={styles.callNumber}>190</Text>
                    <Text style={styles.callLabel}>POLÍCIA MILITAR</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.callBtn}
                  onPress={() => Linking.openURL('tel:180')} // LIGA PARA 180
                >
                  <View style={[styles.callIcon, { backgroundColor: COLORS.purple100 }]}>
                    <Heart size={20} color={COLORS.purple600} />
                  </View>
                  <View>
                    <Text style={styles.callNumber}>180</Text>
                    <Text style={styles.callLabel}>CENTRAL DA MULHER</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Card>

            {/* Links Úteis */}
            <Card style={styles.linksCard}>
              <View style={styles.linksHeader}>
                <ExternalLink size={18} color={COLORS.purple600} />
                <Text style={styles.linksTitle}>Links Oficiais</Text>
              </View>
              <View style={{ gap: 8 }}>
                <ExternalLinkButton label="Lei Maria da Penha (Íntegra)" url="http://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm" />
                <ExternalLinkButton label="Portal Meu INSS" url="https://meu.inss.gov.br" />
                <ExternalLinkButton label="Defensoria Pública" url="https://www.defensoria.ba.def.br/" />
                <ExternalLinkButton label="Ministério das Mulheres" url="https://www.gov.br/mulheres" />
              </View>
            </Card>

            {/* Card Motivacional */}
            <LinearGradient
              colors={[COLORS.indigo50, COLORS.purple50]}
              style={styles.motivationCard}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Heart size={24} color={COLORS.purple500} fill={COLORS.purple500} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.motivationTitle}>Você não está sozinha</Text>
                  <Text style={styles.motivationText}>
                    A lei está do seu lado. Não tenha medo de buscar seus direitos. A culpa nunca é da vítima.
                  </Text>
                </View>
              </View>
            </LinearGradient>

          </View>

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
  
  // --- HERO HEADER ---
  heroHeader: {
    paddingTop: 60,
    paddingBottom: 80, // Extra padding for overlap
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backText: {
    color: COLORS.slate300,
    fontSize: 14,
    fontWeight: '500',
  },
  badgeContainer: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: COLORS.purple100,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 40,
    marginBottom: 16,
  },
  heroDesc: {
    color: COLORS.slate300,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  heroButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  heroButtonText: {
    color: COLORS.slate900,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- MAIN CONTENT ---
  mainContainer: {
    marginTop: -50,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  // LAWS GRID
  lawsGrid: {
    marginBottom: 32,
  },
  lawCard: {
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lawLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.slate300,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  lawTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  lawDesc: {
    fontSize: 14,
    color: COLORS.slate600,
    lineHeight: 20,
  },

  // SECTIONS
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIndicator: {
    width: 4,
    height: 24,
    backgroundColor: COLORS.purple600,
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.slate900,
  },

  // STEPS
  stepsContainer: {
    position: 'relative',
  },
  stepsLine: {
    position: 'absolute',
    left: 28, // Center of the icon box roughly
    top: 20,
    bottom: 20,
    width: 2,
    backgroundColor: COLORS.slate300,
    zIndex: -1,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginBottom: 16,
  },
  stepIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  stepContent: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.slate300,
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.slate800,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: COLORS.slate600,
    lineHeight: 20,
  },

  // FAQ
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate50,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  accordionQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.slate800,
    flex: 1,
    marginRight: 8,
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.slate50,
  },
  accordionAnswer: {
    fontSize: 14,
    color: COLORS.slate600,
    lineHeight: 22,
  },

  // SIDEBAR / EMERGENCY
  sidebarContainer: {
    gap: 16,
    paddingBottom: 40,
  },
  emergencyHeader: {
    backgroundColor: COLORS.red600,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergencyHeaderText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emergencyBody: {
    padding: 20,
  },
  emergencySubtext: {
    fontSize: 14,
    color: COLORS.slate600,
    marginBottom: 16,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.slate300,
    borderRadius: 12,
    marginBottom: 12,
  },
  callIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.slate900,
  },
  callLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.slate600,
    textTransform: 'uppercase',
  },
  
  // LINKS
  linksCard: {
    padding: 20,
  },
  linksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  linksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.slate900,
  },
  externalLinkBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate50,
  },
  externalLinkText: {
    fontSize: 14,
    color: COLORS.slate600,
  },

  // MOTIVATION
  motivationCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.indigo200,
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4c1d95', // deep purple
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 13,
    color: '#5b21b6',
    lineHeight: 20,
  },
});

export default LegalScreen;