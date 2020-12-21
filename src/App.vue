<template>
  <div id="app">
    <header id="site-header">
      <span id="site-title">Disney Parks Timeline Project</span>

      <nav id="site-nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/timeline">Timeline</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    </header>
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
li {
  line-height: 1.8;
}

a {
  color: #2c3e50;
  transition: color 0.2s;

  &:hover {
    color: lighten(#2c3e50, 25%);
  }
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

.wrapper {
  margin: auto;
  max-width: 60rem;
  padding: 0 4rem;
}

.align-left {
  float: left;
  margin-right: 1rem;
}

.align-center {
  margin-left: auto;
  margin-right: auto;
}

.align-right {
  float: right;
  margin-left: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#site-header {
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.25);
  padding-top: 2rem;
  text-align: center;
}

#site-title {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 1rem;
}

#site-nav {
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
