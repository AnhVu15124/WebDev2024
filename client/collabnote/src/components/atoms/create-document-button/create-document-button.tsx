import { lazy, useContext, useState } from "react";
import { ToastContext } from "../../../contexts/toast-context";
import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import DocumentService from "../../../services/document-service";
import DocumentInterface from "../../../types/interfaces/document";
import { PlusIcon } from "@heroicons/react/outline";

const CreateDocumentButton = () => {
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDocumentCreateBtnClick = async () => {
    if (accessToken === null) return;

    setLoading(true);

    try {
      const response = await DocumentService.create(accessToken);
      const { id } = response.data as DocumentInterface;

      navigate(`/document/${id}`);
    } catch (err) {
      error("Unable to create a new note. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-80 bg-gray-100 flex justify-center items-center font-medium text-gray-700 px-4 overflow-hidden">
      <div className="w-full h-full max-w-4xl py-4 space-y-4 overflow-auto">
        <h1>New note</h1>
        <div className="flex items-center">
          <div className="space-y-2">
            <button
              disabled={loading}
              onClick={() => handleDocumentCreateBtnClick()}
              className={`h-52 w-40 bg-white border-2 border-dashed border-blue-500 flex items-center justify-center transition-colors duration-300
                ${loading ? "opacity-50" : "hover:border-blue-700 active:border-blue-800"}`}>
              <span className={`${loading && "opacity-0"}`}>
                <PlusIcon
                  className="w-16 h-16 text-blue-500 transition-colors duration-300 hover:text-blue-700 active:text-blue-800"/>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocumentButton;