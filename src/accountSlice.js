import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currBalance: 0,
  incomes: [],
  expenses: [],
  totalIncome: 0,
  totalExpense: 0,
};

const calcTotalIncome = (incomes) => {
  return incomes.reduce((acc, curr) => acc + curr.amount, 0);
};

const calcTotalExpense = (expenses) => {
  return expenses.reduce((acc, curr) => acc + curr.amount, 0);
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    addIncome(state, action) {
      state.incomes = [...state.incomes, action.payload];
      state.totalIncome = calcTotalIncome(state.incomes);
      state.currBalance = state.totalIncome - state.totalExpense;
    },
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
      state.totalExpense = calcTotalExpense(state.expenses);
      state.currBalance = state.totalIncome - state.totalExpense;
    },
  },
});

export const { addIncome, addExpense } = accountSlice.actions;
export default accountSlice.reducer;
