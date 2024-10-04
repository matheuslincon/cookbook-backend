import { Prisma, Recipe } from '@prisma/client'

export interface RecipeRepository {
  create(data: Prisma.RecipeUncheckedCreateInput): Promise<Recipe>
  findById(id: number): Promise<Recipe | null>
  findAllByUserId(id: number): Promise<Recipe[]>
  update(
    id: number,
    data: Partial<Prisma.RecipeUncheckedCreateInput>,
  ): Promise<Recipe>
}
