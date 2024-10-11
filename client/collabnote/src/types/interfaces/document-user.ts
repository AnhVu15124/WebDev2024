import PermissionEnum from "../enums/permission-enum";

interface DocumentUser {
  permission: PermissionEnum;
  userID: number;
  documentID: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
  };
}

export default DocumentUser;