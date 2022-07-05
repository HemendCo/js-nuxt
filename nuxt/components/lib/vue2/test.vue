<template lang="html">
  <div class="custom-counter">
    HemendTest
  </div>
</template>

<script>
// components/lib/test.vue
export default {
  computed: {
    pluginOptions() {
      return this.options || {}
    },
    injectedPluginName() {
      const { pluginOptions } = this
      return pluginOptions.namespace ? '$' + pluginOptions.namespace : undefined
    }
  }
}
</script>

