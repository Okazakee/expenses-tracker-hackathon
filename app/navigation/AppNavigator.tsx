import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { ExpensesProvider } from '../contexts/ExpensesContext';

const TabBarIcon = ({ name, color }: { name: any; color: string }) => { /* TODO fix type later */
  return <Ionicons name={name} size={24} color={color} />;
};

const AppNavigator = () => {
  return (
    <ExpensesProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => (
            <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill} />
          ),
          tabBarActiveTintColor: '#50E3C2',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.tabLabel,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="expenses"
          options={{
            title: 'Expenses',
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />
        <Tabs.Screen
          name="add-expense"
          options={{
            title: 'Add',
            tabBarIcon: ({ color }) => (
              <View style={styles.addButtonContainer}>
                <Ionicons name="add-circle" size={50} color="#50E3C2" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: 'Reports',
            tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="settings-outline" color={color} />,
          }}
        />
      </Tabs>
    </ExpensesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: 'rgba(18, 18, 18, 0.7)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    height: 80,
    paddingBottom: 20,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  addButtonContainer: {
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;