import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { RecipeRepository } from '../recipe-repository'

export class PrismaRecipeRepository implements RecipeRepository {
  async create(data: Prisma.RecipeUncheckedCreateInput) {
    const recipe = await prisma.recipe.create({
      data,
    })

    return recipe
  }
}
