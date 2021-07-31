<template>
  <div class="layout">
    <a-table
      style="background: #fff"
      :dataSource="queryArray"
      :columns="columns"
      bordered
      :pagination="false"
    >
      <template #type="text">
        <div>
          {{ originalFilterData.find((i) => i.value === text.key).label }}
        </div>
      </template>
      <template #value="text">
        <div v-if="text.type === 'tag'">
          <div>
            包含：{{
              text.value && text.value.tag_contain
                ? text.value.tag_contain.map((i) => i.label).join(',')
                : '无'
            }}
          </div>
          <div>
            不包含：{{
              text.value && text.value.tag_no_contain
                ? text.value.tag_no_contain.map((i) => i.label).join(',')
                : '无'
            }}
          </div>
        </div>
        <div v-else-if="text.type === 'dateRange'">
          {{ formatTime(text.value[0], '{y}-{m}-{d}') }}至{{
            formatTime(text.value[1], '{y}-{m}-{d}')
          }}
          <div v-if="text.key === 'member_date'">
            {{ getAgeOfMonthStr(text.value[1]) }} ~
            {{ getAgeOfMonthStr(text.value[0]) }}
          </div>
        </div>
        <div v-else-if="text.type === 'age'">
          <span>{{ age_birthday_start }}至{{ age_birthday_end }}</span>
          (<span
            v-for="(item, index) in Object.keys(text.value.age_start)"
            :key="index + 'satart'"
          >
            {{ text.value.age_start[item] }}
            {{ item | ageType }}
          </span>
          <span>~</span>
          <span
            v-for="(item, index) in Object.keys(text.value.age_end)"
            :key="index + 'end'"
          >
            {{ text.value.age_end[item] }}
            {{ item | ageType }} </span
          >)
        </div>
        <div v-else-if="text.type === 'input'">
          {{ text.value }}
        </div>
        <div v-else>
          {{ text.value.map((i) => i.lable || i.label).join(',') }}
        </div>
      </template>
      <template #action="text, record, index">
        <div>
          <a-button type="link" @click="onFilterItemEdit(record, index)">
            编辑
          </a-button>
          <a-button
            type="link"
            style="color: red"
            @click="onFilterItemDelete(index)"
          >
            删除
          </a-button>
        </div>
      </template>
    </a-table>
    <div class="footer">
      <div :class="queryArray.length ? 'show' : 'hide'" v-if="taskShow">
        当前筛选条件下共包含
        <span class="number">{{
          typeof shwoTotal !== 'undefined' ? shwoTotal : total
        }}</span>
        {{
          originalFilterData.find((i) => i.label === '群主')
            ? '个客户群'
            : '名用户'
        }}
      </div>
      <a-button
        v-if="!isEdit"
        v-show="queryArray.length !== originalFilterData.length"
        icon="plus"
        @click="addFilter"
        >添加筛选条件</a-button
      >
      <a-button icon="plus" @click="copy" v-if="taskShow && isEdit"
        >以此条件再次创建任务
      </a-button>
    </div>
    <a-modal
      width="800px"
      v-model="visable"
      title="添加筛选条件"
      :maskClosable="false"
      @ok="onConfirm"
      @cancel="onCancel"
    >
      <div class="row">
        <div class="label">筛选条件：</div>
        <a-select
          :value="modalData.currentKey"
          style="width: 300px"
          labelInValue
          placeholder="请选择筛选条件"
          showSearch
          :filterOption="filterOption"
          :options="filterData"
          @change="onTypeChange"
        ></a-select>
      </div>
      <div class="row">
        <template v-if="currentSelectItem.type === 'input'">
          <div class="label">筛选项目：</div>
          <div>
            <a-input
              style="width: 300px"
              allowClear
              v-model="modalData.value"
            ></a-input>
          </div>
        </template>
        <template v-if="currentSelectItem.type === 'treeSelect'">
          <div class="label">筛选项目：</div>
          <a-tree-select
            :value="modalData.value"
            tree-default-expand-all
            allow-clear
            multiple
            labelInValue
            show-search
            :filterTreeNode="
              (input, options) =>
                filterTreeNode(input, options, currentSelectItem)
            "
            style="width: 300px"
            :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
            tree-checkable
            placeholder="请选择渠道"
            :replaceFields="
              currentSelectItem.fieldNames || {
                title: 'name',
                key: 'id',
                value: 'id',
                children: 'children'
              }
            "
            :tree-data="currentSelectOptions[currentSelectItem.value] || []"
            @click="onDropdownVisibleChange(true, currentSelectItem)"
            @change="(v) => onSelectValueChange(v)"
          >
          </a-tree-select>
        </template>
        <template v-if="currentSelectItem.type === 'select'">
          <div class="label">筛选项目：</div>
          <a-select
            :value="
              modalData.value
                ? modalData.value.map(({ value, label }) => ({
                    key: value,
                    label
                  }))
                : []
            "
            style="width: 300px"
            mode="multiple"
            labelInValue
            :placeholder="`请选择${currentSelectItem.label}`"
            :filterOption="filterOption"
            :options="currentSelectOptions[currentSelectItem.value] || []"
            @dropdownVisibleChange="
              (open) => onDropdownVisibleChange(open, currentSelectItem)
            "
            @change="
              (v) =>
                onSelectValueChange(
                  v.map(({ key, label }) => ({
                    value: key,
                    label
                  }))
                )
            "
          ></a-select>
        </template>

        <template v-if="currentSelectItem.type === 'cascader'">
          <div class="label">筛选项目：</div>
          <a-cascader
            style="width: 300px"
            placeholder="请选择"
            :options="currentSelectOptions[currentSelectItem.value] || []"
            :default-value="cascaderDefault"
            change-on-select
            :fieldNames="currentSelectItem.fieldNames"
            @popupVisibleChange="
              onDropdownVisibleChange($event, currentSelectItem)
            "
            @change="(v, options) => onCascaderValueChange(v, options)"
          >
          </a-cascader>
        </template>

        <template v-if="currentSelectItem.type === 'dateRange'">
          <div class="label">筛选项目：</div>
          <a-range-picker
            :value="modalData.value"
            format="YYYY-MM-DD"
            :showTime="{
              defaultValue: [moment().startOf('day'), moment().endOf('day')]
            }"
            :disabledDate="(current) => current > moment().endOf('day')"
            @change="(v) => onDateRangeChange(v)"
          ></a-range-picker>
        </template>
      </div>
      <div
        v-if="currentSelectItem.value === 'member_date' && modalData.value"
        class="age_box"
      >
        {{ getAgeOfMonthStr(modalData.value[1]) }}
        -
        {{ getAgeOfMonthStr(modalData.value[0]) }}
      </div>
      <template v-if="currentSelectItem.type === 'tag'">
        <Tag
          :item="currentSelectItem"
          :tagData="modalData"
          @onChange="(data) => onSelectValueChange(data.value)"
        ></Tag>
      </template>

      <template v-if="currentSelectItem.type === 'age'">
        <div class="label">筛选项目：</div>
        <Ages
          :item="currentSelectItem"
          :ageData="modalData"
          @onChange="getAgeVal"
        ></Ages>
      </template>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import Tag from './components/Tag.vue'
import { getAgeOfMonthStr, formatTime } from '@/utils/moment'
import Ages from './components/Age.vue'

export default {
  components: { Tag, Ages },
  props: {
    data: {
      default() {
        return undefined
      }
    },
    shwoTotal: {
      default() {
        return undefined
      }
    },
    isEdit: {
      default() {
        return false
      }
    },
    originalFilterData: {
      default() {
        return []
      }
    },
    getTotal: {
      default() {
        return {}
      }
    },
    taskShow: {
      default() {
        return true
      }
    }
  },
  data() {
    return {
      moment,
      getAgeOfMonthStr,
      formatTime,
      queryArray: [],
      columns: [
        {
          title: '筛选条件',
          key: 'type',
          width: 200,
          align: 'center',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '筛选项',
          key: 'value',
          align: 'center',
          scopedSlots: { customRender: 'value' }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      visable: false,
      modalData: {
        type: undefined,
        key: undefined,
        value: undefined
      },
      currentSelectOptions: {},
      total: 0,
      currentEditIndex: undefined,
      cascaderDefault: [],
      age_birthday_end: '',
      age_birthday_start: ''
    }
  },
  computed: {
    currentSelectItem() {
      return (
        this.originalFilterData.find((i) => i.value === this.modalData.key) ||
        {}
      )
    },
    filterData() {
      const keyArray = this.queryArray.map((i) => i.key)
      return this.originalFilterData.filter((i) => !keyArray.includes(i.value))
    }
  },
  watch: {
    queryArray: {
      async handler(v) {
        if (typeof this.getTotal === 'function' && v.length && !this.isEdit) {
          this.total = (
            await this.getTotal({ condition: this.getCondition(v) })
          ).total
        }
      }
    },
    data: {
      immediate: true,
      deep: true,
      handler(v) {
        if (v) {
          const array = Object.keys(v).map((key) => ({
            type: this.originalFilterData.find((i) => i.value === key).type,
            key,
            value: v[key]
          }))
          this.queryArray = this._.cloneDeep(array)
          if (v.age) {
            this.age_birthday_end = this.getDate(v.age.age_start, 'subtract')
            this.age_birthday_start = this.getDate(v.age.age_end, 'subtract')
          }
        } else {
          this.queryArray = []
        }
      }
    },
    isEdit: {
      immediate: true,
      handler(v) {
        if (v) {
          this.columns.splice(2)
        } else {
          this.columns = [
            {
              title: '筛选条件',
              key: 'type',
              width: 200,
              align: 'center',
              scopedSlots: { customRender: 'type' }
            },
            {
              title: '筛选项',
              key: 'value',
              align: 'center',
              scopedSlots: { customRender: 'value' }
            },
            {
              title: '操作',
              key: 'action',
              width: 200,
              align: 'center',
              scopedSlots: { customRender: 'action' }
            }
          ]
        }
      }
    }
  },
  methods: {
    filterOption(input, option) {
      return (
        option?.componentOptions?.children[0]?.text
          ?.toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    filterTreeNode(input, option, item) {
      if (item.value === 'crm_channel') {
        return option.data.props.label.indexOf(input) >= 0
      } else {
        return (
          option.data.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
      }
    },
    addFilter() {
      this.visable = true
    },
    onTypeChange(v) {
      const item = this.originalFilterData.find((i) => i.value === v.key)
      this.modalData = {
        type: item.type,
        valueKey: item.valueKey,
        currentKey: v,
        key: v.key,
        value: undefined
      }
    },
    async onDropdownVisibleChange(open, item) {
      if (
        open &&
        item.getOptions &&
        !this.currentSelectOptions[item.value]?.length
      ) {
        this.$set(
          this.currentSelectOptions,
          item.value,
          await item.getOptions()
        )
      }
    },
    onSelectValueChange(v) {
      this.modalData.value = v
    },
    onCascaderValueChange(v, options) {
      this.modalData.value = options
    },
    onDateRangeChange(v) {
      this.onSelectValueChange(v.map((i) => formatTime(i)))
    },
    getCondition(conditionData) {
      const condition = {}
      conditionData.forEach((item) => {
        if (!condition[item.key]) condition[item.key] = []
        condition[item.key] = item.value
      })
      return condition
    },
    onConfirm() {
      const checkData = () => {
        if (this.modalData.key === 'age' && !this.modalData.value) {
          this.modalData.value = {
            age_end: {
              year: 0,
              month: 0,
              day: 1
            },
            age_start: {
              year: 0,
              month: 0,
              day: 1
            }
          }
        }
        if (typeof this.modalData.value === 'undefined') {
          return
        }

        if (Array.isArray(this.modalData.value)) {
          return !!this.modalData.value.length
        }
        if (typeof this.modalData.value === 'object') {
          if (this.modalData.type === 'age') {
            return Object.values(this.modalData.value).some((i) =>
              Object.values(i).some((it) => it > 0)
            )
          } else {
            return Object.values(this.modalData.value).some((i) => i.length)
          }
        }
        return true
      }
      if (!checkData()) {
        this.$message.error('请选择筛选项')
        return
      }
      if (this.modalData.type === 'age') {
        this.age_birthday_start = this.getDate(
          this.modalData.value.age_end,
          'subtract'
        )
        this.age_birthday_end = this.getDate(
          this.modalData.value.age_start,
          'subtract'
        )
      }
      if (this.currentEditIndex !== undefined) {
        const queryArray = this._.cloneDeep(this.queryArray)
        queryArray[this.currentEditIndex] = this._.cloneDeep(this.modalData)
        this.queryArray = queryArray
      } else {
        this.queryArray.push(this._.cloneDeep(this.modalData))
      }
      this.modalData = {
        type: undefined,
        key: undefined,
        value: undefined
      }
      this.$nextTick(() => {
        this.visable = false
        this.currentEditIndex = undefined
        this.$emit(
          'onFilterChange',
          this._.cloneDeep(this.getCondition(this.queryArray))
        )
      })
    },
    onCancel() {
      this.modalData = {
        type: undefined,
        key: undefined,
        value: undefined
      }
      this.currentEditIndex = undefined
    },
    async onFilterItemEdit(data, index) {
      const result = this.originalFilterData.find((i) => i.value === data.key)
      this.currentEditIndex = index
      data.currentKey = {
        key: data.key,
        label: this.originalFilterData.find((i) => i.value === data.key).label
      }
      this.modalData = this._.cloneDeep(data)
      if (result.type === 'cascader') {
        this.cascaderDefault = data.value
      }
      this.visable = true
    },
    onFilterItemDelete(index) {
      if (this.queryArray.length === 1) {
        return this.$message.error('至少需要保留一个筛选条件')
      }
      const array = this._.cloneDeep(this.queryArray)
      array.splice(index, 1)
      this.queryArray = array
      this.$nextTick(() => {
        this.$emit(
          'onFilterChange',
          this._.cloneDeep(this.getCondition(this.queryArray))
        )
      })
    },
    copy() {
      this.$emit('onCopy', {
        condition: JSON.stringify(this.getCondition(this.queryArray))
      })
    },
    getAgeVal(val) {
      this.modalData.value = val.item_val
    },
    getDate(data, method) {
      const di = {
        岁: 'years',
        个月: 'months',
        天: 'days'
      }
      const date = moment()
      for (let i in data) {
        date[method](data[i], i)
      }
      return date.format('YYYY-MM-DD')
    }
  },
  filters: {
    ageType(val) {
      var map = {
        year: '岁',
        month: '个月',
        day: '天'
      }
      return map[val] || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 800px;
}
.age_box {
  margin-top: 10px;
  margin-right: 34px;
  text-align: right;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.number {
  color: #1785ff;
}
.show {
  opacity: 1;
}
.hide {
  opacity: 0;
}
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
