import React from "react";
import AccessoriesTable from "./AccessoriesTable";
import FramesTable from "./FramesTable";
import GlassesTable from "./GlassesTable";
import LensesTable from "./LensesTable";
import OrdersTable from "./OrdersTable";
import ProviderTable from "./ProviderTable";
const AddRecord = ({ show, onHide, tableName }) => {
  return tableName === "accessories" ? (
    <AccessoriesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "providers" ? (
    <ProviderTable data={null} show={show} onHide={onHide} />
  ) : tableName === "frames" ? (
    <FramesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "glasses" ? (
    <GlassesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "lenses" ? (
    <LensesTable data={null} show={show} onHide={onHide} />
  ) : tableName === "orders" ? (
    <OrdersTable data={null} show={show} onHide={onHide} />
  ) : (
    ""
  );
};
export default AddRecord;
