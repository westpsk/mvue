<template>
  <ul>
    <li v-for="child in children" :key="child.name">
      <span v-if='child.name'>{{child.name}}</span>
      <tree-folder v-if='child.children' :folders='child.children'/>
    </li>
  </ul>
</template>

<script>
import TreeFolder from './tree-folder'
export default {
  name: 'tree-folder-content',
  components: { TreeFolder },
  props: ['children']
}
</script>
