import { UserService } from "./services/user.service";

const main = async () => {
  //Get All Users
  const allUsers = (await UserService.getAllUser(1)).data.data;
  console.log("ALL USERS", allUsers);

  //Get First User Starting With Letter
  const UserWithLetter = await UserService.getUserWithFirstLetterMatching("t");
  if (UserWithLetter) {
    console.log("USER WITH LETTER", UserWithLetter);
    const updatedUser = await UserService.updateJobTitle(
      UserWithLetter.id,
      "boss",
      UserWithLetter.first_name
    );
    console.log("USER UPDATED");
  } else {
    console.log("NO USER WITH LETTER");
    console.log(
      "NOT ABLE TO UPDATE USER BECAUSE NO USER FOUND WITH GIVEN LETTER"
    );
  }

  console.log("DELETING ALL USERS");

  await UserService.deleteAllUsers();
  console.log("ALL USERS DELETED");
};
main();
