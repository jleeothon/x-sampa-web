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
    <div id="output" class="inoutput output" v-html="output"></div>
  </div>
</template>

<script>
import strictUriEncode from 'strict-uri-encode';
import translate from 'x-sampa';
import autosize from 'autosize';
import escapeGoat from 'escape-goat';

function updateAlignment(value, targets) {
  const method = value.trim().search(/\n/g) > -1 ? 'add' : 'remove';
  targets.forEach(el => el.classList[method]('align-left'));
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
      },
    },
    output() {
      const translated = translate(this.$store.state.input);
      const escaped = escapeGoat.escape(translated);
      const withLineBreaks = escaped.replace(/\n/g, '<br>');
      return withLineBreaks;
    },
    alignment() {
      return this.input.search(/\n/g) ? 'align-left' : 'align-right';
    },
  },
  mounted() {
    const input = document.querySelector('#input');
    const inputOutput = document.querySelectorAll('.inoutput');
    updateAlignment(input.value, inputOutput);
    input.addEventListener('input', e => updateAlignment(e.target.value, inputOutput));
    autosize(input);
    autosize.update(input);
    input.focus();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "DejaVu Sans";
  src: url("/DejaVuSans.ttf");
}

.x-sampa-form {
  padding-left: 5vw;
  padding-right: 5vw;
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

.input {
  border: none;
  width: 100%;
  resize: none;
}

.output {
  font-family: "DejaVu Sans";
}
</style>
