import { prisma } from '@/lib/prisma'
import { Prisma, Recipe } from '@prisma/client'
import { RecipeRepository } from '../recipe-repository'

export class PrismaRecipeRepository implements RecipeRepository {
  async delete(id: number): Promise<void> {
    await prisma.recipe.delete({
      where: {
        id,
      },
    })
  }

  async update(
    id: number,
    data: Partial<Prisma.RecipeUncheckedCreateInput>,
  ): Promise<Recipe> {
    const recipe = await prisma.recipe.update({
      where: {
        id,
      },
      data,
    })

    return recipe
  }

  async findAllByUserId(id: number): Promise<Recipe[]> {
    const recipes = await prisma.recipe.findMany({
      where: {
        id,
      },
    })

    return recipes
  }

  async findById(id: number) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
    })

    return recipe
  }

  async create(data: Prisma.RecipeUncheckedCreateInput) {
    const recipe = await prisma.recipe.create({
      data,
    })

    return recipe
  }
}
