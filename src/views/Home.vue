<template>
  <div>
    <!--表单-->
    <Myform
      :rules="rules"
      :formData="formData"
      :form="form"
      :formItem="formItem"
      @submit="onSubmit"
      @cancel="onCancel"
    >
    </Myform>
    <!--搜索-->
    <ComplexFilter
      :data="rel_user_cond"
      :isEdit="isEdit"
      :taskShow="false"
      :originalFilterData="conditionData"
      :searchBtn="searchBtn"
    >
      <template #add>
        <a-button style="margin: 0px 10px">新增</a-button>
      </template>
      <template #search>
        <a-button>搜索</a-button>
      </template>
    </ComplexFilter>
    <a-row>
      <a-col :span="4">
        <a-button type="primary" @click="rowSelectionAll"> 全选 </a-button>
      </a-col>
      <a-col :span="4">
        <a-button type="primary" @click="rowSelectionInvert"> 反选 </a-button>
      </a-col>
    </a-row>
    <!--表格-->
    <MyTable
      ref="myTable"
      :columns="columns"
      :dataSource="data"
      :operation="operation"
      :loading="loading"
      @onChange="setCurrentPage"
      @sizeChange="sizeChange"
      @detail="detailHandle"
      @rowSelectionChange="rowSelectionChange"
      @onSelectAll="rowSelectionAll"
      :multiple="true"
      :page="page"
    >
    </MyTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Myform, { ComplexFilter, MyTable } from '@/components/index'
import moment from 'moment'
import _ from 'lodash'
export default Vue.extend({
  name: 'hellow',
  components: {
    Myform,
    MyTable,
    ComplexFilter
  },
  data() {
    return {
      // form
      form: {
        layout: 'inline', // horizontal  vertical
        btn: [
          {
            text: '搜索',
            fun: 'submit',
            type: 'primary'
          },
          {
            text: '重置',
            fun: 'cancel',
            type: 'dashed'
          },
          {
            text: '新增',
            fun: 'add',
            type: 'link',
            disabled: true
          },
          {
            text: '删除',
            fun: 'del',
            type: 'danger'
          },
          {
            text: '编辑',
            fun: 'edit',
            type: 'danger'
          },
          {
            text: '详情',
            fun: 'info',
            type: 'danger'
          }
        ]
      },
      formItem: [
        {
          label: '体检报告',
          name: 'tjbg',
          type: 'uploadlist',
          labelCol: { span: 24 },
          wrapperCol: { span: 24 },
          max: 9
        },
        {
          type: 'date',
          holder: '请选择任务截止日期',
          label: '任务截止日期',
          name: 'date',
          format: 'YYYY-MM-DD',
          showTime: false
        },
        {
          type: 'rangedate',
          holder: '患者出生日期范围',
          label: '患者出生日期范围',
          name: 'birthday',
          format: 'YYYY-MM-DD',
          defaultValue: [
            moment(new Date())
              .subtract(2, 'months')
              .startOf('month')
              .format('YYYY-MM-DD'),
            moment().endOf('month').format('YYYY-MM-DD')
          ],
          showTime: false
        },
        {
          type: 'select',
          holder: '请选择负责人',
          label: '负责人',
          name: 'leader',
          showSearch: true,
          options: [
            {
              value: 1,
              label: '名字'
            },
            {
              value: 2,
              label: '名字'
            },
            {
              value: 3,
              label: '名字'
            }
          ]
        },
        {
          type: 'input',
          holder: '请输入科室名称',
          label: '科室名称',
          name: 'name',
          maxLength: 50
        }
      ],
      formData: {
        admin_id: '123',
        age: {
          age_start: {
            year: 1,
            month: 2,
            day: 3
          },
          age_end: {
            year: 4,
            month: 5,
            day: 6
          }
        }
      } as any,
      rules: {
        name: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
        leader: [{ required: true, message: '请选择负责人', trigger: 'change' }]
      },
      // table
      columns: [
        {
          title: '科室名称',
          key: 'name',
          ellipsis: 10
        },
        {
          title: '科室简介',
          key: 'synopsis'
        },
        {
          title: '科室位置',
          key: 'location'
        },
        {
          title: 'HIS-ID',
          key: 'his'
        },
        {
          title: '信息同步',
          key: 'message'
        },
        {
          title: '号源同步',
          key: 'headstream'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '操作',
          key: 'action',
          type: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [
        {
          name: '科室名称1',
          synopsis: '科室简介',
          location: '科室位置',
          his: 'HIS-ID',
          message: '信息同步',
          headstream: '号源同步',
          state: '状态',
          checkDisable: false
        },
        {
          name: '科室名称2',
          synopsis: '科室简介',
          location: '科室位置',
          his: 'HIS-ID',
          message: '信息同步',
          headstream: '号源同步',
          state: '状态',
          checkDisable: true
        },
        {
          name: '科室名称3',
          synopsis: '科室简介',
          location: '科室位置',
          his: 'HIS-ID',
          message: '信息同步',
          headstream: '号源同步',
          state: '状态',
          checkDisable: false
        },
        {
          name: '科室名称4',
          synopsis: '科室简介',
          location: '科室位置',
          his: 'HIS-ID',
          message: '信息同步',
          headstream: '号源同步',
          state: '状态',
          checkDisable: true
        },
        {
          name: '科室名称5',
          synopsis: '科室简介',
          location: '科室位置',
          his: 'HIS-ID',
          message: '信息同步',
          headstream: '号源同步',
          state: '状态',
          checkDisable: false
        },
        {
          name: '科室名称6',
          synopsis: '科室简介',
          location: '科室位置',
          his: 'HIS-ID',
          message: '信息同步',
          headstream: '号源同步',
          state: '状态',
          checkDisable: false
        }
      ],
      operation: {
        nowPage: 'askServicesTable',
        show: true,
        fixed: false,
        size: 'mini',
        width: 80,
        minWidth: 100,
        btns: [
          {
            content: '编辑',
            handle: 'detail'
          }
        ]
      },
      loading: false,
      page: {
        total: 1,
        currentPage: 1,
        pageSize: 10
      },
      rowSelectionList: [],
      // complex
      isEdit: false,
      rel_user_cond: {
        tag: {
          tag_contain: [
            { label: '合并标签1', value: 'et9UksCAAA2V0o8OqQ0jhrTACOR0kevA11' }
          ]
        }
      },
      searchBtn: {
        postion: 'top',
        search_style: 'justify-content: start;margin-bottom:10px',
        btn: [
          {
            type: 'slot',
            slotName: 'add'
          },
          {
            type: 'slot',
            slotName: 'search'
          }
        ]
      },

      conditionData: [
        {
          label: '渠道',
          value: 'channel',
          type: 'treeSelect',
          async getOptions() {
            const res = [
              {
                value: 1,
                label: 1
              }
            ]
            return res
          }
        },

        {
          label: '企业微信标签',
          value: 'tag',
          valueKey: ['tag_contain', 'tag_no_contain'],
          notIncludeShow: false,
          replaceFields: {
            title: 'name',
            key: 'id',
            value: 'id',
            children: 'tag'
          },
          type: 'tag',
          async getOptions() {
            const res = [
              {
                create_time: 1627634256,
                group: 1,
                id: 'et9UksCAAAeGrIIitsXe3zeBI1tTTdTQ',
                name: '西京医院',
                tag: [
                  {
                    create_time: 1627634256,
                    id: 'et9UksCAAAjeschph399mMIHWqwE5GmQ',
                    name: '西京体检'
                  }
                ]
              },
              {
                create_time: 1627634256,
                group: 1,
                id: 'et9UksCAAAeGrIIitsXe3zeBI1tTTdTQ2',
                name: '西京医院2',
                tag: [
                  {
                    create_time: 1627634256,
                    id: 'et9UksCAAAjeschph399mMIHWqwE5GmQ2',
                    name: '西京体检2'
                  }
                ]
              }
            ]
            return res
          }
        }
      ]
    }
  },
  methods: {
    // form
    onSubmit(data: any) {
      console.log(data, '提交啦')
    },
    onCancel() {
      this.formData = {}
      console.log('重置啦')
    },
    // table
    setCurrentPage(val) {
      this.page.currentPage = val
    },
    sizeChange(val) {
      this.page.currentPage = val.current
      this.page.pageSize = val.pageSize
    },
    detailHandle(val) {
      console.log(val)
    },
    // 选中项
    rowSelectionChange(val) {
      this.rowSelectionList = val || []
      const res = this.data
        .filter((it, index) => this.rowSelectionList.some((i) => i == index))
        .map((m) => m.name)
      // console.log(res)
    },
    // 全选
    rowSelectionAll() {
      const index = this.data
        .filter((i) => !i.checkDisable)
        .map((it) => {
          return _.findIndex(this.data, function (o) {
            return o.name === it.name
          })
        })
      ;(this.$refs.myTable as any).onSelectChange(index)
    },
    // 反选
    rowSelectionInvert() {
      const res = this.data.filter((it, index) => {
        return (
          !this.rowSelectionList.some((i) => i === index) && !it.checkDisable
        )
      }) as any
      const index = res.map((it) => {
        return _.findIndex(this.data, function (o) {
          return o.name === it.name
        })
      })
      ;(this.$refs.myTable as any).onSelectChange(index)
    }
  }
})
</script>
