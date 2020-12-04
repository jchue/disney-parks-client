<template>
  <div class="home">
    <section class="hero">
      <span class="title">Welcome to the Disney Parks Timeline Project</span>
      <span class="subtitle">a visual chronology of areas and attractions</span>
      <router-link to="/timeline" tag="button">View the Timeline</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
#site-body {
  padding-top: 0rem;
}

.hero {
  padding: 15rem;
  position: relative;
  text-align: center;

  &::after {
    background-image: url('https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F11%2Fdisneyland-entrance-opening-DLANDBOOK1118.jpg&q=85');
    background-size: cover;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0.2;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  .title {
    display: block;
    font-size: 3rem;
    font-weight: bold;
    line-height: 0.9;
  }

  .subtitle {
    display: block;
    font-size: 1.8rem;
    padding-bottom: 1.5rem;
  }
}
</style>
