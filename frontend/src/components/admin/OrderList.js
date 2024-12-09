import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
  updateOrder,
} from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { FiRefreshCcw } from "react-icons/fi";
import axios from "axios";
import "./orderlist.css";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <p style={{ marginBottom: "20px" }}>{message}</p>
        <Button
          onClick={onConfirm}
          style={{
            backgroundColor: "#dc3545",
            border: "none",
            marginRight: "10px",
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          style={{ backgroundColor: "#6c757d", border: "none" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default function OrderList() {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();
  const [refunding, setRefunding] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    message: "",
    onConfirm: null,
  });

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "noOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    adminOrders.forEach((order) => {
      data.rows.push({
        id: order._id,
        noOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: (
          <p
            style={{
              color: order.orderStatus.includes("Processing") ? "red" : "green",
            }}
          >
            {order.orderStatus}
          </p>
        ),
        actions: (
          <Fragment>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={() => showDeleteConfirmation(order._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>

            {order.paymentInfo.id !== "COD" &&
              order.paymentInfo.status !== "Refunded" &&
              order.orderStatus !== "Delivered" && (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => showRefundConfirmation(order)}
                  className="text-yellow-600 hover:text-yellow-900"
                  disabled={refunding[order._id]}
                >
                  <FiRefreshCcw className="inline-block mr-1" />
                  {refunding[order._id] ? "Refunding..." : "Refund"}
                </button>
              )}
          </Fragment>
        ),
      });
    });

    return data;
  };

  const showDeleteConfirmation = (id) => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to delete this order?",
      onConfirm: () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        dispatch(deleteOrder(id));
      },
    });
  };

  const showRefundConfirmation = (order) => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to refund this order?",
      onConfirm: () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        refundHandler(order);
      },
    });
  };

  const refundHandler = async (order) => {
    setRefunding({ ...refunding, [order._id]: true });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/refund",
        { paymentIntentId: order.paymentInfo.id },
        config
      );
      if (data.success) {
        toast("Refund processed successfully", {
          type: "success",
          position: toast.POSITION.BOTTOM_CENTER,
        });

        dispatch(updateOrder(order._id, { status: "Refunded" }));
        dispatch(adminOrdersAction);
      }
    } catch (error) {
      toast(error.response?.data?.message || "Refund failed", {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    setRefunding({ ...refunding, [order._id]: false });
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isOrderDeleted) {
      toast("Order Deleted Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderDeleted()),
      });
      return;
    }

    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Order List</h1>
        <div className="table-responsive">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                bordered
                striped
                hover
                responsive
                className="px-3"
              />
            )}
          </Fragment>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
      />
    </div>
  );
}

