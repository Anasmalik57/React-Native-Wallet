// react custom hook file

import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = "http://192.168.31.171:5001/api";
// const API_URL = "https://react-native-wallet-560t.onrender.com/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // ====================================
  // usecallback is used for performance reasons, it will memoize the function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("🔴 Error fetching transactions: ==> ", error);
    }
  }, [userId]);

  // ==========================================
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("🔴 Error fetching Summary: ==> ", error);
    }
  }, [userId]);
  // ==========================================
  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      // these functions can be run in parallel || we can await them one by one also
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("🔴 Error loading Data: ==> ", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  // ==============================================
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");

      // refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("🔴 Error Deleting Transaction: ==> ", error);
      Alert.alert("Error", error.message);
    }
  };
  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
