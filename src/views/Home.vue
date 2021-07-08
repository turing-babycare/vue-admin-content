<template>
  <Myform
    :rules="{}"
    :formData="formData"
    :form="form"
    :formItem="formItem"
    @submit="onSubmit"
    @cancel="onCancel"
  >
  </Myform>
</template>

<script lang="ts">
import Vue from 'vue'
// import Myform from '../../dist/content.umd'
import Myform from '@/components/index'

export default Vue.extend({
  mounted() {
    // console.log(lib)
  },
  name: 'hellow',
  components: {
    Myform
  },
  data() {
    return {
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
          type: 'slot',
          slotName: 'tag_id',
          label: '企业标签'
        },
        {
          type: 'select',
          holder: '请选择一级来源渠道',
          label: '一级来源渠道',
          name: 'chan_1',
          showSearch: true,
          options: []
        },
        {
          type: 'select',
          holder: '请选择二级来源渠道',
          label: '二级来源渠道',
          name: 'chan_2',
          showSearch: true,
          options: []
        },
        {
          type: 'select',
          holder: '请选择三级来源渠道',
          label: '三级来源渠道',
          name: 'chan_3',
          showSearch: true,
          options: []
        },
        {
          type: 'cascader',
          holder: '请选择渠道',
          label: '渠道',
          name: 'chan',
          showSearch: true,
          fieldNames: { label: 'name', value: 'id', children: 'children' },
          options: []
        },
        {
          type: 'select',
          holder: '请选择来源场景',
          label: '来源场景',
          name: 'scene',
          showSearch: true,
          options: []
        },
        {
          type: 'input',
          holder: '请选择添加人',
          label: '添加人',
          name: 'admin_id',
          showSearch: true,
          options: []
        },
        {
          type: 'input',
          holder: '请选择家庭成员出生日期范围',
          label: '家庭成员出生日期范围',
          disabledDate: () => ({}),
          name: 'birthday',
          format: 'YYYY-MM-DD',
          showTime: false
        },
        {
          label: '患者年龄范围',
          type: 'age',
          name: 'age',
          options: {
            age_start: [
              {
                label: '岁',
                label_key: 'year',
                max: 99,
                min: 0
              },
              {
                label: '个月',
                label_key: 'month',
                max: 99,
                min: 0
              },
              {
                label: '天',
                label_key: 'day',
                max: 99,
                min: 0
              }
            ],
            age_end: [
              {
                label: '岁',
                label_key: 'year',
                max: 99,
                min: 0
              },
              {
                label: '个月',
                label_key: 'month',
                max: 99,
                min: 0
              },
              {
                label: '天',
                label_key: 'day',
                max: 99,
                min: 0
              }
            ]
          }
        }
      ],
      formData: {
        admin_id: '123'
      } as any
    }
  },
  methods: {
    onSubmit(data: any) {
      console.log(data, '提交啦')
    },
    onCancel() {
      this.formData = {}
      console.log('重置啦')
    }
  }
})
</script>
