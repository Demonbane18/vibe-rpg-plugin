import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { recipes } from '../recipes';

export default function SavedScreen() {
  const navigation = useNavigation<any>();
  const saved = recipes.filter((recipe) => recipe.saved);

  return (
    <FlatList
      data={saved}
      keyExtractor={(recipe) => recipe.id}
      ListEmptyComponent={<Text style={styles.empty}>Nothing saved yet.</Text>}
      renderItem={({ item }) => (
        <Pressable
          style={styles.row}
          onPress={() => navigation.navigate('Recipes', { screen: 'RecipeDetail', params: { id: item.id } })}
        >
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc' },
  title: { fontSize: 17 },
  empty: { padding: 16, color: '#666' },
});
