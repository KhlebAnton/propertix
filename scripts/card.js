gsap.registerPlugin(ScrollTrigger);

const wrappers = gsap.utils.toArray(".card_wrapper");
const total = wrappers.length;

wrappers.forEach((wrapper, i) => {
  const card = wrapper.querySelector(".card");

  gsap.set(card, { zIndex: i });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top center",
      end: "bottom center",
      scrub: true,
    }
  });


  tl.fromTo(card, 
    { y: 100, scale: 1 },
    { y: 0, scale: 1, zIndex: total + i, ease: "none" }, 0);


  for(let j = 0; j < i; j++) {
    const prevCard = wrappers[j].querySelector(".card");
    const stackPos = i - j;
    tl.to(prevCard, {
      y: -30 * stackPos,
      scale: 0.9 - 0.05 * (stackPos - 1),
      ease: "none"
    }, 0);
  }

  for(let k = i + 1; k < total; k++) {
    const nextCard = wrappers[k].querySelector(".card");
    gsap.set(nextCard, { y: 100, scale: 1 });
  }
});
