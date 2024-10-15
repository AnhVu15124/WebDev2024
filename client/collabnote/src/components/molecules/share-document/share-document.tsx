import {ChangeEvent, KeyboardEvent, useContext, useRef, useState} from "react";
  import {DocumentContext} from "../../../contexts/document-context";
  import useAuth from "../../../hooks/use-auth";
  import {ToastContext} from "../../../contexts/toast-context";
  import validator from "validator";
  import PermissionEnum from "../../../types/enums/permission-enum";
  import DocumentUserService from "../../../services/document-user-service";
  import DocumentUser from "../../../types/interfaces/document-user";
  import DocumentInterface from "../../../types/interfaces/document";
  import Modal from "../../atoms/modal/modal";
  import {LinkIcon, UserAddIcon} from "@heroicons/react/outline";
  import SharedUsers from "../shared-users/shared-users";
  import Spinner from "../../atoms/spinner/spinner";

  const ShareDocumentModal = () => {
    const {document, saving, saveDocument, setDocument} =
      useContext(DocumentContext);
    const copyLinkInputRef = useRef<null | HTMLInputElement>(null);
    const [email, setEmail] = useState<null | string>(null);
    const {accessToken} = useAuth();
    const {success, error} = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
  
    const shareDocument = async () => {
      if (email === null || !validator.isEmail(email) || accessToken === null || document === null)
        return;
  
      const payload = {
        documentId: document.id,
        email: email,
        permission: PermissionEnum.EDIT,
      };
  
      setLoading(true);
  
      try {
        const response = await DocumentUserService.create(accessToken, payload);
        const documentUser = response.data as DocumentUser;
        documentUser.user = { email };
  
        success(`Successfully shared document with ${email}`);
  
        setDocument({
          ...document,
          users: [...document.users, documentUser],
        } as DocumentInterface);
        setEmail("");
      } 
      catch (err) {
        error(`Unable to share this document with ${email}. Please try again`);
      } 
      finally {
        setLoading(false);
      }
    };
  
    const handleShareEmailInputChange = (event: ChangeEvent) => {
      setEmail((event.target as HTMLInputElement).value);
    };
  
    const handleCopyLinkBtnClick = () => {
      if (copyLinkInputRef === null || copyLinkInputRef.current === null) return;
  
      let url = window.location.href;
      if (url.includes("localhost")) {
        url = url.replace("localhost", "192.168.1.110");
      }
      copyLinkInputRef.current.value = url;
      copyLinkInputRef.current.focus();
      copyLinkInputRef.current.select();
      window.document.execCommand("copy");
    };
  
    const handleOnKeyPress = async (event: KeyboardEvent) => {
      if (event.key === "Enter") await shareDocument();
    };
  
    const updateIsPublic = (isPublic: boolean) => {
      const updatedDocument = {
        ...document,
        isPublic: isPublic,
      } as DocumentInterface;
  
      saveDocument(updatedDocument);
    };
  
    const handleShareBtnClick = async () => {
      await shareDocument();
    };
  
    const alreadyShared = document === null ||(document !== null && document.users.filter((documentUser) => documentUser.user.email === email).length > 0);
  
    const publicAccessBtn = (
      <div className="space-y-1">
        <button
          disabled={saving}
          onClick={() => updateIsPublic(false)}
          className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md">
          {saving && <Spinner size="sm" />}
          <span className={`${saving && "opacity-0"}`}>
            Change to only shared users
          </span>
        </button>
        <p className="mx-2">
          <b className="font-semibold">Public</b>
          <span className="text-gray-600"> Anyone with this link can view</span>
        </p>
      </div>
    );
  
    const restrictedAccessBtn = (
      <div className="space-y-1">
        <button
          disabled={saving}
          onClick={() => updateIsPublic(true)}
          className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md">
          {saving && <Spinner size="sm" />}
          <span className={`${saving && "opacity-0"}`}>
            Change to anyone with the link
          </span>
        </button>
        <p className="mx-2">
          <b className="font-semibold">Restricted</b>
          <span className="text-gray-600">
            Only people added can open with this link
          </span>
        </p>
      </div>
    );
  
    return (
      <Modal
        button={
          <button className="btn-primary flex items-center space-x-1 bg-blue-500 rounded-lg text-white px-4 py-2 hover:bg-blue-600">
            {document.isPublic ? (
              <>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" viewBox="0 0 20 20" className="mr-1">
                    <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAbBJREFUSEvVlb9LW1EUxz/fpRFHp1YMSiI4FycHp0pB+xdkcJJSEItjN4e6JJsIdhBxkQ79A7QUdHF06D9QbUVM26FLoRTT5ZgbTsIz9b305hf0LC8v58fnfu8971yRMDObBFaBJWAKEPAFeA+8kXSZjI/5HQo1zMxWgG1gNKXAb+ClpP0YQDO2ATKzEvDWFWTVMaAk6V0sTGY2BnyqqwnPYGfAK3+G91mgAsy5/wcwLelnDCyA1oEtTzoHHkv61XZ2YTs/AjP+/5qknVjQB+CpJz2XtHdfAT/Dpu9I0rNY0DfgoScVJIUu+8vMrABcuKNaX9BELKgGPPCknKQ/KaAccOO+mqSRWFDopIZJarV7CuyfY9vzQzN0ndwXRWYWtnOzfi7LwKOYoonYr8ABsJG6VWZW9u+pS8adtEoWKKymWyXti/ueBWqdXT8k/RegQ+CFD+JdYDFLeS+K8pKuQ3EzywNXgwIVJX12UBEIAznVelF0ImnBQcfAk0GBWiMrOV3SYL0oGh4ImPeuO+30rfWkqFPxpD8LVAXGY4plxFaHNVTLWaBwTbz2a6JbZa1r4harlbXHoOriYQAAAABJRU5ErkJggg==" x="0" y="0" width="20" height="20"/>
                </svg>
                <span className="text-lg">Share</span>
              </>
            ) : (
              <>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" viewBox="0 0 20 20" className="mr-1">
                    <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAa5JREFUSEvVlb9LW1EUxz/fpSmOnao0VBLBWZwcOlWEtn9Bhk5FCkVx7OagS7KJ0A4iXcShf4BKoV0cO/QfqFqRpjq4CFKMyzFXTkKMeTfvJU2gZ3m8d358zvfe+84VGc3MngLvgJfAOCDgF7AHfJR03KlkCEptZvYGWAdGEpL+AouSPrX7U4PMrARsu4JYcwaUJH1uDUoFMrNHwM+6mvAM9h1478/wPg1UgBn3nwMTki4asLSgJWDNkw6AKUmXrR2bWVjOH8Ckf1+Q9CEr6Asw50nzkjY7rZ3vYcO3K+lVVtAp8NiTCpLCKbtnZlYADt1RrTf0JCuoBjzwpJyk6wRQDrhyX03Sw6ygcJJuTVJ0X82sY2yqwxA7y2l9iSAzC0u1Wl/z18Bo2oJtcX+ALWA5Bir7v9Ij405aJQYK3fSqpL25sxiouan/QtJ/AdoB3vqQ3QBexJT3oygv6XcobmZ54GRQoKKkIwcVgTBsE60fRd8kzTroK/B8UKDmOGodO0mwfhQNDwQ881O33+1f60tRt+Kt/hioCoxlKRaJrQ5rqJa7XRMrfk30qqx5TdwAxCatxx6ELrsAAAAASUVORK5CYII=" x="0" y="0" width="20" height="20"/>
                </svg>
                <span className="text-lg">Share</span>
              </>
      )}
    </button>
        }
        content={
          document === null ? (<></>) : (
            <div
              onKeyPress={(event) => handleOnKeyPress(event)}
              className="space-y-4 text-sm">
              <div className="rounded-md bg-white shadow-xl p-4 space-y-4">
                <div className="flex items-center space-x-2 m-2">
                  <div className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full text-white">
                    <UserAddIcon className="w-5 h-5 relative" />
                  </div>
                  <h1 className="text-xl font-medium">Share with people</h1>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  value={email !== null ? email : ""}
                  onChange={handleShareEmailInputChange}
                  placeholder="Enter email"
                  className="border-b border-blue-500 rounded-t-md p-4 w-full bg-gray-100 font-medium"/>
                <SharedUsers
                  documentUsers={document.users}
                  setDocument={setDocument}/>
                <div className="w-full flex justify-end space-x-2">
                  <button
                    onClick={handleShareBtnClick}
                    disabled={
                      loading ||
                      email === null ||
                      !validator.isEmail(email) ||
                      alreadyShared
                    }
                    className={`${email === null || !validator.isEmail(email) || alreadyShared? "btn-disabled": "btn-primary"} px-6`}>
                    {loading && <Spinner size="sm" />}
                    <span className={`${loading && "opacity-0"}`}>Share</span>
                  </button>
                </div>
              </div>
              <div className="rounded-md bg-white shadow-xl p-4 space-y-4 flex flex-col">
                <div className="m-2 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-400 flex justify-center items-center rounded-full text-white">
                    <LinkIcon className="w-5 h-5 relative" />
                  </div>
                  <h1 className="text-xl font-medium">Get Link</h1>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      {document.isPublic ? publicAccessBtn : restrictedAccessBtn}
                    </div>
                    <input
                      ref={copyLinkInputRef}
                      type="text"
                      className="d-none opacity-0 cursor-default"/>
                    <button
                      onClick={handleCopyLinkBtnClick}
                      className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md">
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      />
    );
  };
  
  export default ShareDocumentModal;