// plugins/directives/animate-on-scroll.js
import Vue from 'vue'

/*
Reference:
  https://medium.com/swlh/nuxt-creating-custom-directives-for-static-srr-sites-bf287f0cb6bb

To use:

<UserCard
  v-animate-on-scroll
/>

*/

const animateOnScrollObserver = new IntersectionObserver(
  (entries, animateOnScrollObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aniscroll-enter')
        animateOnScrollObserver.unobserve(entry.target)
      }
    })
  }
)

export const animateOnScroll = (options, app) => {
  const directiveName = options && typeof options === 'object' && 'name' in options ? options.name : 'animate-on-scroll';

  Vue.directive(directiveName, {
    bind: el => {
      el.classList.add('aniscroll-before-enter')
      animateOnScrollObserver.observe(el)
    }
  })
}