<template>
  <div>
    <div v-if="item.options.length > 0">
      <template v-for="iitem in item.options">
        <a-time-picker
          @change="change"
          :key="iitem.name + '_picker'"
          v-model="time_val"
          :placeholder="iitem.holder || '请选择'"
          :format="iitem.format ? iitem.format : 'HH:mm'"
        >
          <!-- :default-value="moment(formData[item.name])" -->
        </a-time-picker>
      </template>
    </div>

    <template v-else>
      <a-time-picker
        :key="item.name + '_picker'"
        v-model="time_val"
        :placeholder="item.holder || '请选择'"
        :format="item.format ? item.format : 'HH:mm'"
      >
      </a-time-picker>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time_val: ""
    };
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
        this.time_val = val;
      }
    }
  },
  methods: {
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.time_val
      };
      this.$emit("getVal", params);
    }
  }
};
</script>
