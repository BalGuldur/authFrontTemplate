<template lang="pug">
  v-snackbar(
    :timeout="timeout"
    :color="color"
    :multi-line="mode === 'multi-line'"
    :verical="mode === 'vertical'"
    v-model="showed"
    ) {{ text }}
</template>

<script>
export default {
  data () {
    return {
      showed: true,
      color: 'error',
      mode: 'vertical',
      timeout: 6000,
      text: 'test'
    }
  }
}
</script>
