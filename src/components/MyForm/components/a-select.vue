<template>
  <div>
    <a-select
      style="width: 300px"
      v-model="select_val"
      :mode="item.mode || 'default'"
      allowClear
      :showSearch="item.showSearch || false"
      :filterOption="filterOption"
      :disabled="item.disabled"
      :placeholder="item.holder || '请选择'"
      @change="change"
    >
      <a-select-option
        v-for="(iitem, ind) in item.options"
        :key="ind + '_option'"
        :value="iitem.value || iitem._id || iitem.id || iitem.name"
      >
        {{ iitem.label || iitem.name }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      select_val: undefined
    };
  },
  computed: {
    value() {
      const res = this.item.options.find(
        i => (i.value || i._id || i.id || i.name) == this.select_val
      );

      if (!res) return undefined;
      return res.label || res.name;
    }
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
        this.select_val = val;
      }
    }
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.select_val
      };
      this.$emit("getVal", params);
    }
  }
};
</script>
