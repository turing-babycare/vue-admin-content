<template>
  <div>
    <a-row style="width:900px" :gutter="20">
      <a-col :span="10" style="display: flex;justify-content: space-between;">
        <div v-for="(item, index) in item.age_start" :key="index">
          <a-input-number
            @change="ageChange($event, index, 'start')"
            id="inputNumber"
            v-model="item.val"
            :min="0"
            :max="item.max"
          />
          {{ item.text }}
        </div>
      </a-col>
      <a-col :span="1">
        <span>~</span>
      </a-col>
      <a-col :span="10" style="display: flex;justify-content: space-between;">
        <div
          v-for="(item, index) in item.age_end"
          :key="index"
          :label="item.text"
        >
          <a-input-number
            @change="ageChange($event, index, 'end')"
            id="inputNumber"
            v-model="item.val"
            :min="0"
            :max="item.max"
          />
          {{ item.text }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      age_val: ''
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
        this.age_val = val
      }
    }
  },
  methods: {
    ageChange(val, index, type) {
      if (type === 'start') {
        this.item.age_start[index].value = val
      }
      if (type === 'end') {
        this.item.age_end[index].value = val
      }
      const start = this.item.age_start.map((it) => it.val + it.text).join('/')
      const end = this.item.age_end.map((it) => it.val + it.text).join('/')

      this.age_val = start + '~' + end
      const params = {
        item_name: this.item.name,
        item_val: this.age_val
      }
      console.log(this.age_val)
      this.$emit('getVal', params)
    }
  }
}
</script>
