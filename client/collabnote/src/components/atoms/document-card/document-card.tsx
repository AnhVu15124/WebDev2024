import {useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/use-auth";
import DocumentInterface from "../../../types/interfaces/document";
import {MouseEvent} from "react";
import DocumentMenuButton from "../document-menu-button/document-menu-button";

interface DocumentCardProps {
  document: DocumentInterface;
  setDocuments: Function;
}

const DocumentCard = ({ document, setDocuments }: DocumentCardProps) => {
  const {userID} = useAuth();
  const navigate = useNavigate();

  const handleDocumentBtnClick = (
    event: MouseEvent<HTMLDivElement>,
    documentID: number
  ) => {
    const classList = (event.target as HTMLDivElement).classList;
    if (!classList.contains(`document-menu-btn-${documentID}`) && !classList.contains("document-menu")) {
      navigate(`/document/${documentID}`);
    }
  };

  const skeleton = (
    <>
      {Array.from({ length: 18 }, (x, i) => i).map((i) => {
        return (
          <div
            key={i}
            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
            className="h-1 bg-gray-200"
          ></div>
        );
      })}
    </>
  );

  return (
    <div
      onClick={(event) => handleDocumentBtnClick(event, document.id)}
      key={document.id}
      className="text-left cursor-pointer">
      <div className="h-80 w-full border flex flex-col justify-between hover:border-blue-500 rounded">
        <div className="w-full h-full p-4 flex flex-col space-y-2">
          {skeleton}
        </div>
        <div className="w-full h-24 border-t p-3">
          <h6 className="text-sm max-w-full truncate">{document.title}</h6>
          <div className="flex items-center justify-between">
            <div className="relative flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24">
                <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAU9JREFUSEtjZKAxYMRm/rmb9/T//2f4b6yhdAkkTyof2UwMCzy3/WdPEHm86udfBq4F94T2gBQnKL1zAdH4+OzMDN8WvJEN2+7F+BOvBc5Lv66x4HsbDFJ0/JMwWK0l31swTZD/WXjNvijuULwWOC758pP5x2c2xv8MDH+5+MBqmb5/YiCG/4eT99f+GB52vBY4Lf36n5J43xfNjRLsGHFAVwtePnjGwMhA2ENiCtJwT5PkA5pb8OrBU4LR8Z+BkUFcQYo8H9DVAi4BPgYeAV6CPiIpDpB9QBMLCDoXiwKSfEBzCy4fOI3XDlDqQc4DIMWD3wewNA/KhDCg62BKXj6gSRyAimtGRkY2cgz//+//z/2xPBz4i+tlX1cz/GcIIccCBob/q/dF84QRrDJ/vPsWzcjIqEaSJYz/brILcC8jWGWSZCgRirG2KojQR7QSAAWhyRkzar5oAAAAAElFTkSuQmCC" x="0" y="0" width="24" height="24"/>
              </svg>
              <p className="text-xs text-gray-400 relative right-2">
                {new Date(document.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            {document.userID === userID && (
              <DocumentMenuButton
                documentID={document.id}
                setDocuments={setDocuments}/>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;