<template>
  <div id="app">
    <header id="site-header">
      <span id="site-title">Disney Parks Timeline Project</span>
    </header>
    <nav id="site-nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/timeline">Timeline</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" id="site-body"/>
    </transition>
  </div>
</template>

<style lang="scss">
@import-normalize;

body {
  margin: 0;
}

p,
ol,
ul {
  line-height: 1.8;
  margin: 0 0 1.5rem 0;
}

a {
  color: #2c3e50;
  transition: color 0.2s;

  &:hover {
    color: #42b983;
  }
}

hr {
  background-color: #ddd;
  border: none;
  height: 1px;
  margin: 0 0 1.5rem 0;
}

img {
  display: block;
  margin-bottom: 1rem;
  max-width: 100%;
}

button {
  background-color: #42b983;
  border: 0;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 2rem;
  transition: background 0.3s;

  &:hover {
    background-color: #2c3e50;
    cursor: pointer;
  }
}

figure {
  background-color: #fff;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
  display: inline-block;
  margin: 0 0 1.5rem 0;
  max-width: 100%;
  padding: 1rem;

  img {
    display: block;
    margin-bottom: 1rem;
  }

  /* Alternate centering technique required due to inline-block */
  &.align-center {
    left: 50%;
    position: relative;
    transform: translateX(-50%);
  }
}

figcaption {
  font-size: 0.75rem;
  line-height: 1.4;
  padding: 0 0.5rem;

  /* Workaround for wrapping text */
  min-width: 100%;
  width: 0;
}

.wrapper {
  margin: auto;
  max-width: 60rem;
  padding: 0 4rem;
}

.align-left {
  float: left;
  margin-right: 1.5rem;
}

.align-center {
  margin-left: auto;
  margin-right: auto;
}

.align-right {
  float: right;
  margin-left: 1.5rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  bottom: 0;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  left: 0;
  overflow-x: hidden; // Crop timeline; otherwise, rightmost notch might cause scrolling
  position: absolute;
  right: 0;
  top: 0;
}

#site-header {
  background-color: #fff;
  padding-top: 2rem;
  position: relative;
  text-align: center;
  z-index: 2;
}

#site-title {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 1rem;
}

#site-nav {
  background-color: #fff;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.25);
  position: sticky;
  text-align: center;
  top: 0;
  z-index: 1;

  ul {
    border-top: 1px solid #ddd;
    display: inline-block;
    margin: 0;
    padding: 0 2rem;
  }

  li {
    display: inline-block;
    line-height: 1;
  }

  a {
    color: #2c3e50;
    display: inline-block;
    font-weight: bold;
    padding: 0.625rem 1rem;
    text-decoration: none;
    transition: background 0.3s, color 0.2s;

    &:hover {
      background-color: #eee;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#site-body {
  padding-top: 2rem;
}
</style>
