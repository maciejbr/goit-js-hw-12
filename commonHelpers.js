import{a as g,S as h,i as l}from"./assets/vendor-c493984e.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const S="45133531-217ba4dc206fd3adb926b5b11",x="https://pixabay.com/api/";g.defaults.baseURL="https://pixabay.com/api/";const P=async(r,i=1)=>{const s=new URLSearchParams({key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:i});try{return(await g.get(`${x}?${s}`)).data}catch(a){throw console.log(a),a}},f=document.querySelector(".form"),p=document.querySelector(".gallery"),y=document.querySelector(".loader"),c=document.querySelector(".load-more");let d=1,n="";const m=new h(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:"250",overlayOpacity:.8});f.addEventListener("submit",$);c.addEventListener("click",O);function $(r){if(r.preventDefault(),n=r.target.elements.query.value.trim(),!n){l.error({message:"Sorry, you have to type something in the search field. Please try again!",position:"topRight"});return}d=1,b(),p.innerHTML="",c.classList.add("hidden"),L(n,d),f.reset()}async function L(r,i){b();try{const s=await P(r,i);if(u(),s.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}q(s.hits),m?m.refresh():m=new h(".gallery a",{captionsData:"alt",captionDelay:250}),s.hits.length<40?(l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c.classList.add("hidden")):c.classList.remove("hidden");const{height:a}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}catch{u(),l.error()}}function q(r){const i=r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:t,views:o,comments:v,downloads:w})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img class="gallery-image" src="${s}" alt="${e}">
          </a>
          <div class="image-stats">
            <ul class="image-stats-list">
              <li class="image-stats-item">
                <p class="image-stats-title">Likes</p>
                <p class="image-stats-text">${t}</p>
              </li>
              <li class="image-stats-item">
                <p class="image-stats-title">Views</p>
                <p class="image-stats-text">${o}</p>
              </li>
              <li class="image-stats-item">
                <p class="image-stats-title">Comments</p>
                <p class="image-stats-text">${v}</p>
              </li>
              <li class="image-stats-item">
                <p class="image-stats-title">Downloads</p>
                <p class="image-stats-text">${w}</p>
              </li>
            </ul>
          </div>
        </li>`).join("");p.insertAdjacentHTML("beforeend",i)}function b(){y.classList.add("active")}function u(){y.classList.remove("active")}function O(){d+=1,L(n,d)}
//# sourceMappingURL=commonHelpers.js.map
