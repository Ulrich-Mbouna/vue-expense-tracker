<template>
<Header />
<div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList @transaction-deleted="handleTransactionDeleted" :transactions="transactions" />
    <AddTransaction @transaction-submitted="handleTransactionSubmitted" />
</div>
</template>
<script setup>
import Header  from "./components/Header.vue";
import Balance  from "./components/Balance.vue";
import IncomeExpenses  from "./components/IncomeExpenses.vue";
import TransactionList  from "./components/TransactionList.vue";
import AddTransaction  from "./components/AddTransaction.vue";
import { ref,computed, onMounted } from "vue";
import {useToast} from "vue-toastification";

//Hooks
onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))

  if(savedTransactions) {
    transactions.value = savedTransactions
  }
})

// Data
const transactions = ref([])

// Initialisation
const toast = useToast()

// Computed
const income = computed(() => {
    return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
        return acc + transaction.amount
    }, 0)
})
const expenses = computed(() => {
    return transactions.value
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount
        }, 0)
})
const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        return acc + transaction.amount
    }, 0)
})

// Functions
const handleTransactionSubmitted = (transactionData) => {
  const isThereSameText = transactions.value.some(transaction => transaction.text === transactionData.text)

  if(isThereSameText) {
    toast.error("You have already register this Expense !!!")
    return
  }
transactions.value.push({
  id: generateUniqueId(),
  text: transactionData.text,
  amount: transactionData.amount
})
  toast.success("Transaction Added!!!")
  saveTransactionsToLocalStorage()
}

const handleTransactionDeleted = (transactionId) => {
  if(transactions.value.length <= 1) {
    toast.error("You cannot delete all the expenses!!!")
    return
  }
  transactions.value = transactions.value.filter(transaction => transaction.id !== transactionId)
  toast.success("Transaction Deleted!!!")
  saveTransactionsToLocalStorage()
}

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1_000_000)
}

const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>
