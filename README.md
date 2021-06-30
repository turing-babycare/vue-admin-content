### 组件介绍

```
ant-design-vue 表单的封装,可应用在table搜索,表单内容填写
```

### 组件使用

```
安装 npm install form_demo_vue
引入 import myForm from 'form_demo_vue'
使用 在components中注册MyForm
```

### 参数

```
:rules      类型-obj        用于表单验证        可为空
rules:{
    type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
}

```

```
:formData   类型-obj        用于表单数据绑定    必填
formData: {
    type: undefined,
    name: undefined,
}
```

```
:form       类型-obj        用于表单基本配置信息    必填
form: {
    layout: 'vertical', // horizontal  vertical  inline
    btn: [
         {
            text: '搜索',
            fun: 'submit',
            type: 'primary',
            disabled:true
          },
          {
            text: '重置',
            fun: 'cancel',
            type: ''
          },
          {
            text: '新增',
            fun: 'add',
            type: 'primary'
          }
    ],
    <!-- layout为horizontal时填写 -->
     labelCol: {
        span: 4    label所占列数
    },
    wrapperCol: {
        span: 20    内容所占列数
    }
}
btn为表单按钮
    fun内容为submit代表提交 会进行rules验证,内容为cancel代表清空表单,自定义按钮写入对应名称则返回对应方法
    disabled为true代表禁用
    text为空代表按钮隐藏
```

```
:formItem       类型-array        用于表单内容配置   必填
  formItem: [
        {
          type: 'input',                表单类型
          holder: '请输入任务名称',      默认提示文字
          label: '任务名称',            label显示名称
          name: 'name',                 绑定的字段名称
          maxLength: 15,                最大可输入字数
          allowClear: true              是否可清空
        },
        {
          type: 'slot',                slot代表是插槽，需在引入界面，书写对用slotName插槽
          slotName: 'condition',
          label: '用户筛选条件',
          name: 'condition'
        },
        <!-- 当某个值为对象时显示 -->
        {
          cascaderItem: ['condition'],     此代表当前表单行依赖值为condition的数据
          objType: 'or',                   代表condition数据为对象，且不为空当前行显示
          type: 'radio',
          label: '用户数量限制',
          name: 'user_count_limit',
          options: [                        当前选项的数组（select,radio，checkbox等会用到）
            {
              label: '不限制',              固定传递键为label,代表显示文字为'不限制'
              value: 1                      固定传递键为label,代表选中的值为1
            },
            {
              label: '限制用户数量',
              value: 2
            }
          ]
        },
        <!-- 当选中某个值时显示 -->
          {
          cascaderItem: ['user_count_limit'],  此代表当前表单行依赖值为user_count_limit的数据
          cascaderValue: [2],                   当user_count_limit选中2时显示
          cascaderType: 'or',                   'or'代表cascaderItem数组满足其一即可,'and'代表cascaderItem数组必须都满足才可以
          type: 'inputNumber',
          name: 'user_count',
          min: 1,
          tip:
            '系统将按照用户的创建时间顺序，仅对输入数量的用户执行批量标签任务'
        },
        <!-- 两层 -->
        {
          type: 'slot',
          slotName: 'slotDay',
          cascaderItem: ['delay_type'],
          cascaderValue: [2],
          cascaderType: 'or',
          parentCascader: [                     代表cascaderItem,parentCascader都满足条件才显示,传递的cascaderItem数组长度,必须对应cascaderValue数组的长度
            'baseline_date',
            'baseline_date',
            'baseline_date',
            'baseline_date',
            'baseline_date'
          ],
          parentVal: [1, 2, 4, 5, 6],
          parentType: 'or'
        },
  ]
```

### 图片上传

```
需要在Vue原型上添加baseUrl(固定名称) 为当前项目要图片上传的地址
Vue.prototype.baseUrl = process.env.VUE_APP_API_BASE_URL
upload 图片单张上传
{
    label: '体检报告',
    name: 'tjbg',
    type: 'upload',
}
uploadlist 多张图片上传,需要传递max代表上传最大限制
{
    label: '体检报告',
    name: 'tjbg',
    type: 'uploadlist',
    max: 9
}
```
