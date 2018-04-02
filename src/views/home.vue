<template>
  <div id="home">
    <h2>this is home page</h2>
    <autocomplete
      url="https://api.github.com/search/users"
      name="autocomplete"
      placeholder="请输入要查询github用户名"
      anchor="login"
      :customParams="{ q: 'ivan' }"
      :classes="{input: 'form-control', wrapper: 'input-wrapper'}"
      :process="processJSON"
      :onSelect="handleSelect"
    ></autocomplete>
    <pre v-if="preContent" :style="preStyle">
      <b>Selected Data:</b>
      {{ preContent }}
    </pre>
  </div>
</template>

<script>
import Autocomplete from '@/components/autocomplete.vue'
export default {
  name: 'blue',
  components: { Autocomplete },
  data () {
    return {
      preContent: '',
      preStyle: {
        background: '#f2f2f2',
        fontFamily: 'monospace',
        fontSize: '1em',
        display: 'inline-block',
        padding: '15px 7px'
      }
    }
  },
  methods: {
    processJSON (json) {
      return json.items
    },
    handleSelect (data) {
      this.preContent = JSON.stringify(data, null, 4)
    }
  }
}
</script>

<style>
#home{
  background: #eee;
}
</style>
