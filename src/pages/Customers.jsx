import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import { customersGrid } from '../data/dummy';


const Customers = () => {
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://simobile.singapoly.com/api/trpl/customer-service');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDataSource(data.datas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={dataSource}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          <ColumnDirective field="id_customer_service" headerText="Customer Service ID" width="150" />
          <ColumnDirective field="nim" headerText="NIM" width="150" />
          <ColumnDirective field="title_issues" headerText="Title Issues" width="150" />
          <ColumnDirective field="description_issues" headerText="Description Issues" width="150" />
          <ColumnDirective field="rating" headerText="Rating" width="150" />
          <ColumnDirective field="image_url" headerText="Image URL" width="150" />
          <ColumnDirective field="created_at" headerText="Created At" width="150" />
          <ColumnDirective field="updated_at" headerText="Updated At" width="150" />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
