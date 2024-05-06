import React, { useState, useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

const Employees = () => {
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://simobile.singapoly.com/api/division-department');
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

  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Department" />
      <GridComponent
        dataSource={dataSource}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          <ColumnDirective field="id_division_target" headerText="Division Target ID" width="150" />
          <ColumnDirective field="division_target" headerText="Division Target" width="150" />
          <ColumnDirective field="division_department_name" headerText="Department Name" width="150" />
          <ColumnDirective field="created_at" headerText="Created At" width="150" />
          <ColumnDirective field="updated_at" headerText="Updated At" width="150" />
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
