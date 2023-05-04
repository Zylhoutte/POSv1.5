import { DataGrid, GridToolbar } from '@mui/x-data-grid';
 
  
  const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props;
    return (
      <DataGrid
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridToolbar onClick={hideMenu} column={currentColumn} />
      </DataGrid>
    );
  };
  
  export default CustomColumnMenu;
  