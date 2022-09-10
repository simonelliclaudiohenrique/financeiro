<template>
    <v-container
      fluid
      align-center
    >
      <v-row class="align-center justify-center">
       <label class="file justify-center">
        <input
        ref="file"
          type="file"
          style="display: none"
          multiple
          accept="image/png, image/JPEG"
          @change="openFile($event)"
        >
         <span>Clique para selecionar uma imagem</span>
         <div>
          <img src="" alt="">
         </div>
          <v-btn @click="onUpload()">dfaf</v-btn>
       </label>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'paginaDespesas',
  data: () => ({
    selectedFile: []
  }),
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files
    },
    openFile (e) {
      this.selectedFile = e.target.files[0]
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      window.console.log(fd.append('image', this.selectedFile, this.selectedFile.name))
      window.console.log(this.selectedFile)
    }
  }
}
</script>
<style scoped>
  .file {
    display: flex;
    width: 500px;
    height: 300px;
    background: #5a595a;
    align-items: center;
  }
</style>
