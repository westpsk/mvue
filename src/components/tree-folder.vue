<template>
  <div>
    <p v-for="(folder, index) in folders" :key="index">
      <span>{{folder.name}}</span>
      <tree-folder-contents :children="folder.children"/>
    </p>
  </div>
</template>

<script>
export default {
  name: 'TreeFolder',
  props: ['folders'],
  beforeCreate () {
    this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
  }
}
</script>
