export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  password?: string;
};

export type UserDto = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  create_at: Date;
  update_at: Date;
};
