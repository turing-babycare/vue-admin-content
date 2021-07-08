<template>
  <div>
    <a-button
      :type="item.type"
      :disabled="item.disabled"
      :icon="item.icon"
      :loading="item.loading"
      :size="item.size"
      @click="click(item.fun)"
    >
      {{ item.text }}
    </a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    click(val) {
      this.$emit('btnClick', val)
    }
  }
}
</script>
