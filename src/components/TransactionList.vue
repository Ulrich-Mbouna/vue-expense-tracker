<template>
<h3>History</h3>
<ul id="list" class="list" v-auto-animate>
    <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount <= 0 ? 'minus' : 'plus'">
        {{ transaction.text }}
        <span>${{ transaction.amount }}</span>
        <button v-auto-animate @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>

</ul>
</template>
<script setup>

// Emits
const emit = defineEmits(['transactionDeleted'])
const props = defineProps({
    transactions: {
        type: Array,
        required: true
    }
})

const deleteTransaction = (transactionId) => {
  emit('transactionDeleted', transactionId)
}
</script>
