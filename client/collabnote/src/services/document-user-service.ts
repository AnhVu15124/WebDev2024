import PermissionEnum from "../types/enums/permission-enum";
import API from "./api";

const DocumentUserService = {
  create: (
    accessToken: string,
    payload: { documentID: number; email: string; permission: PermissionEnum }
  ) => {
    return API.post(`document/${payload.documentID}/share`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  delete: (
    accessToken: string,
    payload: { documentID: number; userID: number }
  ) => {
    return API.delete(
      `document/${payload.documentID}/share/${payload.userID}`,
      {headers: { Authorization: `Bearer ${accessToken}` },}
    );
  },
};

export default DocumentUserService;