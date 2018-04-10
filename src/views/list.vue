 <template>
  <div id="app">
    this is a folder tree.
    <tree-folder
      v-for="tree in treeDatas"
      :tree="tree"
      :treeProps="treeProps"
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
      treeDatas: treeDatas
    }
  }
}
</script>
