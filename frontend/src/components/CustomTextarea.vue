<template>
  <textarea v-model="value" ref="textarea" rows="1" @focus="resize" @keyup="resize">
  </textarea>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    this.resize();
  },
  methods: {
    resize() {
      const { textarea } = this.$refs;
      textarea.style.height = textarea.scrollHeight - 4 + 'px';
    }
  }
}
</script>

<style scoped>
textarea {
  padding: .8rem;
  font-size: 1.2em;
  border: none;
  border-radius: .7rem;
  resize: none;
  outline: none;
  overflow: hidden;
}
</style>