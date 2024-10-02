import { Prisma, Recipe } from '@prisma/client'
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
}
