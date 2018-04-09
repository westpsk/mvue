 <template>
  <div id="app">
    this is a folder tree.
    <tree-folder :folders="folders"/>
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
          children: [
            {
              name: 'node-1-a',
              children: [
                { name: 'node-1-a-1' },
                { name: 'node-1-a-2' }
              ]
            }
          ]
        },
        {
          name: 'node-2',
          children: [
            {
              name: 'node-2-a'
            }
          ]
        }
      ]
    }
  }
}
</script>
