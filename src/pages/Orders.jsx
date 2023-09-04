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
  const parent_id = 'KTS-P-666666666';
  const path = `/parents`;
  const myInit = {
       // body: {
       //  parent_id: "KTS-P-777777777",
       //  numberOfKids: 4,
       //  CustomerName: "Karim",
       //  Phone: "671515042",
       //  Childen: {
       //    Child1: "Kamila",
       //    Child2: "Kayra",
       //  },
       //  AP: 100,
       //  AO: 50,
       //  TA: 150,
       //  Adress: {
       //    Quartier: "Logpom",
       //    Zone: "Carrefour Basson",
       //  },
       // },
       headers: { // Allow POST method
        },
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      // queryStringParameters: {
      //  parent_id: '12345678jkkjj' // OPTIONAL
      // }
  };
    useEffect(() => {
      console.log(path);
        API.get(apiName, path, myInit)
        .then((response) => {
          // Add your code here
          setParents(response.data);
          console.log("success");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
  },[]);

       const customizeCell = (args) => {
        if (args.column.field === "Childen"
            && args.data && args.cell) {
            const arr = Object.values(args.data.Childen);
            const chidrenList = arr.map((item, index) => {
       
               let  label = `Child ${index+1}`;
              return `<li>${label}: ${item}</li>`;
            }).join("");
            args.cell.innerHTML = `<ul>${chidrenList}</ul>`;

        }
        else if (args.column.field === "Adress"
            && args.data && args.cell) {
            const arr = Object.values(args.data.Adress);
            const addressList = arr.map((item, index) => {
              let label;
              if (index === 1) {
                label = "Quarter";
              } else if (index === 0) {
                label = "Zone";
              } else {
                label = `Index ${index}`;
              }
              return `<li><b>${label}: </b> ${item}</li>`;
            }).join("");
            args.cell.innerHTML = `<ul>${addressList}</ul>`;
          }
    };


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="STATS" title="Parents" />
      <GridComponent
        id="gridcomp"
        dataSource={parents}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        queryCellInfo={customizeCell}
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
