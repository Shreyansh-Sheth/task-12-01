import userModel from "../model/user.model";

class UserService {
  private static LIMIT = 10;
  static async createUser(name: string, email: string) {
    return await userModel.create({
      name: name,
      email: email,
    });
  }

  static async getUsers(page = 0) {
    const users = await userModel
      .find()
      .skip(page * this.LIMIT)
      .limit(this.LIMIT);

    const totalPages = Math.ceil(
      (await userModel.countDocuments()) / this.LIMIT
    );
    return {
      users,
      totalPages,
      page,
    };
  }
  static async getUser(id: string) {
    return await userModel.findById(id);
  }
}

export default UserService;
