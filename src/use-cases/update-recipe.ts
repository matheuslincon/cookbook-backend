import { RecipeRepository } from '@/repositories/recipe-repository'
import { Category, Recipe } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateRecipeUseCaseRequest {
  userId: number
  recipeId: number
  title?: string
  description?: string
  ingredients?: string[]
  instructions?: string
  imageUrl?: string
  category?: Category
}

interface UpdateRecipeUseCaseResponse {
  recipe: Recipe
}

export class UpdateRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({
    userId,
    recipeId,
    title,
    description,
    ingredients,
    instructions,
    imageUrl,
    category,
  }: UpdateRecipeUseCaseRequest): Promise<UpdateRecipeUseCaseResponse> {
    const recipe = await this.recipeRepository.findById(recipeId)

    if (!recipe || recipe.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    const updatedRecipe = await this.recipeRepository.update(recipeId, {
      title: title ?? recipe.title,
      description: description ?? recipe.description,
      ingredients: ingredients ?? recipe.ingredients,
      instructions: instructions ?? recipe.instructions,
      imageUrl: imageUrl ?? recipe.imageUrl,
      category: category ?? recipe.category,
    })

    return { recipe: updatedRecipe }
  }
}
