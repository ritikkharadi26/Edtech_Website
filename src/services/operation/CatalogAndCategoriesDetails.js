import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnectors';
import { catalogData } from '../apis';
import { categories } from '../apis';
import { endpoints } from "../apis"


export const getCatalogaPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});
        // console.log("Catalog page data response", response)
        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

export const getCategoriesData = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("Categories data response", response)

      // Check if the response structure is correct
      if (!response?.data?.success || !response?.data?.categories) {
          throw new Error("Invalid data format or could not fetch categories data");
      }

      result = response?.data;

  } catch (error) {
      console.log("CATEGORIES API ERROR....", error);
      toast.error(error.message);
      result = error.response?.data || { success: false, categories: [], message: error.message };
  }
  toast.dismiss(toastId);
  return result;
};
