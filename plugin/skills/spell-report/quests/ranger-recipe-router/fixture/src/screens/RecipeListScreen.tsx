import React, { useLayoutEffect } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RecipesStackParams } from '../../App';
import { recipes } from '../recipes';

type Props = NativeStackScreenProps<RecipesStackParams, 'RecipeList'>;

export default function RecipeListScreen({ navigation }: Props) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="New" onPress={() => navigation.getParent()?.getParent()?.navigate('NewRecipe')} />,
    });
  }, [navigation]);

  return (
    <FlatList
      data={recipes}
      keyExtractor={(recipe) => recipe.id}
      renderItem={({ item }) => (
        <Pressable style={styles.row} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.minutes} min</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc' },
  title: { fontSize: 17, fontWeight: '600' },
  meta: { color: '#666', marginTop: 2 },
});
