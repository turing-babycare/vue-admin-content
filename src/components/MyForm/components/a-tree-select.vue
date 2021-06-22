<template>
  <div>
    <a-tree-select
      v-model="tree_val"
      show-search
      treeNodeFilterProp="title"
      treeNodeLabelProp="title"
      style="width: 300px"
      @change="change"
      allow-clear
      :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
      multiple
      tree-checkable
      tree-default-expand-all
      :placeholder="item.holder || '请选择'"
      :replaceFields="
        item.replaceFields || {
          title: 'label',
          key: 'key',
          value: 'value',
          children: 'children'
        }
      "
      :tree-data="item.options"
    >
    </a-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tree_val: undefined
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
        this.tree_val = val;
      }
    }
  },
  methods: {
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.tree_val
      };
      this.$emit("getVal", params);
    }
  }
};
</script>
