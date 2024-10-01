import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UserProfileUseCaseRequest {
  userId: number
}

interface UserProfileUseCaseResponse {
  user: User
}

export class UserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: UserProfileUseCaseRequest): Promise<UserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
