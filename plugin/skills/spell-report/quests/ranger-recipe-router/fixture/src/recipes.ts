export type Recipe = { id: string; title: string; minutes: number; saved: boolean; steps: string[] };

export const recipes: Recipe[] = [
  { id: '42', title: 'Miso butter noodles', minutes: 15, saved: true, steps: ['Boil noodles.', 'Whisk miso into melted butter.', 'Toss and top with scallions.'] },
  { id: '57', title: 'Sheet pan gnocchi', minutes: 30, saved: false, steps: ['Heat oven to 220 C.', 'Roast gnocchi and peppers for 25 minutes.'] },
  { id: '63', title: 'Charred corn salad', minutes: 20, saved: true, steps: ['Char the corn.', 'Mix with lime, feta and herbs.'] },
];

export function findRecipe(id: string | undefined): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}
