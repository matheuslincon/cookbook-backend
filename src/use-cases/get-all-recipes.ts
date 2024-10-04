import { Recipe } from '@prisma/client'
import { RecipeRepository } from '@/repositories/recipe-repository'

interface GetAllRecipesUseCaseRequest {
  userId: number
}

interface GetAllRecipesUseCaseResponse {
  recipes: Recipe[]
}

export class GetAllRecipesUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({
    userId,
  }: GetAllRecipesUseCaseRequest): Promise<GetAllRecipesUseCaseResponse> {
    const recipes = await this.recipeRepository.findAllByUserId(userId)

    return {
      recipes,
    }
  }
}
