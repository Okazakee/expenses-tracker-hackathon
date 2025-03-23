import type React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import type { Category } from '../database/schema';
import { useCallback } from 'react';
import { router } from 'expo-router';

interface HorizontalCategoryPickerProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const HorizontalCategoryPicker: React.FC<HorizontalCategoryPickerProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory
}) => {
  const renderCategoryItem = (item: Category) => {
    const isSelected = selectedCategoryId === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.categoryItem,
          isSelected && { borderColor: item.color, borderWidth: 2 }
        ]}
        onPress={() => onSelectCategory(item.id)}
      >
        <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            <Ionicons name={item.icon as any} size={22} color="#000000" />
          </View>
          <Text style={styles.categoryName}>{item.name}</Text>
        </BlurView>
      </TouchableOpacity>
    );
  };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const handleEditCategories = useCallback(() => {
      router.push('/screens/CategoryManagementScreen');
    }, [router]);


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Category</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditCategories}
        >
          <Text style={styles.editButtonText}>Edit Categories</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(category => renderCategoryItem(category))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  editButtonText: {
    color: '#15E8FE',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: 'rgba(21, 232, 254, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingBottom: 10,
    paddingTop: 5,
  },
  categoryItem: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: 'transparent',
    borderWidth: 2,
    marginRight: 12,
  },
  blurContainer: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default HorizontalCategoryPicker;