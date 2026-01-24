import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
// Importamos o hook para detectar as áreas seguras da tela
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

const TABS_COLORS = {
  active: '#8E24AA',   
  inactive: '#8E8E93', 
  background: '#FFFFFF',
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Captura as medidas de segurança do dispositivo atual (topo, base, laterais)
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: TABS_COLORS.active,
        tabBarInactiveTintColor: TABS_COLORS.inactive,
        headerShown: false,
        tabBarButton: HapticTab,
        
        // ESTILO DINÂMICO DA BARRA
        tabBarStyle: {
          backgroundColor: TABS_COLORS.background,
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          
          // A altura agora é: 60px (base) + o espaço seguro de baixo (insets.bottom)
          height: 60 + insets.bottom, 
          
          // O padding de baixo respeita o dispositivo ou usa 10px no mínimo
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,

          // Sombras
          elevation: 10, // Sombra para Android
          shadowColor: '#000', // Sombra para iOS
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
        },
        
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 4, // Um pequeno respiro entre o texto e a borda
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Serviços',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="square.grid.2x2.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}