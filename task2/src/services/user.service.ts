import axios from "axios";
import { PaginatedType } from "../types/paginated.type";
import { UserType } from "../types/user.type";

export class UserService {
  static axiosInstance = axios.create({
    baseURL: "https://reqres.in/api",
  });

  /*
  Get User Based On Page
  */
  static async getAllUser(page = 1) {
    return await this.axiosInstance.get<PaginatedType>(`users?page=${page}`);
  }

  /*
  Search All The Pages To Find User With Letter 
  */
  static async getUserWithFirstLetterMatching(letter = "a") {
    let user: undefined | UserType = undefined;
    let page = 0;
    while (typeof user === "undefined") {
      const users = await this.getAllUser(page);
      if (users.data.page === users.data.total_pages) {
        return false;
      }
      user = users.data.data.find(
        (user) =>
          user.first_name.startsWith(letter) ||
          user.first_name.startsWith(letter.toUpperCase())
      );

      page++;
    }
    return user ?? false;
  }

  /*
    Update Job Title 
  */
  static async updateJobTitle(id: number, jobTitle: string, name: string) {
    await this.axiosInstance.put("/users/" + id, {
      name: name,
      jobTitle: jobTitle,
    });
  }

  /*
    DELETE ALL USERS IN PARALLEL
  */

  static async deleteAllUsers() {
    let page = 1;
    let allUsers: UserType[] = [];

    while (true) {
      const users = await this.getAllUser(page);
      allUsers = [...allUsers, ...users.data.data];
      if (users.data.page === users.data.total_pages) {
        break;
      }
      page++;
    }

    const deleteAllUsers = allUsers.map((user) => {
      return this.axiosInstance.delete("/users/" + user.id);
    });

    await Promise.all(deleteAllUsers);
  }
}
