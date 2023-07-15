import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../../more/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, deleteUser } from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import {
  clearProfileErrors,
  deleteAccountReset,
} from "../../redux/user/profileReducer";
import { clearAllUsersErrors } from "../../redux/user/allUsersReducer";

const AllUsers = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
    history("/dashboard");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearProfileErrors());
    }

    if (isDeleted) {
      toast.success(message);
      history("/admin/users");
      dispatch(deleteAccountReset());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Fragment>
            <Link to={`/admin/user/${id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteUserHandler(id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default AllUsers;
