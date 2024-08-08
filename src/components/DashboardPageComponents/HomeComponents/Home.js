import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";
import { BallTriangle } from "react-loader-spinner";
import bg from "./bg-icon.jpg";

const Home = ({ searchTerm }) => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.fileFolders.isLoading,
      userFolders: state.fileFolders.userFolders.filter(
        (folder) => folder.data.parent === "root"
      ),
      userFiles: state.fileFolders.userFiles.filter(
        (file) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  const filteredFolders = userFolders.filter((folder) =>
    folder.data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFiles = userFiles.filter((file) =>
    file.data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createdFiles =
    filteredFiles && filteredFiles.filter((file) => file.data.url === null);
  const uploadedFiles =
    filteredFiles && filteredFiles.filter((file) => file.data.data === null);

  return (
    <>
      {isLoading ? (
        <div className="flex align-items-center justify-center mt-5">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#2F58CD"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
          {createdFiles.length === 0 &&
            filteredFolders.length === 0 &&
            uploadedFiles.length === 0 && (
              <div className="w-full flex justify-center items-center">
                <img className="w-[500px]" src={bg} alt="bg" />
              </div>
            )}
          <div className="col-md-12 w-100">
            {filteredFolders.length > 0 && (
              <ShowItems
                title={"Created Folders"}
                items={filteredFolders}
                Type="folder"
              />
            )}

            {createdFiles.length > 0 && (
              <ShowItems
                title={"Created Files"}
                Type="file"
                items={createdFiles}
              />
            )}

            {uploadedFiles.length > 0 && (
              <ShowItems
                title={"Uploaded Files"}
                Type="file"
                items={uploadedFiles}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
