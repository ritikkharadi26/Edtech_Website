import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Function to parse JSON safely
const safeJsonParse = (data, defaultValue) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return defaultValue;
  }
};

// Retrieve data from localStorage or use default values
const initialCart = localStorage.getItem("cart") ? safeJsonParse(localStorage.getItem("cart"), []) : [];
const initialTotal = localStorage.getItem("total") ? safeJsonParse(localStorage.getItem("total"), 0) : 0;
const initialTotalItems = localStorage.getItem("totalItems") ? safeJsonParse(localStorage.getItem("totalItems"), 0) : 0;

const initialState = {
  cart: initialCart,
  total: initialTotal,
  totalItems: initialTotalItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error("Course present in cart");
        return;
      }

      state.cart.push(course);
      state.totalItems++;
      state.total += parseFloat(course.price);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", state.total);
      localStorage.setItem("totalItems", state.totalItems.toString());
      // Show toast
      toast.success("Course added to cart");
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.totalItems--;
        state.total -= parseFloat(state.cart[index].price);
        state.cart.splice(index, 1);
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", state.total.toString());
        localStorage.setItem("totalItems", state.totalItems.toString());
        // Show toast
        toast.success("Course removed from cart");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Update localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
