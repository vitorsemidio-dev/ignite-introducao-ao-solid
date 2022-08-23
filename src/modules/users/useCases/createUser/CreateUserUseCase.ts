import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userByEmail = this.usersRepository.findByEmail(email);
    const emailIsAvailable = !userByEmail;
    if (!emailIsAvailable) {
      throw new Error("Email is not available");
    }
    return this.usersRepository.create({
      email,
      name,
    });
  }
}

export { CreateUserUseCase };
