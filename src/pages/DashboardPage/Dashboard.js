import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import CreateFolder from "../../components/DashboardPageComponents/createFolder/CreateFolder";
import Home from "../../components/DashboardPageComponents/HomeComponents/Home";
import { Navbar } from "../../components/DashboardPageComponents/Navbar/Navbar";
import SubBar from "../../components/DashboardPageComponents/SubBar/SubBar";
import FolderComponent from "../../components/DashboardPageComponents/FolderComponent/FolderComponent";
import FileComponent from "../../components/DashboardPageComponents/FileComponent/FileComponent";
import UploadFile from "../../components/DashboardPageComponents/uploadFile/UploadFile";
import CreateFile from "../../components/DashboardPageComponents/createFile/CreateFile";
import {
  getFiles,
  getFolders,
} from "../../redux/actioncCreators/fileFolderActionCreator";

const Dashboard = () => {
  const [isCreatedFolderModalOpen, setIsCreatedFolderModalOpen] =
    useState(false);
  const [isCreatedFileModalOpen, setIsCreatedFileModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();

  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.fileFolders.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading, userId, dispatch]);

  useEffect(() => {
    if (pathname.includes("/file/")) {
      setShowSubBar(false);
    } else {
      setShowSubBar(true);
    }
  }, [pathname]);

  return (
    <>
      {isCreatedFolderModalOpen && (
        <CreateFolder
          isCreatedFolderModalOpen={isCreatedFolderModalOpen}
          setIsCreatedFolderModalOpen={setIsCreatedFolderModalOpen}
        />
      )}
      {isFileUploadModalOpen && (
        <UploadFile
          isFileUploadModalOpen={isFileUploadModalOpen}
          setIsFileUploadModalOpen={setIsFileUploadModalOpen}
        />
      )}
      {isCreatedFileModalOpen && (
        <CreateFile
          isCreatedFileModalOpen={isCreatedFileModalOpen}
          setIsCreatedFileModalOpen={setIsCreatedFileModalOpen}
        />
      )}
      <Navbar />
      {showSubBar && (
        <SubBar
          setIsCreatedFolderModalOpen={setIsCreatedFolderModalOpen}
          setIsCreatedFileModalOpen={setIsCreatedFileModalOpen}
          setIsFileUploadModalOpen={setIsFileUploadModalOpen}
          setSearchTerm={setSearchTerm}
        />
      )}
      <Routes>
        <Route path="" element={<Home searchTerm={searchTerm} />} />
        <Route path="folder/:folderId" element={<FolderComponent />} />
        <Route path="file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  );
};

export default Dashboard;
