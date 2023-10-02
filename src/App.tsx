import React, { useState } from "react";
import ImageServiceList from "./ImageServiceList/ImageServiceList";
import ServiceDetails from "./ServiceDetails/ServiceDetail";
import "./App.scss";

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");

  return (
    <div className="appContainer">
      <h1 className="mainHeader">Image Services List</h1>
      <div className="serviceContainer">
        <ImageServiceList
          onServiceSelect={setSelectedService}
          onFolderSelect={setSelectedFolderName}
        />
        {selectedService && (
          <ServiceDetails
            selectedServiceName={selectedService}
            folderName={selectedFolderName}
          />
        )}
      </div>
    </div>
  );
};

export default App;