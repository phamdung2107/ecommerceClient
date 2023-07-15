import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails } from "../../actions/OrderAction";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
import { clearMyOrderErrors } from "../../redux/order/myOrdersReducer";
import { ToastContainer, toast } from "react-toastify";

const MyOrderDetails = () => {
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMyOrderErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
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
                      `${order.shippingInfo.address}, ${order.shippingInfo.state}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  ></p>
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
                  <span>$ {order.totalPrice && order.totalPrice}</span>
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

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.Offer}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.Offer}`}>
                        {item.name}
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
        </>
      )}
      <BottomTab />
    </>
  );
};

export default MyOrderDetails;
