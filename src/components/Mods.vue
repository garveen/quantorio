<template>
  <el-dialog :show-close='false' :visible.sync="_visible">

    <vue-transmit class="col-12"
      tag="section"
      v-bind="options"
      upload-area-classes="bg-faded"
      ref="uploader"
      @added-files='uploaderHeight="10vh";uploaderIconHeight="8vh"'
      >
      <div class="inner" :style='{height: uploaderHeight}'>
        <div class="el-icon-document" :style='{"font-size": uploaderIconHeight}'></div>
      </div>
      <!-- Scoped slot -->
      <template slot="files" slot-scope="props">
        <el-table :data='props.files'>
          <el-table-column :width='60'>
            <template slot-scope="scope">
              <template v-if='scope.row.name !== "base"'>
                  <el-button class='operation el-icon-minus el-icon' type="danger" size='small' @click='handleRemove(scope.$index, props.files)'></el-button>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop='name'>
          </el-table-column>
          <el-table-column :width='60'>
            <template slot-scope="scope">
              <template v-if='scope.row.name !== "base"'>
                  <el-button class='el-icon-caret-top el-icon' type="primary" plain size='mini' @click='handleMove($event, props.files, scope.$index, "prev")'></el-button><br />
                  <el-button class='el-icon-caret-bottom el-icon' type="primary" plain size='mini' @click='handleMove($event, props.files, scope.$index, "next")'></el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div style='width:100%; text-align:center'>
          <el-button type='primary' style='width:50%; margin: 10px 0 0 0;font-size:32px;padding:4px 0' class='el-icon-check' @click='setFiles(props.files)'></el-button>
        </div>
      </template>
    </vue-transmit>

  </el-dialog>
</template>
<script>
import Data from './data'
export default {
  props: ['visible'],

  data () {
    return {
      uploaderHeight: '20vh',
      uploaderIconHeight: '12vh',
      options: {
        acceptedFileTypes: ['application/zip'],
        // clickable: false,
        url: '#',
        autoQueue: false,
        createImageThumbnails: false,
        dragClass: 'dragging',
      }
    }
  },

  methods: {
    ichange (e) {
      let files = e.target.files
      for (let i = 0; i < files.length; i++) {
        let f = files[i]
        console.log(f)
        if (this.tableData.find(o => o.name === f.name)) continue
        this.tableData.push({
          file: f,
          name: f.name,
        })
      }
    },

    setFiles (vtFiles) {
      this.$store.commit('setLoading', true)
      let _this = this
      window.setTimeout(() => {
        let files = vtFiles.map(vtFile => [vtFile.name, vtFile.nativeFile])
        Data.loadFiles(files).then(() => {
          _this.$emit('update:visible', false)
        })
        .catch(error => {
          console.error(error)
          alert('some module got an error')
        }).finally(() => {
          _this.$store.commit('setLoading', false)
        })
      }, 1)
    },

    handleMove (ev, table, index, direction) {
      ev.target.blur()
      let p = 0
      if (direction === 'prev') {
        if (index === 0) return
        p = -1
      } else {
        p = 1
      }
      table.splice(index + p, 0, table.splice(index, 1)[0])
    },

    handleRemove (index, table) {
      table.splice(index, 1)
      if (table.length === 0) {
        this.uploaderHeight = '20vh'
        this.uploaderIconHeight = '12vh'
      }
    },
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
    aheight () {
      console.log(123)
      return (this.$refs.uploader && this.$refs.uploader.files.length) ? '10vh' : '20vh'
    }
  }
}
</script>
<style scoped>
>>> .el-dialog__header, >>> .el-table__header {
  display: none
}

>>> .el-dialog__body {
}

>>> .inner {
  border-radius: 2vh;
  border:2px dashed grey;
  display: flex;
  align-items: center;
  justify-content: center;
}
>>> .inner:hover {
  cursor: pointer;
}

>>> .el-table td {
  padding: 4px 0;
}

>>> .dragging {
  background-color: lightgrey
}

.el-icon-caret-bottom, .el-icon-caret-top {
  height: 20px
}

</style>