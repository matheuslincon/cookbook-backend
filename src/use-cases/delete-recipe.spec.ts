import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteRecipeUseCase } from './delete-recipe'
import { InMemoryRecipeRepository } from '@/repositories/in-memory/in-memory-recipe-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let recipeRepository: InMemoryRecipeRepository
let sut: DeleteRecipeUseCase

describe('Delete Recipe Use Case', () => {
  beforeEach(() => {
    recipeRepository = new InMemoryRecipeRepository()
    sut = new DeleteRecipeUseCase(recipeRepository)
  })

  it('should be able to delete a recipe', async () => {
    const userId = 1
    const recipe = await recipeRepository.create({
      title: 'Pasta',
      description: 'Delicious homemade pasta',
      ingredients: ['flour', 'eggs', 'salt'],
      instructions: 'Mix ingredients and cook.',
      category: 'DINNER',
      user_id: userId,
    })

    await sut.execute({
      userId,
      recipeId: recipe.id,
    })

    const foundRecipe = await recipeRepository.findById(recipe.id)
    expect(foundRecipe).toBeNull()
  })

  it('should throw error if recipe does not exist', async () => {
    await expect(() =>
      sut.execute({
        userId: 1,
        recipeId: 999,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw error if user tries to delete another user’s recipe', async () => {
    const recipe = await recipeRepository.create({
      title: 'Pasta',
      description: 'Delicious homemade pasta',
      ingredients: ['flour', 'eggs', 'salt'],
      instructions: 'Mix ingredients and cook.',
      category: 'DINNER',
      user_id: 1,
    })

    await expect(() =>
      sut.execute({
        userId: 2,
        recipeId: recipe.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
