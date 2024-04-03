<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="header">Products</h1>
    </div>
    <div class="flex justify-between items-center">
      <select name="category" id="category" class="form-input">
        <option value="" disabled selected>Filter By Categories</option>
      </select>
      <div class="flex gap-2">
        <div class="blue-button px-3 py-1">New Product</div>
        <div class="green-button px-3 py-1">Import Products</div>
      </div>
    </div>

    <div>
      <fwb-table hoverable class="box">
        <fwb-table-head>
          <fwb-table-head-cell>ID</fwb-table-head-cell>
          <fwb-table-head-cell>Name</fwb-table-head-cell>
          <fwb-table-head-cell>Category</fwb-table-head-cell>
          <fwb-table-head-cell>Quantity</fwb-table-head-cell>
          <fwb-table-head-cell>Price</fwb-table-head-cell>
          <fwb-table-head-cell>Actions</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row>
            <fwb-table-cell>guuou</fwb-table-cell>
            <fwb-table-cell>uouou</fwb-table-cell>
            <fwb-table-cell>uouou</fwb-table-cell>
            <fwb-table-cell>uouou</fwb-table-cell>
            <fwb-table-cell>GHC 20.00</fwb-table-cell>
            <fwb-table-cell>
              <div class="flex gap-2">
                <div class="flex gap-1 items-center cursor-pointer">
                  <img src="../assets/icons/edit.svg" width="24" alt="" />
                  <p>Edit</p>
                </div>
                <div class="flex gap-1 items-center cursor-pointer text-red-500">
                  <img src="../assets/icons/bin.svg" width="19" alt="" />
                  <p>Delete</p>
                </div>
              </div>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </div>

    <p>pass route parameters for specific product</p>
  </div>
</template>

<script setup>
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from "flowbite-vue";
</script>
