import { createContext } from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../App.css";
import { Delete, Edit, Visibility, Add } from "@mui/icons-material";

import axios from "axios";
import { Box, Button, Modal, Typography } from "@mui/material";

export const TableContext = createContext(null);

export const TableContextProvider = (props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [rows, setRows] = useState([]);
  const [id, setId] = useState();
  const handleSave = async () => {
    await fetchData();
    setOpenAdd(false);
  };
  const handleSaveEdit = async () => {
    await fetchData();
    setOpenEdit(false);
  };

  const handleDetail = (data) => {
    setSelectedData(data);
    setOpenDetail(true);
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://cms-admin-v2.ihsansolusi.co.id/testapi/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRows(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`berhasil di delete ${id} `);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickDelete = async (id) => {
    const response = await deleteData(id);
    await fetchData();
    console.log(response);
  };
  let num = 1;
  const columns = [
    {
      field: "id",
      headerName: "No",
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      sortable: false,
      renderCell: (params) => {
        return <span>{num}</span>;
      },
    },
    {
      field: "name",
      headerName: "Nama",
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Alamat",
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      sortable: false,
    },
    {
      field: "gender",
      headerName: "P/W",
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      sortable: false,
      renderCell: (params) => <>{params.row.gender == "p" ? "Wanita" : "Pria"}</>,
    },
    {
      field: "born_date",
      headerName: "Tanggal Lahir",
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const bornDate = new Date(params.row.born_date);
        const formattedDate = bornDate
          .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
          .replace(",", "");
        return <>{formattedDate}</>;
      },
    },
    {
      field: "created_at",
      headerName: "Tanggal Input",
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const bornDate = new Date(params.row.created_at);
        const formattedDate = bornDate
          .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
          .replace(",", "");
        const formattedTime = bornDate.toLocaleTimeString("en-US", { hour12: false });
        const formattedTimeWithoutSeconds = formattedTime.slice(0, -3);
        return (
          <>
            {formattedDate} {formattedTimeWithoutSeconds}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      disableColumnFilter: true,
      disableColumnMenu: true,
      disableColumnSort: true,
      sortable: false,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }}>
          <Visibility onClick={() => handleDetail(params.row)} />
          <Edit
            onClick={() => {
              setOpenEdit(true);
              setId(params.row.id);
            }}
          />
          <Delete onClick={() => handleClickDelete(params.row.id)} />
        </div>
      ),
    },
  ];

  return (
    <TableContext.Provider
      value={{
        columns,
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
        rows,
        setRows,
        handleSave,
        handleSaveEdit,
        handleDetail,
        fetchData,
        deleteData,
        handleClickDelete,
        id,
        setId,
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
};
