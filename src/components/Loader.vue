<template>
  <div class="loader">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data() {
    return {

    };
  },
};
</script>

<style scoped lang="scss">
.loader {
  text-align: center;
}

.spinner {
  margin: 3rem auto 0;
  width: 10rem;
  text-align: center;
}

.spinner > div {
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  background-color: #586572;
  border-radius: 100%;
  display: inline-block;
  margin: 0 0.25rem;
  height: 1rem;
  width: 1rem;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}
</style>
