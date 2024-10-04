import { Recipe } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { RecipeRepository } from '@/repositories/recipe-repository'

interface GetRecipeUseCaseRequest {
  recipeId: number
}

interface GetRecipeUseCaseResponse {
  recipe: Recipe
}

export class GetRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({
    recipeId,
  }: GetRecipeUseCaseRequest): Promise<GetRecipeUseCaseResponse> {
    const recipe = await this.recipeRepository.findById(recipeId)

    if (!recipe) {
      throw new ResourceNotFoundError()
    }

    return {
      recipe,
    }
  }
}
