import {
  DetailsView,
  FileManagerComponent,
  NavigationPane,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-filemanager";
import { registerLicense } from "@syncfusion/ej2-base";
import React, { Component } from "react";
import "../../../public/styles/Finder.css";
// let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
registerLicense(
  "ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5Wd0JjXnxfcHZcTmZf"
);
// let hostUrl = "http://localhost:8090/";
const hostUrl = import.meta.env.VITE_FILE_URL;

class Finder extends Component {
  render() {
    return (
      <div className="control-section w-100 h-100">
        <FileManagerComponent
          id="file"
          ajaxSettings={{
            url: hostUrl,
            downloadUrl: hostUrl + "Download",
            uploadUrl: hostUrl + "Upload",
            getImageUrl: hostUrl + "GetImage",
          }}
          navigationPaneSettings={{
            maxWidth: "850px",
            minWidth: "140px",
            visible: true,
          }}
        >
          <Inject services={[NavigationPane, DetailsView, Toolbar]} />
        </FileManagerComponent>
      </div>
    );
  }
}

export default Finder;
