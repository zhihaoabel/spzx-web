// composables/usePagination.js
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export function usePagination(fetchData) {
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [1, 10, 20, 50, 100],
    size: 'default',
    background: true,
    hideOnSinglePage: false,
  })

  const loading = ref(false)
  const tableData = ref([])

  // 处理搜索
  const handleSearch = async (params = {}) => {
    loading.value = true
    try {
      const { code, message, data } = await fetchData({
        current: pagination.current,
        pageSize: pagination.pageSize,
        ...params,
      })

      if (code === 20000) {
        tableData.value = data.records || []
        pagination.total = data.total || 0
        pagination.current = data.current || 1
        return data
      }
      ElMessage.error(message)
      return null
    } catch (error) {
      ElMessage.error('获取数据失败')
      return null
    } finally {
      loading.value = false
    }
  }

  // 处理页码变化
  const handleCurrentChange = current => {
    pagination.current = current
    handleSearch()
  }

  // 处理每页条数变化
  const handleSizeChange = size => {
    pagination.pageSize = size
    pagination.current = 1 // 重置到第一页
    handleSearch()
  }

  // 重置分页
  const resetPagination = () => {
    pagination.current = 1
    pagination.pageSize = 10
    handleSearch()
  }

  return {
    pagination,
    loading,
    tableData,
    handleSearch,
    handleCurrentChange,
    handleSizeChange,
    resetPagination,
  }
}
