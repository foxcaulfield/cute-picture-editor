import React from "react";
import Header from "./Header/Header";
import WorkArea from "./WorkArea/WorkArea";
import NavigationBar from "./NavigationBar/NavigationBar";
import EditorToolsBar from "./EditorToolsBar/EditorToolsBar";

const MainScreen = () => {
  return (
    <div>
      <strong>Main screen :)</strong>
      <Header />
      <WorkArea />
      <NavigationBar/>
      <EditorToolsBar/>
    </div>
  );
};

export default MainScreen;
