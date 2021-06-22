<template>
  <div>
    <a-cascader
      style="width: 300px"
      :disabled="item.disabled"
      :placeholder="item.holder || '请选择'"
      v-model="cascader_val"
      :options="item.options || []"
      change-on-select
      :fieldNames="item.fieldNames"
      @change="change"
    >
      <template slot="displayRender" slot-scope="{ labels }">
        <span>{{ labels.join("-") }}</span>
      </template>
    </a-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cascader_val: []
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    item_name: {}
  },
  watch: {
    item_name: {
      immediate: true,
      handler(val) {
        this.cascader_val = val;
      }
    }
  },
  methods: {
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.cascader_val
      };
      this.$emit("getVal", params);
    }
  }
};
</script>
