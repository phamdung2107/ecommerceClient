import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../more/Metadata";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import SideBar from "./Sidebar";
import { getOrderDetails, updateOrder } from "../../actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
import "./UpdateOrder.css";
import { ToastContainer, toast } from "react-toastify";
import { clearMyOrderErrors } from "../../redux/order/myOrdersReducer";
import {
  clearOrderErrors,
  updateOrderReset,
} from "../../redux/order/orderReducer";

const UpdateOrder = () => {
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteOrder
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
    navigate("/admin/orders");
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMyOrderErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearOrderErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch(updateOrderReset());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.city}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        style={{
                          color: "green",
                        }}
                      >
                        PAID
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>${order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.productId}>
                          <img src={item.productImage} alt="Product" />
                          <Link to={`/product/${item.productId}`}>
                            {item.productName}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ${item.productPrice} ={" "}
                            <b>${item.productPrice * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
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

export default UpdateOrder;
