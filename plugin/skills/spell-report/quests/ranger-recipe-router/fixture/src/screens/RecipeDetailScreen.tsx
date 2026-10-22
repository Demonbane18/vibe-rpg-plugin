import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RecipesStackParams } from '../../App';
import { findRecipe } from '../recipes';

type Props = NativeStackScreenProps<RecipesStackParams, 'RecipeDetail'>;

export default function RecipeDetailScreen({ navigation, route }: Props) {
  const recipe = findRecipe(route.params.id);

  useLayoutEffect(() => {
    navigation.setOptions({ title: recipe?.title ?? 'Recipe' });
  }, [navigation, recipe]);

  if (!recipe) return <Text style={styles.missing}>This recipe is no longer available.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.meta}>{recipe.minutes} minutes</Text>
      {recipe.steps.map((step, index) => (
        <Text key={step} style={styles.step}>
          {index + 1}. {step}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 16, gap: 12 },
  meta: { color: '#666' },
  step: { fontSize: 16, lineHeight: 22 },
  missing: { padding: 16, color: '#666' },
});
