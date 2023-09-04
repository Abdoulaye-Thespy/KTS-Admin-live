import React, {useState, useEffect} from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

import { API } from 'aws-amplify';

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  const [students, setStudents] = useState([]);
  const apiName = 'ktsAPI'; // replace this with your api name.
  const student_id = 'KTS-P-666666666';
  const path = `/students`;
  const myInit = {
       // body: {
       //  student_id: "KTS-S-111111222",
       //  parent_id: "KTS-P-777777777",
       //  transportPlan: "Aller et Retour",
       //  parentName: "Abdoulaye",
       //  Adress: {
       //    Quartier: "Logpom",
       //    Zone: "Carrefour Basson",
       //  },
       //  class: "SIL",
       //  school: "Russian School",
       //  pTime: "6h00",
       //  dTime: "6h00",

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
          setStudents(response.data);
          console.log("success");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
  },[]);

   const customizeCell = (args) => {
        if (args.column.field === "Adress"
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
              return `<li>${label}: ${item}</li>`;
            }).join("");
            args.cell.innerHTML = `<ul>${addressList}</ul>`;

        }
    };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="STATS" title="Students" />
      <GridComponent
        dataSource={students}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        queryCellInfo={customizeCell}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => {
            return(
               <ColumnDirective key={index} {...item} />
              )
          }
          )}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
