import { Prisma, Recipe } from '@prisma/client'

export interface RecipeRepository {
  create(data: Prisma.RecipeUncheckedCreateInput): Promise<Recipe>
  findById(id: number): Promise<Recipe | null>
}
