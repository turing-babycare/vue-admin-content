<template>
  <div>
    <slot name="form"></slot>
    <div v-if="title" class="table-title">
      {{ title }}
    </div>
    <a-table
      class="my_table"
      :scroll="{ x: '100%' }"
      :loading="loading"
      :align="align"
      :row-selection="
        multiple || radio
          ? {
              type: multiple ? 'checkbox' : 'radio',
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
              getCheckboxProps: getCheckboxProps,
              columnTitle: columnTitle
            }
          : null
      "
      :bordered="bordered"
      :dataSource="dataSource"
      :childrenColumnName="childrenColumnName"
      :pagination="false"
      :expandedRowKeys="expandedRowKeys"
      @expandedRowsChange="expandedRowsChange"
    >
      <template v-for="item in showColumn">
        <a-table-column
          v-if="item.type === 'action'"
          :key="item.key"
          :data-index="item.key"
          :width="item.width"
          :title="item.title"
        >
          <template slot-scope="text, record, index">
            <span v-for="(citem, ind) in operation.btns" :key="'btn_' + ind">
              <a-button
                v-if="
                  !citem.hidden &&
                  setShow(record, citem) &&
                  (citem.key || 'action') === item.key
                "
                :key="index"
                :type="citem.type || 'link'"
                :style="citem.style"
                :title="
                  !!setDisabled(record, citem) && citem.btnTip
                    ? citem.btnTip
                    : ''
                "
                :class="citem.class"
                @click="handle(citem.handle, record, index)"
                :icon="citem.icon"
                :disabled="setDisabled(record, citem)"
                :size="citem.size || 'small'"
                >{{ citem.content }}
              </a-button>
            </span>
          </template>
        </a-table-column>
        <!-- 头像avatar || formatTime -->
        <a-table-column
          v-else-if="
            item.type == 'avatar' ||
            item.type === 'date' ||
            item.type === 'gender'
          "
          :key="item.key"
          :width="item.width"
          :title="item.title"
        >
          <template slot-scope="record">
            <a-avatar
              v-if="item.type == 'avatar'"
              :src="record.avatar"
              alt=""
            />
            <span v-if="item.type === 'date'">
              {{ formatTime(record[item.key]) }}</span
            >
            <span v-if="item.type === 'gender'">{{
              genderOption(record.gender)
            }}</span>
          </template>
        </a-table-column>
        <a-table-column
          v-else-if="item.type == 'slot'"
          :key="item.key"
          :width="item.width"
          :title="item.title"
        >
          <template slot-scope="text, record, index">
            <slot
              :name="item.slotName || item.key"
              v-bind:row="record"
              v-bind:index="index"
            ></slot>
          </template>
        </a-table-column>
        <a-table-column
          v-else
          :key="item.key"
          :width="item.width"
          :title="item.title"
        >
          <!-- :data-index="item.key" -->
          <template slot-scope="record">
            <a-tooltip
              v-if="
                (record[item.key] && record[item.key].length) >
                (item.ellipsis || 25)
              "
              placement="top"
            >
              <template slot="title">
                <div>
                  {{ record[item.key] }}
                </div>
              </template>
              <!-- ellipsis：显示字数 -->
              <div style="display: inline">
                {{ ellipsisTxt(record[item.key], item.ellipsis) }}
              </div>
            </a-tooltip>
            <div v-else style="display: inline">
              {{ record[item.key] }}
            </div>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-pagination
      v-if="page.total"
      v-model="page.currentPage"
      class="margin-top-30 align-center"
      show-quick-jumper
      show-size-changer
      :pageSizeOptions="
        page.pageSizeOptions ? page.pageSizeOptions : ['10', '50', '100']
      "
      :default-current="page.currentPage"
      :show-total="(total) => `共 ${page.total} 条`"
      :total="page.total"
      @change="onChange"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script>
import { ellipsisTxt } from '@/utils/index'
import { genderOption } from '@/utils/dictionary'
export default {
  name: 'WorkPlace',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    radio: {
      type: Boolean,
      default: false
    },
    tableAttr: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cardTitle: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    operation: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: Boolean,
    expandedRowKeys: {
      type: Array,
      default: () => []
    },
    childrenColumnName: {
      default() {
        return 'children'
      }
    },
    columnTitle: {
      type: String,
      default: ' '
    }
  },
  data() {
    return {
      selectedRowKeys: [], // Check here to configure the default column
      checkedRow: {}
    }
  },
  computed: {
    showColumn() {
      return this._.filter(this.columns, function (o) {
        return !o.hidden
      })
    }
  },
  methods: {
    ellipsisTxt,
    genderOption,
    getCheckboxProps(record) {
      return {
        props: {
          disabled: record.checkDisable
        }
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('rowSelectionChange', this.selectedRowKeys)
    },
    onChange(pageNumber) {
      this.$emit('onChange', pageNumber)
    },
    onShowSizeChange(current, pageSize) {
      let val = { current, pageSize }
      this.$emit('sizeChange', val)
    },
    setDisabled(row, btn) {
      var flag = false
      switch (this.operation.nowPage) {
        case 'askTeamTable':
          if (btn.disabled && row.online_status == btn.disabled) {
            flag = true
          }
          break
        default:
          break
      }
      return flag
    },
    setShow(row, btn) {
      var flag = true
      switch (this.operation.nowPage) {
        case 'askServicesTable':
          if (
            (btn.show || btn.show === 0) &&
            row.ask_online_status !== btn.show
          ) {
            flag = false
          }
          break
        case 'askTeamTable':
          if ((btn.show || btn.show === 0) && row.online_status !== btn.show) {
            flag = false
          }
          break
        default:
          break
      }
      return flag
    },
    rowClick(row) {
      this.$emit('rowClick', row)
      this.checkedRow = row && row._id ? row._id : row
    },
    handle(str, row, index) {
      this.rowClick(row)
      row.$index = index
      this.$emit(str, row) // 将事件名字和参数值传递出去，
    },
    expandedRowsChange(expandedRows) {
      this.$emit('expandedRowsChange', expandedRows)
    }
  }
}
</script>
<style lang="scss">
.table-title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #262626;
  margin-bottom: 10px;
}
.my_table {
  background: #fff;
  td {
    white-space: break-spaces;
  }
  .ant-table-thead > tr > th {
    color: #000;
  }
  .ant-btn-link {
    background: transparent;
    border: none;
    &:hover {
      background: transparent;
      border: none;
    }
  }
}
</style>
