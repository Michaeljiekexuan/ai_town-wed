<template>
  <div id="app">
    <el-container>
      <el-main>
        <component 
          :is="activeComponent" 
          class="component-wrapper" 
          v-if="activeComponent && (activeComponent !== 'FileTable' || (fileData && fileData.files && fileData.folderPath))" 
          :files="fileData?.files" 
          :folder-path="fileData?.folderPath" 
        />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      searchText: '',
      errorMessage: '', // 用于存储错误信息
      resolveMessage: '', // 用于存储成功解析信息
      activeComponent: null, // 当前激活的组件
      fileData: null // 用于存储文件列表和文件夹路径
    }
  },
  methods: {
   
   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header {
  padding: 0;
  height: 100px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  background-color: #fff;
}

.el-main {
  background-color: #f0f2f5;
  min-height: calc(100vh - 100px);
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.header-title {
  flex: 1;
  text-align: center;
}

.header-title h1 {
  margin: 0;
  font-size: 24px;
  color: #2c3e50;
  font-weight: 600;
}

.header-title h2 {
  margin: 4px 0 0;
  font-size: 18px;
  color: #606266;
  font-weight: 400;
}

.logo-container {
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.logo {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.search-container {
  max-width: 800px;
  margin: 0 auto 20px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-input-container {
  margin-bottom: 20px;
}

.search-container h3 {
  margin: 0 0 20px;
  font-size: 16px;
  color: #2c3e50;
}

.search-examples {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
}

.example-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.example-group span {
  color: #606266;
  font-size: 14px;
}

.example-group .el-link {
  text-decoration: underline;
  color: #0066cc !important;
}

.example-group .el-link:hover {
  color: #004499 !important;
}

.example-group .el-link.el-link--primary {
  color: #0066cc !important;
}

.example-group .el-link.el-link--primary:hover {
  color: #004499 !important;
}

.error-message {
  margin-top: 10px;
  color: #f56c6c;
  font-size: 14px;
}

.resolve-message {
  margin-top: 10px;
  color: #67c23a;
  font-size: 14px;
}

.component-wrapper {
  margin-top: 20px;
}
</style>
