<template>
  <a-layout>
    <a-layout-header>
      <a-input-search
        v-model="query"
        @search="fetchLeads"
        placeholder="Search for leads"
        enter-button
      />
    </a-layout-header>
    <a-layout-content>
      <a-list
        :dataSource="leads"
        :renderItem="item => (
          <a-list-item>
            <a-list-item-meta
              :title="item.name"
              :description="`Contacts: ${item.contacts.map(c => c.name).join(', ')}`"
            />
          </a-list-item>
        )"
      />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import 'ant-design-vue/dist/antd.css';
import { Layout, Input, List } from 'ant-design-vue';

export default defineComponent({
  name: 'App',
  components: {
    'a-layout': Layout,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-input-search': Input.Search,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
  },
  setup() {
    const query = ref('');
    const leads = ref([]);

    const fetchLeads = async () => {
      const response = await axios.get('http://localhost:3000/api/leads', {
        params: { query: query.value },
      });
      leads.value = response.data;
    };

    return {
      query,
      leads,
      fetchLeads,
    };
  },
});
</script>
