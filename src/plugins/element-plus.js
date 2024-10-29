import { ElMessage } from 'element-plus'

export default {
  install: app => {
    app.config.globalProperties.$message = ElMessage
  },
}

export function useMessage() {
  return ElMessage
}
