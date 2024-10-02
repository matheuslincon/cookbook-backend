import { Recipe } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UserRepository } from '@/repositories/user-repository'
import { RecipeRepository } from '@/repositories/recipe-repository'

interface CreateRecipeUseCaseRequest {
  userId: number
  title: string
  description: string
  ingredients: string[]
  instructions: string
  imageUrl?: string
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER'
}

interface CreateRecipeUseCaseResponse {
  recipe: Recipe
}

export class CreateRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    title,
    description,
    ingredients,
    instructions,
    imageUrl,
    category,
  }: CreateRecipeUseCaseRequest): Promise<CreateRecipeUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    const recipe = await this.recipeRepository.create({
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      category,
      user_id: userId,
    })

    return {
      recipe,
    }
  }
}
