import { RecipeRepository } from '@/repositories/recipe-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteRecipeUseCaseRequest {
  userId: number
  recipeId: number
}

export class DeleteRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({
    userId,
    recipeId,
  }: DeleteRecipeUseCaseRequest): Promise<void> {
    const recipe = await this.recipeRepository.findById(recipeId)

    if (!recipe || recipe.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    await this.recipeRepository.delete(recipeId)
  }
}
