import { UserType } from "./user.type";

export type PaginatedType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserType[];
};
