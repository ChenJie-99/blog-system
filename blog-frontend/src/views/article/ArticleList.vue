<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>文章管理</span>

        <el-button type="primary" @click="goAdd">
          新增文章
        </el-button>
      </div>
    </template>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" width="80" />

      <el-table-column prop="title" label="标题" />

      <el-table-column prop="summary" label="摘要" />

      <el-table-column prop="viewCount" label="浏览量" width="100" />

      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 1" type="success">
            正常
          </el-tag>
          <el-tag v-else type="danger">
            禁用
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="goEdit(scope.row.id)">
            编辑
          </el-button>

          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-box">
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total"
        :page-size="pageSize"
        v-model:current-page="pageNum"
        @current-change="loadData"
      />
    </div>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteArticle, getArticlePage } from '@/api/article'

const router = useRouter()

const tableData = ref([])
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)

const loadData = async () => {
  const res = await getArticlePage({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })

  if (res.code === 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}

const goAdd = () => {
  router.push('/articles/add')
}

const goEdit = (id) => {
  router.push(`/articles/edit/${id}`)
}

const handleDelete = async (id) => {
  await ElMessageBox.confirm(
    '确定要删除这篇文章吗？',
    '提示',
    {
      type: 'warning'
    }
  )

  const res = await deleteArticle(id)

  if (res.code === 200) {
    ElMessage.success('删除成功')
    loadData()
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-box {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>