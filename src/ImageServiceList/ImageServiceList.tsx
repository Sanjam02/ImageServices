import React, { useState, useEffect } from "react";
import "@esri/calcite-components/dist/components/calcite-pick-list";
import "@esri/calcite-components/dist/components/calcite-pick-list-item";
import {
  CalcitePickList,
  CalcitePickListItem,
} from "@esri/calcite-components-react";
import "./ImageServiceList.scss";

interface ServiceListProps {
  onServiceSelect: (serviceName: string, folderName: string) => void;
  onFolderSelect: (folderName: string) => void;
}

interface ServiceProps {
  name: string;
  type: string;
}

const ImageServiceList: React.FC<ServiceListProps> = ({ onServiceSelect }) => {
  const [services, setServices] = useState<Array<string>>([]);
  const [folders, setFolders] = useState<Array<string>>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");

  const fetchData = async (selectedFolder: string) => {
    const baseURL =
      "https://sampleserver6.arcgisonline.com/arcgis/rest/services";
    const fetchURL = selectedFolder
      ? `${baseURL}/${selectedFolder}?f=pjson`
      : `${baseURL}?f=pjson`;

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        const imageServices = data.services
          .filter((service: ServiceProps) => service.type === "ImageServer")
          .map((service: ServiceProps) => service.name);

        setServices(imageServices);
        if (!selectedFolder) {
          setFolders(data.folders);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  };

  useEffect(() => {
    fetchData("");
  }, []);

  const handleFolderSelect = (folderName: string) => {
    setSelectedFolderName(folderName);
    fetchData(folderName);
  };

  return (
    <div className="imageServiceList">
      <h2>Folders</h2>
      <CalcitePickList>
        {folders.map((folder) => (
          <CalcitePickListItem
            key={folder}
            label={folder}
            onClick={() => handleFolderSelect(folder)}
            value={folder}
          ></CalcitePickListItem>
        ))}
      </CalcitePickList>
      <h2>Services</h2>
      <CalcitePickList>
        {services.length > 0 ? (
          services.map((service) => (
            <CalcitePickListItem
              key={service}
              label={service}
              onClick={() => onServiceSelect(service, selectedFolderName)}
              value={service}
            ></CalcitePickListItem>
          ))
        ) : (
          <p>No services found in this folder with ImageServer Type found</p>
        )}
      </CalcitePickList>
    </div>
  );
};

export default ImageServiceList;

