<template>
  <h3>Add new transaction</h3>
  <FormKit type="form"
           :config="{
      validationVisibility: 'submit'
             }"
           :submit-attrs="{
        inputClass: 'btn'
    }" submit-label="Add transaction" @submit="onSubmit">
    <FormKit validation="required" label="Text" name="text" placeholder="Enter text..."/>
    <FormKit
        validation="required"
        label="Amount" name="amount"
        help="negative -expense || positive +income"
        type="number"
        suffix-icon="dollar"
        placeholder="Enter amount..."/>

  </FormKit>
</template>
<script setup>

// Emits
const emit = defineEmits(['transactionSubmitted'])
// Function
const onSubmit = async (data, node) => {
  const transactionData = {
    text: data.text,
    amount: parseInt(data.amount)
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      emit('transactionSubmitted', transactionData)
      resolve()
    }, 800)
  })
}
</script>
