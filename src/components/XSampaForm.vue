<template>
  <div class="x-sampa-form">
    <h1>X-Sampa Translator</h1>
    <textarea
      id="input"
      class="inoutput input"
      v-model="input"
      placeholder='/h@"l@U "w3:ld/'
    ></textarea>
    <hr />
    <div id="output" class="inoutput output">
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>

<script>
import strictUriEncode from 'strict-uri-encode';
import translate from 'x-sampa';
import autosize from 'autosize';

function updateAlignment(value, targets) {
  targets.forEach((el) => {
    const method = value.search(/\n/g) > -1 ? 'add' : 'remove';
    el.classList[method]('align-left');
  });
}

export default {
  name: 'XSampaForm',
  computed: {
    input: {
      get() {
        return this.$store.state.input;
      },
      set(value) {
        this.$store.commit('setInput', value);
        this.$router.push({ path: '/', query: { q: strictUriEncode(value) } });
        autosize.update(input);
      },
    },
    output() {
      return translate(this.$store.state.input);
    },
    alignment() {
      return this.input.search(/\n/g) ? 'align-left' : 'align-right';
    },
  },
  mounted() {
    const input = document.querySelector('#input');
    const inputOutput = document.querySelectorAll('.inoutput');
    updateAlignment(input.value, inputOutput);
    input.addEventListener('input', event => updateAlignment(event.target.value, inputOutput));
    autosize(input);
    autosize.update(input);
  },
};
</script>

<style scoped>
.x-sampa-form {
  padding-left: 5vw;
  padding-right: 5vw;
}

.input {
  border: none;
  width: 100%;
  resize: none;
}

.inoutput {
  font-size: 20pt;
}

.align-left {
  text-align: left;
}

.inoutput:not(.align-left) {
  text-align: center;
}

pre {
  font-family: inherit;
}
</style>
