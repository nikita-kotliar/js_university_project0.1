import{i as f}from"./vendor-iVKk4foX.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();async function re(e,t,s,r=""){let i=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`;return r.trim()&&(i+=`&name=${r}`),(await fetch(i)).json()}async function oe(e,t,s,r,i){let o=e.toLowerCase();o==="body parts"&&(o="bodypart");const c=`
    https://your-energy.b.goit.study/api/exercises?
    ${o}=${t}
    &keyword=${s}
    &page=${r}
    &limit=${i}
  `.replace(/\s+/g,"");return(await fetch(c)).json()}async function ne(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}async function M(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function N(e,{email:t,rate:s,comment:r}){const i=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const o=await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:r})});if(!o.ok){const c=await o.json();throw new Error(c.message||"Rating failed")}return o.json()}const E="userFavorites",w="dailyQuote",S="quoteTimestamp",P=864e5,g=()=>{try{const e=localStorage.getItem(E);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load favorites:",e.message),[]}},j=e=>{localStorage.setItem(E,JSON.stringify(e))},L=e=>g().some(t=>t._id===e),R=e=>{const t=g();t.some(s=>s._id===e._id)||(t.push(e),j(t))},k=e=>{const t=g().filter(s=>s._id!==e);j(t)},F=e=>L(e._id)?(k(e._id),!1):(R(e),!0);async function C(){const e=localStorage.getItem(w),t=localStorage.getItem(S);if(e&&t&&Date.now()-Number(t)<P)return JSON.parse(e);try{const s=await M();return localStorage.setItem(w,JSON.stringify(s)),localStorage.setItem(S,Date.now().toString()),s}catch(s){return console.error("Failed to fetch daily quote:",s),e?JSON.parse(e):{text:"No quote available",author:"Unknown"}}}function D(e,t){return e.map(s=>{let{_id:r,name:i,burnedCalories:o,bodyPart:c,target:v,time:B=3,rating:O}=s,A=`${o} / ${B} min`;return`
        <li class="exercise-information" data-id-card="${r}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              ${t?`<button data-action="delete" data-id="${r}" class="trash-btn">
                      <svg width="16" height="16">
                        <use href="/js_university_project0.1/iconic.svg#icon-trash"></use>
                      </svg>
                    </button>`:`<span class="rating">
                      ${O}
                      <svg class="star-icon" width="14" height="14">
                        <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
                      </svg>
                    </span>`}
            </div>

            <button data-action="start" data-id="${r}" class="details-link">
              Start
              <svg width="16" height="16" class="arrow-icon">
                <use href="/js_university_project0.1/iconic.svg#icon-arrow"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-header">
            <svg width="24" height="24">
              <use href="/js_university_project0.1/iconic.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${i}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${A}</li>
            <li><span>Body part:</span> ${t?c:x(c)}</li>
            <li><span>Target:</span> ${t?v:x(v)}</li>
          </ul>
        </li>
      `}).join("")}function x(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}async function H(e){const{quote:t,author:s}=await C();e.innerHTML=` 
    <svg width="32" height="32" class="quote-text-icon">
      <use href="/js_university_project0.1/iconic.svg#icon-run"></use>
    </svg>
    <div>
      <h3 class="main-quote-title">Quote of the day</h3>
      <p class="main-quote-text">${t}</p>
      <p class="main-quote-author">${s}</p>
      <svg width="24" height="24" class="quote-text-icon-commas">
        <use href="/js_university_project0.1/iconic.svg#icon-commas"></use>
      </svg>
    </div>
    `}const u={root:document.querySelector(".container-fav"),quote:document.querySelector(".quote")};let a=1;const b=8,Q=1140,J=(e,t)=>e.slice((t-1)*b,t*b),U=e=>e.filter((t,s,r)=>s===r.findIndex(i=>i._id===t._id));function W(e){if(e<=1)return"";let t='<ul class="pagination">';t+=h(a-1,"←",a===1);for(let s=1;s<=e;s++)s===1||s===e||Math.abs(s-a)<=1?t+=h(s,s,!1,s===a):(s===a-2||s===a+2)&&(t+='<li class="dots">...</li>');return t+=h(a+1,"→",a===e),t+="</ul>",t}function h(e,t,s=!1,r=!1){return`
    <li>
      <button
        class="pagination-btn ${r?"active":""}"
        data-page="${e}"
        ${s?"disabled":""}>
        ${t}
      </button>
    </li>
  `}function p(){if(!u.root)return;const e=U(g()),t=window.innerWidth>=Q;if(!e.length){u.root.innerHTML=`
      <p class="no_cards_wrapper">
        You haven't added any exercises to your favorites yet.
      </p>
    `;return}const s=Math.ceil(e.length/b);a>s&&(a=s);const r=t?e:J(e,a);u.root.innerHTML=`
    <ul class="fav_card_list">
      ${D(r,!0)}
    </ul>
    ${t?"":W(s)}
  `}var $;($=u.root)==null||$.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),r=e.target.closest(".pagination-btn");if(t&&(k(t.dataset.id),p()),s){const i=g().find(o=>o._id===s.dataset.id);i&&Y(i,!0)}if(r){const i=Number(r.dataset.page);if(i===a||i<1)return;a=i,p()}});window.addEventListener("resize",()=>{a=1,p()});p();H(u.quote);const n={closeBtn:document.getElementById("form-close-btn"),backdrop:document.querySelector(".backdrop"),form:document.querySelector(".backdrop-form"),email:document.getElementById("user-email"),comment:document.getElementById("user-comment"),ratingWrapper:document.querySelector(".rating-wrapper"),ratingValue:document.querySelector(".rating-star-value"),stars:document.querySelectorAll(".rating-star-icons")};let q=null;const l={rate:0,email:"",comment:""},G=()=>{n.form.reset(),l.rate=0,n.ratingValue.textContent="0.0",n.stars.forEach(e=>e.style.fill="var(--white-20)")};n.closeBtn.onclick=()=>n.backdrop.classList.remove("is-open");n.backdrop.onclick=e=>{e.target===n.backdrop&&n.backdrop.classList.remove("is-open")};n.ratingWrapper.onclick=({target:e})=>{const t=Number(e.dataset.id);t&&(l.rate=t,n.ratingValue.textContent=`${t}.0`,n.stars.forEach((s,r)=>{s.style.fill=r<t?"var(--star-color)":"var(--white-20)"}))};const K=e=>{q=e,n.backdrop.classList.add("is-open")};n.form.onsubmit=async e=>{if(e.preventDefault(),l.email=n.email.value.trim(),l.comment=n.comment.value.trim()||void 0,!l.rate)return f.warning({title:"Warning",message:"Please select a rating",position:"topRight"});if(!l.email)return f.warning({title:"Warning",message:"Please enter your email",position:"topRight"});try{await N(q,l),f.success({title:"Success",message:"Your rating is accepted",position:"topRight"}),G(),n.backdrop.classList.remove("is-open")}catch({message:t}){f.error({title:"Error",message:t,position:"topRight"})}};const d=document.querySelector(".exr-card-backdrop"),m=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;function Y(e,t=!1){const s=t||L(e._id);z(e,s),d.classList.add("card-is-open"),document.body.classList.add("not-scrollable")}function z(e,t){let s=t;d.innerHTML=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/js_university_project0.1/iconic.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${m(e.name)}</h3>
      <div class="rating-container">
        <ul class="star-rating-list">
          <li>
            <p class="rating-score">${e.rating}</p>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
            </svg>
          </li>
        </ul>
      </div>
      <div class="exr-information-container">
        <div class="exr-info-block">
          <p class="info-label">Target</p>
          <p class="exr-info" id="exr-target">${m(e.target)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${m(e.bodyPart)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${m(e.equipment)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Popular</p>
          <p class="exr-info" id="exr-popularity">${e.popularity}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Burned Calories</p>
          <p class="exr-info" id="burned-cal">${e.burnedCalories}/${e.time} min</p>
        </div>
      </div>
      <p class="exr-description">${e.description}</p>
      <div class="buttons-cont">
        <button name="add-favorurite" class="add-favourite-btn">
          ${s?"Remove from":"Add to favourites"}
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_project0.1/iconic.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`,V(e.rating);const r=document.querySelector(".add-favourite-btn");r.addEventListener("click",()=>{s=F(e),r.innerHTML=`
    ${s?"Remove from":"Add to favourites"}
    <svg class="heart-icon" width="20" height="20">
      <use href="/js_university_project0.1/iconic.svg#icon-heart"></use>
    </svg>
  `,p()}),document.getElementById("close-card").onclick=y,d.onclick=i=>i.target===d&&y(),document.querySelector(".give-rating-btn").onclick=()=>{y(),K(e._id)}}function y(){d.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}function V(e){document.querySelectorAll(".star-rating-icon").forEach((t,s)=>{s<Math.round(e)&&(t.style.fill="#eea10c")})}const X=document.querySelector(".mobile-menu"),Z=document.querySelector(".open-mobile-menu-btn"),ee=document.querySelector(".close-mobile-menu-btn"),T=document.querySelector(".mobile-menu-wrapper"),te=document.querySelector(".header-nav-link-fav"),se=document.querySelector(".header-nav-link-home"),I=window.PAGE;I==="fav"&&te.classList.add("active");I==="home"&&se.classList.add("active");X.addEventListener("click",e=>{e.stopPropagation()});const _=e=>{T.classList.toggle("is-open",e),document.body.classList.toggle("not-scrollable",e)};Z.addEventListener("click",()=>_(!0));ee.addEventListener("click",()=>_(!1));T.addEventListener("click",()=>_(!1));export{oe as a,D as b,re as f,Y as h,ne as p,H as r};
//# sourceMappingURL=header-D5NR5ieG.js.map
