import { expect, describe, it, beforeEach } from 'vitest'
import { CreateRecipeUseCase } from './create-recipe'
import { InMemoryRecipeRepository } from '@/repositories/in-memory/in-memory-recipe-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let recipeRepository: InMemoryRecipeRepository
let userRepository: InMemoryUserRepository
let sut: CreateRecipeUseCase

describe('Create Recipe Use Case', () => {
  beforeEach(() => {
    recipeRepository = new InMemoryRecipeRepository()
    userRepository = new InMemoryUserRepository()
    sut = new CreateRecipeUseCase(recipeRepository, userRepository)
  })

  it('should be able to create a recipe', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const { recipe } = await sut.execute({
      userId: user.id,
      title: 'Pasta',
      description: 'Delicious homemade pasta',
      ingredients: ['flour', 'eggs', 'salt'],
      instructions: 'Mix ingredients and cook.',
      category: 'DINNER',
    })

    expect(recipe.id).toEqual(expect.any(Number))
    expect(recipe.user_id).toEqual(user.id)
  })

  it('should not allow recipe creation if user does not exist', async () => {
    await expect(() =>
      sut.execute({
        userId: -999,
        title: 'Pasta',
        description: 'Delicious homemade pasta',
        ingredients: ['flour', 'eggs', 'salt'],
        instructions: 'Mix ingredients and cook.',
        category: 'DINNER',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should allow optional imageUrl when creating a recipe', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    const { recipe } = await sut.execute({
      userId: user.id,
      title: 'Pasta',
      description: 'Delicious homemade pasta',
      ingredients: ['flour', 'eggs', 'salt'],
      instructions: 'Mix ingredients and cook.',
      imageUrl: 'http://example.com/image.jpg',
      category: 'DINNER',
    })

    expect(recipe.imageUrl).toBe('http://example.com/image.jpg')
  })
})
