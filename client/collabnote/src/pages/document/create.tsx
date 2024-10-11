import DocumentCreateHeader from "../../components/organisms/document-create-header/document-create-header";
import useAuth from "../../hooks/use-auth";
import useDocuments from "../../hooks/use-documents";
import useWindowSize from "../../hooks/use-window-size";
import CreateDocumentButton from "../../components/atoms/create-document-button";

const Create = () => {
    const { heightStr } = useWindowSize();
    const { userID } = useAuth();
    const { documents, loading, setDocuments } = useDocuments();
  
    const recentDocuments =
      documents === null? []: documents.filter((document) => document.userID === userID);

    const sharedDocuments =
      documents === null? []: documents.filter((document) => document.userID !== userID);

    return (
    <div style={{height: heightStr}}>
      <DocumentCreateHeader/>
      <CreateDocumentButton/>
    </div>
    );
};

export default Create;