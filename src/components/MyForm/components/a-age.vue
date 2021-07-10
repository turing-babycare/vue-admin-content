<template>
  <div>
    <a-row style="width: 900px" :gutter="20">
      <a-col :span="10" style="display: flex; justify-content: space-between">
        <div v-for="(item, index) in item.options.age_start" :key="index">
          <a-input-number
            @change="ageChange(item, $event, 'start')"
            id="inputNumber"
            :max="item.max"
            :min="item.min"
            :value="age.age_start[item.label_key]"
          />
          {{ item.label }}
        </div>
      </a-col>
      <a-col :span="1">
        <span>~</span>
      </a-col>
      <a-col :span="10" style="display: flex; justify-content: space-between">
        <div v-for="(item, index) in item.options.age_end" :key="index">
          <a-input-number
            @change="ageChange(item, $event, 'end')"
            id="inputNumber"
            :min="item.min"
            :max="item.max"
            :value="age.age_end[item.label_key]"
          />
          {{ item.label }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    item_name: {}
  },
  data() {
    return {
      age_val: {},
      age: {
        age_start: {
          year: 0,
          month: 0,
          day: 0
        },
        age_end: {
          year: 0,
          month: 0,
          day: 0
        }
      }
    }
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(val) {
        this.item = val
      }
    },
    item_name: {
      immediate: true,
      handler(val) {
        if (val) {
          this.age = val
        } else {
          this.age = {
            age_start: {
              year: 0,
              month: 0,
              day: 0
            },
            age_end: {
              year: 0,
              month: 0,
              day: 0
            }
          }
        }
      }
    }
  },
  methods: {
    ageChange(item, val, type) {
      if (type === 'start') {
        const result = Object.keys(this.age.age_start).find(
          (it) => it === item.label_key
        )
        this.age.age_start[result] = val
      }
      if (type === 'end') {
        const result = Object.keys(this.age.age_end).find(
          (it) => it === item.label_key
        )
        this.age.age_end[result] = val
      }

      const params = {
        item_name: this.item.name,
        item_val: this.age
      }
      this.$emit('getVal', params)
    }
  }
}
</script>
