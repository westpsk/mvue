<template>
  <li class="cp-tree-node"
    @click.stop="handleClick(tree)">
    <div class="cp-tree-node__content"
      :style="{'padding-left': (tree[treeProps.level] - 1) * 16 + 'px'}">
      {{tree[treeProps.label]}}
    </div>
    <ul v-if="!tree.expanded">
      <tree-folder
        v-if='tree[treeProps.children]'
        v-for="child in tree[treeProps.children]"
        :treeProps='treeProps'
        :key="child[treeProps.label]"
        :tree='child'/>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'treeFolder',
  props: {
    tree: {
      type: Object
    },
    treeProps: {}
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

<style>
ul,li{
  list-style-type: none;
}
</style>
