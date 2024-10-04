import { Category, Prisma, Recipe } from '@prisma/client'
import { RecipeRepository } from '../recipe-repository'

export class InMemoryRecipeRepository implements RecipeRepository {
  public items: Recipe[] = []

  async create(data: Prisma.RecipeUncheckedCreateInput) {
    const recipe = {
      id: this.items.length + 1,
      title: data.title,
      description: data.description,
      ingredients: data.ingredients as string[],
      instructions: data.instructions,
      imageUrl: data.imageUrl ?? null,
      category: data.category,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(recipe)

    return recipe
  }

  async findById(id: number) {
    const recipe = this.items.find((item) => item.id === id)

    if (!recipe) {
      return null
    }

    return recipe
  }

  async findAllByUserId(id: number): Promise<Recipe[]> {
    return this.items.filter((recipe) => recipe.user_id === id)
  }

  async update(
    id: number,
    data: Partial<Prisma.RecipeUncheckedUpdateInput>,
  ): Promise<Recipe> {
    const recipeIndex = this.items.findIndex((recipe) => recipe.id === id)

    if (recipeIndex === -1) {
      throw new Error('Recipe not found')
    }

    const existingRecipe = this.items[recipeIndex]

    const updatedRecipe: Recipe = {
      ...existingRecipe,
      title: typeof data.title === 'string' ? data.title : existingRecipe.title,
      description:
        typeof data.description === 'string'
          ? data.description
          : existingRecipe.description,
      ingredients: Array.isArray(data.ingredients)
        ? data.ingredients
        : existingRecipe.ingredients,
      instructions:
        typeof data.instructions === 'string'
          ? data.instructions
          : existingRecipe.instructions,
      imageUrl:
        typeof data.imageUrl === 'string'
          ? data.imageUrl
          : existingRecipe.imageUrl,
      category:
        typeof data.category === 'string'
          ? (data.category as Category)
          : existingRecipe.category,
      updated_at: new Date(), // Set updated_at to the current date
    }

    this.items[recipeIndex] = updatedRecipe

    return updatedRecipe
  }
}
