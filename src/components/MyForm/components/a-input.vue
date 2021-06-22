<template>
  <div>
    <a-input
      style="width: 300px"
      :allowClear="item.allowClear"
      :placeholder="item.holder || '请填写'"
      :disabled="item.disabled"
      :maxLength="item.maxLength"
      v-model="input_value"
      @input="change"
    >
      <template #suffix v-if="item.maxLength">
        <div class="input_suffix">
          {{ input_value && input_value.length ? input_value.length : 0 }}
          /
          {{ item.maxLength }}
        </div>
      </template>
    </a-input>
  </div>
</template>

<script>
export default {
  name: "input",
  data() {
    return {
      input_value: ""
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    item_name: {
      type: String,
      default: ""
    }
  },
  watch: {
    item_name: {
      immediate: true,
      handler(val) {
        this.input_value = val;
      }
    }
  },
  methods: {
    change() {
      const params = {
        item_name: this.item.name,
        item_val: this.input_value
      };
      this.$emit("getVal", params);
    }
  }
};
</script>
