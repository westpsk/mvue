<template>
  <li class="cp-tree-node"
    @click.stop="handleClick(folder)">
    <span>{{folder.name}}</span>
    <ul v-if="!folder.expanded">
      <!-- <tree-folder-contents :children="folder.children"/> -->
      <tree-folder
        v-if='folder.children'
        v-for="child in folder.children"
        :key="child.name"
        :folder='child'/>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'treeFolder',
  props: ['folder'],
  beforeCreate () {
    // this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
  },
  methods: {
    handleClick: function (folder, e) {
      if (folder.expanded) {
        this.$set(folder, 'expanded', false)
      } else {
        this.$set(folder, 'expanded', true)
      }
    }
  }
}
</script>
