<template>
  <div class="chat-viewer-container">
    <div class="filter-section">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="to"
        start-placeholder="Start date"
        end-placeholder="End date"
        class="date-picker"
      />

      <el-select v-model="user1" placeholder="Select User 1" class="user-select">
        <el-option
          v-for="user in users"
          :key="user"
          :label="user"
          :value="user"
        />
      </el-select>

      <el-select v-model="user2" placeholder="Select User 2" class="user-select">
        <el-option
          v-for="user in users"
          :key="user"
          :label="user"
          :value="user"
        />
      </el-select>

      <el-button type="primary" @click="fetchChatRecords">View Chats</el-button>
    </div>

    <div class="chat-records" v-if="chatRecords.length">
      <div
        v-for="(record, index) in chatRecords"
        :key="index"
        class="chat-record"
        :class="{ left: record.sender === user1, right: record.sender === user2 }"
      >
        <p><strong>{{ record.sender }}</strong>: {{ record.message }}</p>
        <p class="time">{{ record.time }}</p>
      </div>
    </div>

    <div v-else class="no-records">
      <p>No chat records found for the selected criteria.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ChatViewer',
  setup() {
    const dateRange = ref([]);
    const user1 = ref(null);
    const user2 = ref(null);
    const users = ref(['tom', 'anna', 'yuri', 'jack','emily']); // Example user list
    const chatRecords = ref([]);
    const recordsFetched = ref(false);

    const fetchChatRecords = async () => {
      recordsFetched.value = true;
      if (user1.value && user2.value && dateRange.value.length === 2) {
        try {
          const response = await fetch('http://localhost:5000/api/chats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              start_date: dateRange.value[0],
              end_date: dateRange.value[1],
              user1: user1.value,
              user2: user2.value
            })
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch chat records: ${response.statusText}`);
          }

          const data = await response.json();
          chatRecords.value = data.success ? data.data : [];
        } catch (error) {
          console.error('Error fetching chat records:', error);
          chatRecords.value = [];
        }
      } else {
        chatRecords.value = [];
      }
    };

    return {
      dateRange,
      user1,
      user2,
      users,
      chatRecords,
      recordsFetched,
      fetchChatRecords
    };
  }
};
</script>

<style scoped>
.chat-viewer-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.filter-section {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.date-picker {
  flex: 2;
}

.user-select {
  flex: 1;
}

.chat-records {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-record {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 60%;
}

.chat-record.left {
  align-self: flex-start;
  background-color: #e6f7ff;
}

.chat-record.right {
  align-self: flex-end;
  background-color: #f6ffed;
}

.chat-record strong {
  color: #409eff;
  font-weight: bold;
}

.chat-record p {
  margin: 5px 0 0;
  color: #606266;
  line-height: 1.5;
}

.no-records {
  text-align: center;
  color: #909399;
  margin-top: 20px;
  font-style: italic;
}

.el-button {
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: bold;
}

.el-button:hover {
  background-color: #66b1ff;
}
</style>
