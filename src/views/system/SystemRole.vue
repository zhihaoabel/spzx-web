<template>
  <!-- 搜索和添加区域 -->
  <div
    class="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0"
  >
    <el-input
      v-model="searchQuery"
      class="sm:max-w-80"
      :placeholder="$t('system.role-search')"
      @keyup.enter="handleSearchClick"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearchClick" />
      </template>
    </el-input>
    <el-button
      type="primary"
      :icon="Plus"
      class="font-sans"
      @click="handleAddRole"
    >
      {{ $t('system.role-table.add') }}
    </el-button>
  </div>

  <!-- 表格区域 -->
  <el-table
    header-row-class-name="text-gray-800"
    table-layout="auto"
    ref="tableRef"
    :data="tableData"
    :loading="loading"
    stripe
  >
    <el-table-column prop="name" :label="$t('system.role-table.name')" />
    <el-table-column prop="code" :label="$t('system.role-table.code')" />
    <el-table-column
      prop="description"
      :label="$t('system.role-table.description')"
    />
    <el-table-column
      prop="createTime"
      :label="$t('system.role-table.createdAt')"
    />
    <el-table-column
      prop="updateTime"
      :label="$t('system.role-table.updatedAt')"
    />
    <el-table-column
      fixed="right"
      prop="action"
      :label="$t('system.role-table.action')"
      align="center"
    >
      <template #default="scope">
        <div class="flex items-center justify-center">
          <el-button link type="primary" @click="handleEditRole(scope.row)">
            <el-icon :size="16" color="blue">
              <Edit />
            </el-icon>
          </el-button>
          <el-button link type="primary" @click="handleDeleteRole(scope.row)">
            <el-icon :size="16" color="red">
              <Delete />
            </el-icon>
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页区域 -->
  <el-pagination
    v-model:current-page="pagination.current"
    v-model:page-size="pagination.pageSize"
    :page-sizes="pagination.pageSizes"
    :size="pagination.size"
    :total="pagination.total"
    :background="pagination.background"
    layout="total, sizes, prev, pager, next, jumper"
    :hide-on-single-page="pagination.hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { GetRoles } from '@/api/role'
import { usePagination } from '@/composables/usePagination'

export default defineComponent({
  name: 'SystemRole',
  setup() {
    // 使用分页逻辑
    const {
      pagination,
      loading,
      total,
      tableData,
      handleSearch,
      handleCurrentChange,
      handleSizeChange,
      resetPagination,
    } = usePagination(GetRoles)

    const tableRef = ref(null)
    const searchQuery = ref('')

    const handleAddRole = () => {
      console.log('添加角色')
    }

    const handleEditRole = row => {
      console.log({ ...row }, '编辑角色')
    }

    const handleDeleteRole = row => {
      console.log({ ...row }, '删除角色')
    }

    // 搜索按钮点击
    const handleSearchClick = async () => {
      pagination.current = 1 // 重置到第一页
      handleSearch({ name: searchQuery.value })
    }

    onMounted(async () => {
      handleSearch()
    })

    return {
      tableRef,
      Search,
      Plus,
      Edit,
      Delete,
      handleSearch,
      handleAddRole,
      handleEditRole,
      handleDeleteRole,
      handleSizeChange,
      handleCurrentChange,
      handleSearchClick,
      loading,
      pagination,
      tableData,
      searchQuery,
      total,
      resetPagination,
    }
  },
})
</script>
<style></style>
