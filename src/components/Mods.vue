<template>
  <el-dialog :show-close='false' :visible.sync="_visible">
    <el-table :data='tableData'>
      <el-table-column>
        <template slot-scope="scope">
          <template v-if='scope.row.name !== "base"'>
              <el-button class='el-icon-caret-top' type="primary" plain size='small' @click='handleRemove(scope.$index, scope.row)'></el-button><br />
              <el-button class='el-icon-caret-bottom' type="primary" plain size='small' @click='handleRemove(scope.$index, scope.row)'></el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop='name' label='name'>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <template v-if='scope.row.name !== "base"'>
              <el-button class='operation' type="danger" size='small' @click=''>-</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <input type='file' @change='ichange' multiple>

  </el-dialog>
</template>
<script>
export default {
  props: ['visible'],
  data () {
    return {
      tableData: [
      ]
    }
  },

  methods: {
    ichange (e) {
      let files = e.target.files
      for (let i = 0; i < files.length; i++) {
        let f = files[i]
        this.readFile(f)
      }
    },
    readFile (f) {
      f.then(zip => {
        let dir = {}
        let dirname
        zip.forEach((relativePath, zipEntry) => {
          if (zipEntry.dir) {
            let parts = zipEntry.name.split('/')
            if (parts.length === 2) {
              dirname = parts[0]
            }
            return
          }
          let subdir = dir
          let parts = zipEntry.name.split('/')
          let i
          for (i = 0; i < parts.length - 1; i++) {
            if (!subdir[parts[i]]) {
              subdir[parts[i]] = {}
            }
            subdir = subdir[parts[i]]
          }
          subdir[parts[i]] = zipEntry
        })
        this.tableData.push({
          name: f.name,
          dir: dir[dirname],
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  computed: {
    _visible: {
      get: function () {
        return this.visible
      },
      set: function (val) {
        this.$emit('update:visible', val)
      }
    },

  }
}
</script>
<style scoped>
>>> .el-dialog__header, >>> .el-upload-list {
  display: none
}
</style>