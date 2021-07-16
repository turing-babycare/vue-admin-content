<template>
  <div>
    <Myform
      :rules="{}"
      :formData="formData"
      :form="form"
      :formItem="formItem"
      @submit="onSubmit"
      @cancel="onCancel"
    >
    </Myform>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import Myform from '../../dist/content.umd'
import Myform from '@/components/index'

export default Vue.extend({
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
