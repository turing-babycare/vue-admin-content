<template>
  <Age :item_name="ageVal" :item="ageItem" @getVal="getAgeVal"></Age>
</template>

<script>
import { Age } from '../../index'
export default {
  components: { Age },
  data() {
    return {
      ageItem: {},
      ageVal: {}
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    ageData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(val) {
        this.ageItem = this._.cloneDeep(val)
      }
    },
    ageData: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val.value) {
          this.ageVal = {
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
        } else {
          this.ageVal = val.value
        }
      }
    }
  },
  methods: {
    getAgeVal(val) {
      this.$emit('onChange', val)
    }
  }
}
</script>
