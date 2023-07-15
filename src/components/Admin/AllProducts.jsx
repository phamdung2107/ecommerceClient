import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getAdminProduct } from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../../more/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import {
  clearDeleteProductErrors,
  deleteProductReset,
} from "../../redux/product/deleteProductReducer";
import { clearProductErrors } from "../../redux/product/productReducer";

const AllProducts = () => {
  const history = useNavigate();

  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearProductErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearDeleteProductErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      history("/dashboard");
      dispatch(deleteProductReset());
    }
    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted, history]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/edit/product/${id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default AllProducts;
