import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, type LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeListScreen from './src/screens/RecipeListScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import SavedScreen from './src/screens/SavedScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export type RecipesStackParams = { RecipeList: undefined; RecipeDetail: { id: string } };
export type RootParams = { Tabs: undefined; NewRecipe: undefined };

const RecipesStack = createNativeStackNavigator<RecipesStackParams>();
const Tab = createBottomTabNavigator();
const Root = createNativeStackNavigator<RootParams>();

function RecipesTab() {
  return (
    <RecipesStack.Navigator>
      <RecipesStack.Screen name="RecipeList" component={RecipeListScreen} options={{ title: 'Recipes' }} />
      <RecipesStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </RecipesStack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recipes" component={RecipesTab} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function NewRecipeScreen({ navigation }: NativeStackScreenProps<RootParams, 'NewRecipe'>) {
  const [title, setTitle] = React.useState('');
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Recipe name</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Miso butter noodles" />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const linking: LinkingOptions<RootParams> = {
  prefixes: ['pantry://'],
  config: {
    screens: {
      Tabs: {
        screens: {
          Recipes: { screens: { RecipeList: '', RecipeDetail: 'recipe/:id' } },
          Saved: 'saved',
          Settings: 'settings',
        },
      },
      NewRecipe: 'new',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Root.Navigator>
        <Root.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Root.Screen name="NewRecipe" component={NewRecipeScreen} options={{ presentation: 'modal', title: 'New recipe' }} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1, padding: 16, gap: 8 },
  label: { fontWeight: '600' },
  input: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 8, padding: 10 },
});
