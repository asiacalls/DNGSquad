var navbar = document.getElementById("navbar");
var scrollOffset = navbar.offsetTop;

window.addEventListener("scroll", function() {
  if (window.pageYOffset > scrollOffset) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


$(window).on('load', function () {
  setFlowBanner();  
})

function setFlowBanner(){
  const $wrap = $('.flow_banner');
  const $list = $('.flow_banner .list');
  let wrapWidth = '';
  let listWidth = '';
  const speed = 50; 

  //리스트 복제
  let $clone = $list.clone();
  $wrap.append($clone);
  flowBannerAct()

  let oldWChk = window.innerWidth > 1279 ? 'pc' : window.innerWidth > 767 ? 'ta' : 'mo';
  $(window).on('resize', function() {
      let newWChk = window.innerWidth > 1279 ? 'pc' : window.innerWidth > 767 ? 'ta' : 'mo';
      if (newWChk != oldWChk) {
          oldWChk = newWChk;
          flowBannerAct();
      }
  });

  function flowBannerAct() {
      if(wrapWidth != ''){
          $wrap.find('.list').css({ 'animation': 'none' });
          $wrap.find('.list').slice(2).remove();
      }
      wrapWidth = $wrap.width();
      listWidth = $list.width();

      if (listWidth < wrapWidth) {
          const listCount = Math.ceil(wrapWidth * 2 / listWidth);
          for (let i = 2; i < listCount; i++) {
              $clone = $clone.clone();
              $wrap.append($clone);
          }
      }
      $wrap.find('.list').css({ 'animation': `${listWidth / speed}s linear infinite flowRolling` }); 
  } 
}

function buyClicked() {
  window.open('https://www.dextools.io/app/en/ether/pair-explorer/0xe6a8a7316b4379e5ec9b453f0d3577ea3942695b', '_blank'); 
}

// window.addEventListener('scroll', function() {
//   var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//   if (scrollPosition < getScrollPosition('about')) {
//     var elementId = 'home';
//   } else if(scrollPosition < getScrollPosition('buy')){
//     var elementId = 'about';
//   } else if(scrollPosition < getScrollPosition('tokenomics')){
//     var elementId = 'buy'; 
//   } else if(scrollPosition < getScrollPosition('partners')){
//     var elementId = 'tokenomics';
//   } else {
//     var elementId = 'partners';
//   }
// });

// function getScrollPosition(elementId) {
//   var element = document.getElementById(elementId);
  
//   if (element) {
//     var elementPosition = element.getBoundingClientRect();
//     var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//     var elementScrollPosition = elementPosition.top + scrollPosition;
//     return elementScrollPosition
//     // console.log("Scroll position of #" + elementId + ": " + elementScrollPosition);
//   } else {
//     console.log("Element with ID '" + elementId + "' not found.");
//     return 0
//   }
// }

function copyContractAddress() {
  var a = "Contract : 0xf9B7Fa69E227e33f62556dDA5C4662565fc5D048"
  var start = 11;

  var getButton = document.getElementById("contract_copy");

  var range = document.createRange();
  range.selectNodeContents(getButton);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  var selectedText = selection.toString();
  var cutText = selectedText.substring(start);

  var tempTextarea = document.createElement("textarea");
  tempTextarea.style.position = "absolute";
  tempTextarea.style.left = "-9999px";
  document.body.appendChild(tempTextarea);
  tempTextarea.value = cutText;
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);

  selection.removeAllRanges();
  getButton.textContent = "Copy successful!";

  setTimeout(function() {
    getButton.textContent = a;
  }, 2000);
}