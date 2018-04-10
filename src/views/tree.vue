 <template>
  <div id="app">
    this is a folder tree.
    <tree-folder
      v-for="folder in folders"
      :folder="folder"
      :key="folder.name"/>
  </div>
</template>

<script>
import TreeFolder from '@/components/tree-folder'
export default {
  name: 'app',
  components: { TreeFolder },
  data () {
    return {
      folders: [
        {
          name: 'node-1',
          deptLevel: 1,
          children: [
            {
              name: 'node-1-a',
              deptLevel: 2,
              children: [
                { name: 'node-1-a-1', deptLevel: 2 },
                { name: 'node-1-a-2', deptLevel: 2 }
              ]
            }
          ]
        },
        {
          name: 'node-2',
          deptLevel: 1,
          children: [
            {
              name: 'node-2-a',
              deptLevel: 2
            }
          ]
        }
      ]
    }
  }
}
</script>
