import {ChangeEvent, FocusEvent, useContext} from "react";
import useAuth from "../../../hooks/use-auth";
import {DocumentContext} from "../../../contexts/document-context";
import DocumentInterface from "../../../types/interfaces/document";
import DocumentService from "../../../services/document-service";
import Logo from "../../atoms/logo/logo";
import UserDropDown from "../../atoms/user-dropdown/user-dropdown";
import useRandomBackground from "../../../hooks/use-random-background";
import ShareDocument from "../share-document";

const CurrentUsers = () => {
  const {email} = useAuth();
  const {currentUsers} = useContext(DocumentContext);
  const {backgroundColor} = useRandomBackground();
  return (
    <>
      {Array.from(currentUsers)
        .filter((currentUser) => currentUser !== email)
        .map((currentUser) => {
          return (
            <div
              key={currentUser}
              className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full flex-shrink-0 uppercase ring-2`}>
              {currentUser[0]}
            </div>
          );
        })}
    </>
  );
};

const DocumentMenuBar = () => {
  const {accessToken, userID} = useAuth();

  const {
    document,
    saving,
    setDocumentTitle,
    setDocument,
    setSaving,
    setErrors,
  } = useContext(DocumentContext);

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setDocumentTitle(title);
  };

  const handleTitleInputBlur = async (event: FocusEvent<HTMLInputElement>) => {
    if (accessToken === null || document === null) return;

    setSaving(true);

    const title = (event.target as HTMLInputElement).value;
    const updatedDocument = {
      ...document,
      title,
    } as DocumentInterface;
    console.log(saving);
    console.log(document.id);
    console.log(updatedDocument);
    try {
      await DocumentService.update(accessToken, updatedDocument);
    } 
    catch (error) {
      setErrors(["There was an error saving the document. Please try again."]);
    } 
    finally {
      setDocument(updatedDocument);
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-3 pb-1 border-b">
      <div className="w-full flex justify-start items-center overflow-x-hidden md:overflow-visible">
        <div className="flex items-center mr-4">
          <Logo />
        </div>
        <div className="flex flex-col">
          <input
            maxLength={25}
            type="text"
            onBlur={(event) => handleTitleInputBlur(event)}
            onChange={(event) => handleTitleInputChange(event)}
            value={document?.title ? document?.title : ""}
            className="font-medium text-lg px-2 pt-2 py-2"
            name=""
            id=""
            placeholder="Untitled Note"
          />
        </div>
      </div>
      <div className="flex items-center flex-shrink-0 pl-3 gap-x-4">
        {document !== null && document.userID === userID && (
          <ShareDocument/>
        )}
        <div className="flex items-center gap-x-2">
          <CurrentUsers />
          <UserDropDown />
        </div>
      </div>
    </div>
  );
};

export default DocumentMenuBar;