<template>
  <li class="cp-tree-node"
    @click.stop="handleClick(tree)">
    <div class="cp-tree-node__content"
      :style="{'padding-left': (tree[treeProps.level] - 1) * 16 + 'px'}"
      :class="{'is-checked':currentNode===tree.name}">
      {{tree[treeProps.label]}}
    </div>
    <ul v-if="!tree.expanded">
      <tree-folder
        v-if='tree[treeProps.children]'
        v-for="child in tree[treeProps.children]"
        :treeProps='treeProps'
        :currentNode='currentNode'
        :handleClick='handleClick'
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
      type: Object,
      default: function () {
        return {}
      }
    },
    treeProps: {},
    currentNode: '',
    handleClick: Function
  },
  // data: function () {
  //   return {
  //     currentNode: '',
  //     test: 1
  //   }
  // },
  methods: {
    // handleClick: function (folder, e) {
    //   this.currentNode = folder.name
    //   console.log('this.currentNode', this.currentNode)
    //   if (folder.expanded) {
    //     this.$set(folder, 'expanded', false)
    //   } else {
    //     this.$set(folder, 'expanded', true)
    //   }
    // }
  }
}
</script>

<style>
ul,li{
  list-style-type: none;
}
.cp-tree-node__content:hover{
  background: #eee;
}
.cp-tree-node__content.is-checked{
  background: #42b983;
}
</style>
