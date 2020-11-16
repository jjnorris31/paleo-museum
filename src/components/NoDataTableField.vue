<template>
  <td v-if="field !== null">{{field}}</td>
  <td v-else class="font-italic">Sin datos</td>
</template>

<script>
export default {
name: "NoDataTableField",
  props: ['field']
}
</script>

<style scoped>

</style>