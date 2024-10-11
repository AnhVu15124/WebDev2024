import DocumentSearchBar from "../../atoms/document-searchbar/document-searchbar";
import UserDropDown from "../../atoms/user-dropdown/user-dropdown";

const DocumentCreateHeader = () => {
  return (
    <div className="w-full px-3 py-1 flex justify-between items-center">
      <h1>Logo</h1>
      <DocumentSearchBar />
      <UserDropDown />
    </div>
  );
};

export default DocumentCreateHeader;