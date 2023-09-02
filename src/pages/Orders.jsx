import React, {useState, useEffect}from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { API } from 'aws-amplify';

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const [parents, setParents] = useState({});
  const apiName = 'ktsAPI'; // replace this with your api name.
  const parent_id = '12345678jkkjj';
  const path = `/parents/${parent_id}`;
  const myInit = {
      // body: {parent_id: "12345678jkkjj",},
       headers: { // Allow POST method
        },
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {
       parent_id: '12345678jkkjj' // OPTIONAL
      }
  };
    useEffect(() => {
      console.log(path);
        API.get(apiName, path, myInit)
        .then((response) => {
          // Add your code here
          console.log("success");
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
  },[]);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="STATS" title="Parents" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default Orders;
