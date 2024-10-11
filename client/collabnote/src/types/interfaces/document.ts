import DocumentUser from "./document-user";

interface DocumentInterface {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  userID: number;
  users: Array<DocumentUser>;
  isPublic: boolean;
}

export default DocumentInterface;