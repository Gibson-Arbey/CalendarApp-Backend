import { User } from '../schema/user.schema';

export const mapUserSchemaToDto = (user: User) => {
  const userObj = user.toObject();
  return {
    id: userObj._id,
    name: userObj.name,
    email: userObj.email,
  };
};
