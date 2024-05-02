import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import axios from 'axios'; // Import axios for making HTTP requests
import { Header } from '../components';

const Orders = () => {
  const [records, setRecords] = useState([]); // State to store fetched records

  const fetchData = async () => {
    try {
      const res = await axios.get('https://simobile.singapoly.com/api/priority-issues'); // Fetch data from API
      setRecords([...records, res.data]); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const editing = { allowDeleting: true, allowEditing: true };
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={records} // Use fetched records as dataSource
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* Define columns here */}
          <ColumnDirective field="id_priority" headerText="Priority ID" width="100" textAlign="Right" />
          <ColumnDirective field="priority_name" headerText="Priority Name" width="150" />
          <ColumnDirective field="created_at" headerText="Created At" width="150" format="dd/MM/yyyy HH:mm:ss" />
          <ColumnDirective field="updated_at" headerText="Updated At" width="150" format="dd/MM/yyyy HH:mm:ss" />
          <ColumnDirective field="delated_at" headerText="DelatedAt" width="150" format="dd/MM/yyyy HH:mm:ss" />
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};

export default Orders;
