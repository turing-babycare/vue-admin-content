<template>
  <div>
    <div class="row">
      <div class="label">包含：</div>
      <a-tree-select
        v-model="include_tag"
        labelInValue
        show-search
        style="width: 300px"
        allow-cleari
        :filterTreeNode="filterTreeNode"
        :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
        tree-checkable
        placeholder="请选择包含的企业微信标签"
        :replaceFields="item.replaceFields"
        :tree-data="includeFilterOption"
        @change="onChange"
      >
      </a-tree-select>
    </div>
    <div class="row">
      <div class="label">不包含：</div>
      <a-tree-select
        v-model="not_include_tag"
        labelInValue
        show-search
        style="width: 300px"
        allow-cleari
        :filterTreeNode="filterTreeNode"
        :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
        tree-checkable
        placeholder="请选择不包含的企业微信标签"
        :replaceFields="item.replaceFields"
        :tree-data="notIncludeFilterOption"
        @change="onChange"
      >
      </a-tree-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default() {
        return {}
      }
    },
    tagData: {
      default() {
        return {}
      }
    }
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      async handler(v) {
        if (v && v.getOptions) {
          this.option = await v.getOptions()
        }
      }
    },
    tagData: {
      immediate: true,
      deep: true,
      handler(v) {
        if (v && v.value) {
          this.include_tag = v.value.tag_contain || []
          this.not_include_tag = v.value.tag_no_contain || []
        }
      }
    }
  },
  computed: {
    includeFilterOption() {
      const res = this._.cloneDeep(this.option).filter((item) => {
        item.tag = item.tag.filter((child) => {
          return (
            this.not_include_tag.findIndex((i) => i.value === child.id) <= -1
          )
        })
        return item.tag.filter((child) => {
          return (
            this.not_include_tag.findIndex((i) => i.value === child.id) <= -1
          )
        }).length
      })
      return res
    },
    notIncludeFilterOption() {
      const res = this._.cloneDeep(this.option).filter((item) => {
        item.tag = item.tag.filter((child) => {
          return this.include_tag.findIndex((i) => i.value === child.id) <= -1
        })
        return item.tag.filter((child) => {
          return this.include_tag.findIndex((i) => i.value === child.id) <= -1
        }).length
      })
      return res
    }
  },
  data() {
    return {
      option: [],
      include_tag: [],
      not_include_tag: []
    }
  },
  methods: {
    filterTreeNode(input, option) {
      return (
        option.data.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    onChange() {
      this.$emit('onChange', {
        type: this.item.value,
        key: this.item.value,
        value: {
          tag_contain: this.include_tag,
          tag_no_contain: this.not_include_tag
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  .label {
    margin-right: 20px;
    width: 70px;
  }
}
.row + .row {
  margin-top: 20px;
}
</style>
