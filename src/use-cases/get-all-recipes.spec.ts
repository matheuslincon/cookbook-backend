import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryRecipeRepository } from '@/repositories/in-memory/in-memory-recipe-repository'
import { GetAllRecipesUseCase } from './get-all-recipes'

let recipeRepository: InMemoryRecipeRepository
let sut: GetAllRecipesUseCase

describe('Get all recipes Use Case', () => {
  beforeEach(() => {
    recipeRepository = new InMemoryRecipeRepository()
    sut = new GetAllRecipesUseCase(recipeRepository)
  })

  it('should return all recipes for a specific user', async () => {
    const userId = 1
    await recipeRepository.create({
      title: 'Pasta',
      description: 'Delicious homemade pasta',
      ingredients: ['flour', 'eggs', 'salt'],
      instructions: 'Mix ingredients and cook.',
      category: 'DINNER',
      user_id: userId,
    })
    await recipeRepository.create({
      title: 'Pancakes',
      description: 'Fluffy pancakes',
      ingredients: ['flour', 'milk', 'eggs'],
      instructions: 'Mix ingredients and fry.',
      category: 'BREAKFAST',
      user_id: userId,
    })
    await recipeRepository.create({
      title: 'Pizza',
      description: 'Homemade pizza',
      ingredients: ['flour', 'yeast', 'cheese'],
      instructions: 'Bake the pizza.',
      category: 'DINNER',
      user_id: 2,
    })

    const { recipes } = await sut.execute({ userId })

    expect(recipes).toHaveLength(2)
  })

  it('should return an empty array if user has no recipes', async () => {
    const { recipes } = await sut.execute({ userId: 999 })

    expect(recipes).toHaveLength(0)
  })
})
