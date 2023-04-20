import { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../App.css";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FormModal, DetailModal, FormModalEdit, DeleteModal } from "../components/modals";
import axios from "axios";
import { TableContext } from "../context/TableContext";

const Table = () => {
  const {
    id,

    openAdd,
    setOpenAdd,
    openDelete,
    setOpenDelete,
    openEdit,
    setOpenEdit,
    openDetail,
    setOpenDetail,
    selectedData,
    setSelectedData,

    handleSave,
    handleSaveEdit,
    handleDetail,
    columns,
    handleClickDelete,
    rows,
    setRows,
  } = useContext(TableContext);

  return (
    <div style={{ height: 400, width: "55rem" }}>
      <Button
        style={{ width: "100%", marginBottom: "1rem" }}
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpenAdd(true)}
      >
        Tambah user
      </Button>

      <DataGrid
        style={{ backgroundColor: "white", margin: "auto" }}
        rows={rows}
        columns={columns}
        hideFooter={true}
      />
      <FormModal
        judul={"Tambah User"}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        handleCloseForm={handleSave}
      />
      <FormModalEdit
        judul={"Edit User"}
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleCloseForm={handleSaveEdit}
        id={id}
      />
      <DeleteModal open={openDelete} handleClose={() => setOpenDelete(false)} />
      <DetailModal open={openDetail} handleClose={() => setOpenDetail(false)} data={selectedData} />
    </div>
  );
};

export default Table;
