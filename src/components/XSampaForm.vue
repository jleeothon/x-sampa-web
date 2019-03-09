<template>
  <div class="x-sampa-form">
    <h1>X-Sampa Translator</h1>
    <input id="input" v-model="input" placeholder="/hello world/" />
    <div id="output">
      {{ output }}
    </div>
  </div>
</template>

<script>
import strictUriEncode from "strict-uri-encode";
import translate from "x-sampa";

export default {
  name: "XSampaForm",
  computed: {
    input: {
      get() {
        return this.$store.state.input;
      },
      set(value) {
        this.$store.commit("setInput", value);
        this.$router.push({ path: "/", query: { q: strictUriEncode(value) } });
      }
    },
    output: function() {
      return translate(this.$store.state.input);
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
