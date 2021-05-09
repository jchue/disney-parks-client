<template>
  <div class="home">
    <section id="hero">
      <div id="hero-content">
        <span class="title">Welcome to the Disney Parks Timeline Project</span>
        <span class="subtitle">a visual chronology of areas and attractions</span>
        <router-link to="/timeline" tag="button">View the Timeline</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    this.setHeroHeight();
    this.setHeroContentPosition();
  },
  methods: {
    calculateHeroHeight() {
      const header = document.getElementById('site-header');
      const headerHeight = header.offsetHeight;
      const windowHeight = window.innerHeight;

      return windowHeight - headerHeight;
    },
    setHeroHeight() {
      const heroHeight = this.calculateHeroHeight();
      const hero = document.getElementById('hero');

      hero.setAttribute('style', `height: ${heroHeight}px;`);
    },
    setHeroContentPosition() {
      const heroHeight = this.calculateHeroHeight();

      const heroContent = document.getElementById('hero-content');
      const heroContentHeight = heroContent.offsetHeight;

      const heroContentTop = (heroHeight / 2) - (heroContentHeight / 2);

      heroContent.setAttribute('style', `margin-top: ${heroContentTop}px;`);
    },
  },
};
</script>

<style lang="scss" scoped>
#site-body {
  padding-top: 0rem;
}

#hero {
  overflow: auto;
  padding: 0 4rem;
  position: relative;

  &::after {
    background-image: url('~@/assets/disneyland-retro-sign.jpg');
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

  #hero-content {
    box-sizing: border-box;
    margin: auto;
    text-align: center;
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
