 <template>
  <div id="app">
    this is a folder tree.
    <tree-folder
      v-for="tree in treeDatas"
      :tree="tree"
      :treeProps="treeProps"
      :currentNode="currentNode"
      :handleClick="handleClick"
      :key="tree[treeProps.label]"/>
  </div>
</template>

<script>
import TreeFolder from '@/components/tree-folder'
import { treeDatas } from '@/mock/tree-folder'
export default {
  name: 'app',
  components: { TreeFolder },
  data () {
    return {
      treeProps: {
        label: 'name',
        children: 'children',
        level: 'deptLevel'
      },
      treeDatas: treeDatas,
      currentNode: ''
    }
  },
  methods: {
    handleClick: function (folder, e) {
      this.currentNode = folder.name
      console.log('this.currentNode', this.currentNode)
      if (folder.expanded) {
        this.$set(folder, 'expanded', false)
      } else {
        this.$set(folder, 'expanded', true)
      }
    }
  }
}
</script>
