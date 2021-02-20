import anime from "animejs";


export default {
  transition: {
    css: false,
    enter(el, done) {
      el.style.willChange = 'all';
      anime({
        targets: el,
        translateX: [-250, 0],
        opacity: [0, 1],
        complete: done
      })
    },
    leave(el, done) {
      anime({
        targets: el,
        translateX: 250,
        opacity: [1, 0],
        duration: 150,
        complete: done
      })
    }
  }
}
