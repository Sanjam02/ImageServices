import React, { useState, useEffect } from "react";
import "@esri/calcite-components/dist/components/calcite-button";
import "./ServiceDetails.scss";

interface ServiceDetailsProps {
  selectedServiceName: string | null;
  folderName: string;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  selectedServiceName,
  folderName,
}) => {
  const [selectedServiceDetail, setSelectedServiceDetail] = useState({
    name: "",
    description: "",
    extent: {
      xmin: null,
      ymin: null,
      xmax: null,
      ymax: null,
    },
  });
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (selectedServiceName) {
      fetch(
        `https://sampleserver6.arcgisonline.com/arcgis/rest/services/${folderName}/${selectedServiceName}/ImageServer?f=pjson`
      )
        .then((response) => response.json())
        .then((data) => {
          setSelectedServiceDetail(data);
          const extent = data.fullExtent;
          const bbox = `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax}`;
          const imageUrl = `https://sampleserver6.arcgisonline.com/arcgis/rest/services/${folderName}/${selectedServiceName}/ImageServer/exportImage?bbox=${bbox}&size=400,400&f=image`;
          setImageUrl(imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching image or details:", error);
        });
    }
  }, [selectedServiceName, folderName]);

  const htmlToPlainText = (html: string) => {
    const description = new DOMParser().parseFromString(html, "text/html");
    return description.body.textContent || "No description available.";
  };

  return (
    <div className="serviceDetails">
      {selectedServiceDetail && (
        <div className="serviceDetails">
          <>
            <h2>{selectedServiceDetail.name}</h2>
            <p>{htmlToPlainText(selectedServiceDetail.description)}</p>
            <img
              src={imageUrl}
              alt={`${selectedServiceDetail.name} full extent`}
            />
          </>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;