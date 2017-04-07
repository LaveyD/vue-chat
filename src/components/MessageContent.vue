<script>
  import { mapState } from 'vuex';

  export default {
    name: 'MessageContent',
    data() {
      return {
        session: '',
      };
    },
    mounted() {
      this.initData();
    },
    filters: {
      // 将日期过滤为 hour:minutes
      time(date) {
        if (typeof date === 'string') {
          const tempDate = new Date(date);
          return `${tempDate.getHours()}:${tempDate.getMinutes()}`;
        }
        return `${date.getHours()}:${date.getMinutes()}`;
      },
    },
    computed: {
      ...mapState([
        'user', 'sessions', 'currentSessionId',
      ]),
    },
    methods: {
      initData() {
        this.session = this.sessions.find(session => session.id === this.currentSessionId);
      },
    },
  };
</script>

<template>
  <div class="message">
    <ul v-if="session">
      <li v-for="item in session.messages">
        <p class="time">
          <span>{{ item.date | time }}</span>
        </p>
        <div class="main" :class="{ self: item.self }">
          <div class="text">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .message {
    padding: 10px 15px;
    overflow-y: scroll;

    li {
      margin-bottom: 15px;
    }
    .time {
      margin: 7px 0;
      text-align: center;

      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: ~'calc(100% - 40px)';
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #b2e281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
</style>
