<template>
  <!-- 搜索和添加区域 -->
  <div
    class="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0"
  >
    <el-input
      v-model="searchQuery"
      style="max-width: 450px"
      :placeholder="$t('system.role-search')"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
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
      prop="createdAt"
      :label="$t('system.role-table.createdAt')"
    />
    <el-table-column
      prop="updatedAt"
      :label="$t('system.role-table.updatedAt')"
    />
    <el-table-column
      fixed="right"
      prop="action"
      :label="$t('system.role-table.action')"
      align="center"
    >
      <template #default="scope">
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
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页区域 -->
  <el-pagination
    v-model:current-page="pagination.current"
    v-model:page-size="pagination.pageSize"
    :page-sizes="[100, 200, 300, 400]"
    :size="pagination.size"
    :background="pagination.background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagination.total"
    :hide-on-single-page="pagination.hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'SystemRole',
  setup() {
    const state = reactive({
      searchQuery: '',
      tableRef: null,
      tableData: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 2,
        total: 3,
        size: 'default',
        background: true,
        hideOnSinglePage: false,
      },
    })

    const handleSearch = () => {
      console.log(state.searchQuery, 'searchQuery')
    }

    const handleAddRole = () => {
      console.log('添加角色')
    }

    const handleEditRole = row => {
      console.log({ ...row }, '编辑角色')
    }

    const handleDeleteRole = row => {
      console.log({ ...row }, '删除角色')
    }

    const handleSizeChange = pageSize => {
      console.log(pageSize, 'pageSize')
    }

    const handleCurrentChange = current => {
      console.log(current, 'current')
    }

    onMounted(() => {
      state.tableData = [
        {
          name: '管理员',
          code: 'admin',
          description: '管理员',
          createdAt: '2021-01-01',
          updatedAt: '2021-01-01',
        },
        {
          name: '测试员',
          code: 'test',
          description: '测试员',
          createdAt: '2021-01-01',
          updatedAt: '2021-01-01',
        },
        {
          name: '访客',
          code: 'guest',
          description: '访客',
          createdAt: '2021-01-01',
          updatedAt: '2021-01-01',
        },
      ]
    })

    return {
      ...toRefs(state),
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
    }
  },
})
</script>
<style></style>
