<template>
  <div>
    <a-tooltip placement="top">
      <template slot="title">
        <span>{{ tooltip }}</span>
      </template>
      <a-icon type="info-circle" style="color:#999" />
    </a-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    tooltip: {}
  }
}
</script>
