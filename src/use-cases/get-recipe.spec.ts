import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryRecipeRepository } from '@/repositories/in-memory/in-memory-recipe-repository'
import { GetRecipeUseCase } from './get-recipe'

let recipeRepository: InMemoryRecipeRepository
let sut: GetRecipeUseCase

describe('Get recipe Use Case', () => {
  beforeEach(() => {
    recipeRepository = new InMemoryRecipeRepository()
    sut = new GetRecipeUseCase(recipeRepository)
  })

  it('should be able to get a recipe', async () => {
    const createdRecipe = await recipeRepository.create({
      user_id: 1,
      title: 'Pasta',
      description: 'Delicious homemade pasta',
      ingredients: ['flour', 'eggs', 'salt'],
      instructions: 'Mix ingredients and cook.',
      category: 'DINNER',
    })

    const { recipe } = await sut.execute({
      recipeId: createdRecipe.id,
    })

    expect(recipe.title).toEqual('Pasta')
  })

  it('should not be able to get recipe with wrong id', async () => {
    expect(() =>
      sut.execute({
        recipeId: -1000,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
