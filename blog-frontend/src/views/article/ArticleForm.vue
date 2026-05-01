<template>
  <el-card>
    <template #header>
      <span>{{ isEdit ? '编辑文章' : '新增文章' }}</span>
    </template>

    <el-form :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>

      <el-form-item label="摘要">
        <el-input
          v-model="form.summary"
          type="textarea"
          placeholder="请输入文章摘要"
        />
      </el-form-item>

      <el-form-item label="封面图">
        <el-input v-model="form.cover" placeholder="请输入封面图地址" />
      </el-form-item>

      <el-form-item label="内容">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="10"
          placeholder="请输入文章内容"
        />
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">
          保存
        </el-button>

        <el-button @click="back">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  addArticle,
  getArticleById,
  updateArticle
} from '@/api/article'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  id: null,
  title: '',
  summary: '',
  content: '',
  cover: '',
  status: 1
})

const loadDetail = async () => {
  if (!isEdit.value) {
    return
  }

  const res = await getArticleById(route.params.id)

  if (res.code === 200) {
    Object.assign(form, res.data)
  }
}

const submit = async () => {
  if (!form.title) {
    ElMessage.warning('请输入文章标题')
    return
  }

  if (!form.content) {
    ElMessage.warning('请输入文章内容')
    return
  }

  let res

  if (isEdit.value) {
    res = await updateArticle(form)
  } else {
    res = await addArticle(form)
  }

  if (res.code === 200) {
    ElMessage.success('保存成功')
    router.push('/articles')
  }
}

const back = () => {
  router.push('/articles')
}

onMounted(() => {
  loadDetail()
})
</script>