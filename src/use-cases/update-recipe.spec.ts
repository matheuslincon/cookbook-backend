import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateRecipeUseCase } from './update-recipe'
import { InMemoryRecipeRepository } from '@/repositories/in-memory/in-memory-recipe-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let recipeRepository: InMemoryRecipeRepository
let sut: UpdateRecipeUseCase

describe('Update Recipe Use Case', () => {
  beforeEach(() => {
    recipeRepository = new InMemoryRecipeRepository()
    sut = new UpdateRecipeUseCase(recipeRepository)
  })

  it('should be able to update a recipe', async () => {
    const userId = 1
    const recipe = await recipeRepository.create({
      title: 'Pasta',
      description: 'Delicious homemade pasta',
      ingredients: ['flour', 'eggs', 'salt'],
      instructions: 'Mix ingredients and cook.',
      category: 'DINNER',
      user_id: userId,
    })

    const { recipe: updatedRecipe } = await sut.execute({
      userId,
      recipeId: recipe.id,
      title: 'Updated Pasta',
      description: 'Updated description',
    })

    expect(updatedRecipe.title).toBe('Updated Pasta')
    expect(updatedRecipe.description).toBe('Updated description')
  })

  it('should throw error if trying to update a recipe that does not exist', async () => {
    await expect(() =>
      sut.execute({
        userId: 1,
        recipeId: 999,
        title: 'Non-existent Recipe',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw error if user tries to update another user’s recipe', async () => {
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
        title: 'Updated Pasta',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
