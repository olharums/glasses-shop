import React from "react";
import AccessoriesTable from "./AccessoriesTable";
import FramesTable from "./FramesTable";
import GlassesTable from "./GlassesTable";
import LensesTable from "./LensesTable";
import OrdersTable from "./OrdersTable";
import ProviderTable from "./ProviderTable";
const EditRecord = ({ row, show, onHide, tableName }) => {
  return tableName === "accessories" ? (
    <AccessoriesTable edit={true} data={row} show={show} onHide={onHide} />
  ) : tableName === "providers" ? (
    <ProviderTable edit={true} data={row} show={show} onHide={onHide} />
  ) : tableName === "frames" ? (
    <FramesTable edit={true} data={row} show={show} onHide={onHide} />
  ) : tableName === "glasses" ? (
    <GlassesTable edit={true} data={row} show={show} onHide={onHide} />
  ) : tableName === "lenses" ? (
    <LensesTable edit={true} data={row} show={show} onHide={onHide} />
  ) : tableName === "orders" ? (
    <OrdersTable edit={true} data={row} show={show} onHide={onHide} />
  ) : (
    ""
  );
};
export default EditRecord;
