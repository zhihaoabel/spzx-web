<template>
  <div class="user-management">
    <div class="search-container flex justify-between">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item :label="$t('public.keyword')">
          <el-input
            v-model="searchForm.keyword"
            :placeholder="$t('keywordPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('public.createTime')">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            :range-separator="$t('public.to')"
            :start-placeholder="$t('public.startDate')"
            :end-placeholder="$t('public.endDate')"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">
            {{ $t('public.search') }}
          </el-button>
          <el-button @click="resetForm">{{ $t('public.reset') }}</el-button>
        </el-form-item>
      </el-form>

      <el-button type="success" @click="addUser">
        {{ $t('system.user-form.add') }}
      </el-button>
    </div>

    <el-table :data="tableData" table-layout="auto">
      <el-table-column prop="username" :label="$t('username')" />
      <el-table-column prop="realName" :label="$t('realName')" />
      <el-table-column prop="phone" :label="$t('phone')" />
      <el-table-column prop="avatar" :label="$t('avatar')">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="description" :label="$t('description')" />
      <el-table-column prop="status" :label="$t('status')">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === $t('normal') ? 'success' : 'danger'"
          >
            {{ $t(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" :label="$t('createdAt')" />
      <el-table-column :label="$t('operations')" align="center">
        <template #default="scope">
          <div class="flex items-center justify-center gap-2">
            <el-button link type="primary" @click="handleEditRole(scope.row)">
              <el-tooltip
                :content="$t('system.user-form.edit')"
                placement="top"
              >
                <el-icon :size="16" color="blue">
                  <Edit />
                </el-icon>
              </el-tooltip>
            </el-button>
            <el-button link type="primary" @click="handleDeleteRole(scope.row)">
              <el-tooltip
                :content="$t('system.user-form.delete')"
                placement="top"
              >
                <el-icon :size="16" color="red">
                  <Delete />
                </el-icon>
              </el-tooltip>
            </el-button>
            <el-button
              link
              type="primary"
              @click="handleAssignRoles(scope.row)"
            >
              <el-tooltip
                :content="$t('system.user-form.assignRoles')"
                placement="top"
              >
                <el-icon :size="16" color="orange">
                  <Icon icon="codicon:person-add" />
                </el-icon>
              </el-tooltip>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import useLang from '@/i18n/useLang'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t, locale } = useI18n()

const searchForm = reactive({
  keyword: '',
  dateRange: [],
})

const tableData = ref([
  {
    username: 'admin',
    realName: 'admin',
    phone: '13121034567',
    avatar: 'https://example.com/avatar.jpg',
    description: '',
    status: 'normal',
    createdAt: '2023-05-11',
  },
  {
    username: 'user',
    realName: 'User',
    phone: '13987654321',
    avatar: 'https://example.com/user-avatar.jpg',
    description: '',
    status: 'normal',
    createdAt: '2023-05-12',
  },
])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(2)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

const { lang } = useLang()

const onSearch = () => {
  console.log('Searching with:', searchForm)
}

const resetForm = () => {
  searchForm.keyword = ''
  searchForm.dateRange = []
}

const addUser = () => {
  console.log('Adding new user')
}

const handleEdit = row => {
  console.log('Editing user:', row)
}

const handleDelete = row => {
  ElMessageBox.confirm(t('deleteConfirmation'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: t('deleteSuccess'),
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: t('deleteCancel'),
      })
    })
}

const handleAssignRoles = row => {
  console.log('Assigning roles to user:', row)
}

onMounted(() => {})
</script>

<style></style>
