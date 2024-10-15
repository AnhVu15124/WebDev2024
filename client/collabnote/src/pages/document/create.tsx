import { useState } from "react";
import DocumentCreateHeader from "../../components/organisms/document-create-header/document-create-header";
import useAuth from "../../hooks/use-auth";
import useDocuments from "../../hooks/use-documents";
import useWindowSize from "../../hooks/use-window-size";
import CreateDocumentButton from "../../components/atoms/create-document-button";
import DocumentsList from "../../components/molecules/documents-list/documents-list";
import Spinner from "../../components/atoms/spinner/spinner";
import "../../styles/create-document-style.css";

const Create = () => {
  const {heightStr} = useWindowSize();
  const {userId } = useAuth();
  const {documents, loading, setDocuments} = useDocuments();
  const [activeTab, setActiveTab] = useState("recent");

  const recentDocuments =
    documents === null ? [] : documents.filter((document) => document.userId === userId);

  const sharedDocuments =
    documents === null ? [] : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <CreateDocumentButton />

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "recent" && "active"}`}
          onClick={() => setActiveTab("recent")}>
          {activeTab === "recent" ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20">
            <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAjtJREFUSEu1lk2ITWEYx39/XzuzZEMpQ0JRdrYjZDMzCSVWbDRNGvkaC82sMCKhsZKNWShhFAuytaN81oQiVpZm5+vvPNN7de6559xzqfvWXdzzPuf5PV/v/z2iy0td9k9bgO1FwHZgD7ARWA7MA74Az7Nn9+In6XtVoH8BtsckjTUMbW8DrgCrarL8AByTdLfMLg8wMB4Q2+PA6fTCG+AG8Aj4BPwCVgBbskwOAuuT3QQwKul3HlQExN7TzNlmINI+CVyWFE5blu35wCHgAhDlnJB0og4Q+z+BAUkP8sbO6hj/laVZeN4HPEyQQUnRm7lVlkFjb65cnQDCxvZwZAu8B9ZK+lEHiP0mSFUGCRDlegGsA3ZJut0E6OQ8tAMkyAhwMZu8KUn7ugGIiXoFzEha898AYKmkr8WsbS8GvgGzknqKPYiNMOiRNFsxlhFdRPka6CtC6gAzwOpokqS3FYAlwJMqiO3qEtmeAvYCI5IuVTXddh4yJGmyYWv7SDp0NyXtL5ZoN3ArG7GQhg1VpzdNS0B2SrqWcx5j+jLOQOmYJuWM0qwEhiVd7WR0c4DDQGT+LpW5+aClyAaBO0mHdkiKetcu2yF8IRULksTcb5GKXCTngOMJchSYbCN24XAIOA8sBM5KGs1H1HLh2I4L5UyChG305DrwGPiYXg653gocSDUPEQy5PlUp1yWHZiBF1ltTo6h5XDjTZXZ1V2ak3R91BTYBy5KTz8AzIJxON5TznwG13e3AoOtfFX8AsYfwGZPUj38AAAAASUVORK5CYII=" x="0" y="0" width="20" height="20"/>
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20">
            <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAgVJREFUSEu11UuoTlEUwPHf9ZoxZEIpj4SizEwJmSChxIiJJJH3QIxwRUKMZMJAyasYkKkZ5VlCESNDZt5naX067XvuOTe3b9fpq2+vtf7rvQf0+Qz02b4uwASswAYsxDSMwSc8qf67ld+34RytA45UQvH1znKcw6yOKN9hL242ydUBv3E0IfF7OBVe4jLu4wN+YjqWVpFsxfyUG8TBSu9XHVQC4u5RZWwxIuwDOJtGmxwci204hUhnQPZ3AeL+B1bjbmE1ooxT1m4J7iVkTdZliGBPuWezl646YzhAyOzIaN9iLr6XnpSAuC8hbYBI11PMw7qqNtebQu0aizZA6O7C6arzrmJTPwDRUc/xGnNGA5iCzw3hTsQXfK0imVQC4iIE4iIEmk54F16+QHROCWkFRFizs0ivhgFMxsMWSGuKojAbs1BnWqpdh2zHhZrs7hy6K9hcpmg9rlUtFqthQcv0hl5A1uJizXi06bOcgcY2jVGP1MzIoTnf1bPF/U5E5G8yzUMGLeRjzG/kHlqZ+R4JJxZfrIpxuWLu9JSa3oMT2JeQPZnj2KBNJwxGHU5iPI7nRv0n2wSIB+VYQkIwanIJD/A+NWNdL8OWzHlMeGzSQ23ruvQwtml4NrMjR5HzeHBuN8l1PZkR9qrM6yJMTSMf8TiNhuG/Bf0fwEgK3CrTFcGoAX8AMEFvGYQXlT4AAAAASUVORK5CYII=" x="0" y="0" width="20" height="20"/>
          </svg>
        )}
          Recent Notes
        </button>
        <button
          className={`tab-button ${activeTab === "shared" && "active"}`}
          onClick={() => setActiveTab("shared")}>
          {activeTab === "recent" ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20">
            <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATNJREFUSEu11b0uBUEcBfDfRWg0dD5KjVbrVRBeQKgQcgsfCRXxAgTvotFrtERFoyGCnWQlkzX3btzZ3XJ2cs78zzlzpqPlr9MyvlyCURxgGd+4RhcfvwfPJTjGVkWFE2w3RfCEqQrBc7yWM8Ec7jFSIQikMzkTjGMPGxhLhCTItjMIQZh2CQFgujDzC5d4wUpB+plj8gLOsVie7K4AXsdtXcyrHsSxGy5PNIFVDCHoGxJyU8ayDv/PPUjFLoC846ww9BBvtajRhuoEj6W+MUbQdr7Q/+E/wL1Mbp2gn0SnOMqVKJi8X3ZLMPmqSM8k1poyuZfMjcW0n4+pi3aB1yYuWkwcqmIXmz2qorE2ba3s4mlSsQ5rs4OUXcqfVKwHbtMUQRzr8L/xJ7O2PXJetFrwsOEH2j9DGXNFkeYAAAAASUVORK5CYII=" x="0" y="0" width="20" height="20"/>
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 20 20">
            <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWJJREFUSEu1lT8vBFEUxX8HoaEQlT8lBaXWV0F8AokKkSiIZFUSX4BY30WjpqDdpaKgIeLYm8zKmMzYndnZV7683HPvOeeeJ4Z8NOT6DARgexw4BjYAA03gUNJnt/FBARrAboaFU0l7dQG0gdkMwLOk37vKE9heBO6BsQxAW9J85QlsTwIHwA4wkWOShqT90gC2Y9p1IHif64j5DVwCL8Am8FVZZNurwDmwlnR22ym8Lemml83/aJCx3WjS0TSwBYwAT0A4pCkpbNnzZAHybBdFwtdnwImkt55VUw+yAK2E33SN4HZF0kOZwrki2y4CWJb0WAdAEUUfKYreywDliXyUZEuIfAXMpESOzQ2RryuJXNRZbTb9b/Rk0SI1g8bImli0C+B14EVLA9ueSkVFxHX21JOmtpeAu9rDLjNNnq1bkhZKh12ePrbzbF0tTQsAQoOureNJvV9mPwtX+Ufrp3i8+QFROH8ZbLuL9AAAAABJRU5ErkJggg==" x="0" y="0" width="20" height="20"/>
          </svg>
        )}
          Shared Notes
        </button>
      </div>

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          {activeTab === "recent" && (
            <DocumentsList
              title=""
              documents={recentDocuments}
              setDocuments={setDocuments}
            />
          )}
          {activeTab === "shared" && (
            <DocumentsList
              title=""
              documents={sharedDocuments}
              setDocuments={setDocuments}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Create;
