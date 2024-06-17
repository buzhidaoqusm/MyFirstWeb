<template>
  <el-card class="page-container">
      <template #header>
          <div class="header">
              <span>User</span>
          </div>
      </template>
      <el-table :data="user" style="width: 100%">
          <el-table-column label="ID" width="100" prop="id"> </el-table-column>
          <el-table-column label="Account" prop="account"></el-table-column>
          <el-table-column label="Password" prop="password"></el-table-column>
          <template #empty>
              <el-empty description="没有数据" />
          </template>
      </el-table>
  </el-card>
</template>

<script>
import { ref } from 'vue'
import { userListService } from '@/api/test.js'
export default {
  name: 'Test',
  setup() {
    const user = ref([]);

    const userList = async () => {
      try {
        let result = await userListService();
        user.value = result.data;
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    }

    userList();

    return {
      user
    }
  }
}
</script>

<style></style>