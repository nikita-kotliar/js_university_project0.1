(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();async function W(e,t,s,r=""){let o=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`;return r.trim()&&(o+=`&name=${r}`),(await fetch(o)).json()}async function V(e,t,s,r,o){let i=e.toLowerCase();i==="body parts"&&(i="bodypart");const c=`
    https://your-energy.b.goit.study/api/exercises?
    ${i}=${t}
    &keyword=${s}
    &page=${r}
    &limit=${o}
  `.replace(/\s+/g,"");return(await fetch(c)).json()}async function z(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}async function I(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function T(e,{email:t,rate:s,comment:r}){const o=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const i=await fetch(o,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:r})});if(!i.ok){const c=await i.json();throw new Error(c.message||"Rating failed")}return i.json()}const E="userFavorites",x="dailyQuote",S="quoteTimestamp",B=864e5,g=()=>{try{const e=localStorage.getItem(E);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load favorites:",e.message),[]}},$=e=>{localStorage.setItem(E,JSON.stringify(e))},q=e=>g().some(t=>t._id===e),O=e=>{const t=g();t.some(s=>s._id===e._id)||(t.push(e),$(t))},L=e=>{const t=g().filter(s=>s._id!==e);$(t)},M=e=>q(e._id)?(L(e._id),!1):(O(e),!0);async function A(){const e=localStorage.getItem(x),t=localStorage.getItem(S);if(e&&t&&Date.now()-Number(t)<B)return JSON.parse(e);try{const s=await I();return localStorage.setItem(x,JSON.stringify(s)),localStorage.setItem(S,Date.now().toString()),s}catch(s){return console.error("Failed to fetch daily quote:",s),e?JSON.parse(e):{text:"No quote available",author:"Unknown"}}}function N(e){return e.map(({_id:t,name:s,burnedCalories:r,bodyPart:o,target:i,time:c=3})=>{const b=`${r} / ${c} min`;return`
        <li class="exercise-information" data-id-card="${t}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <button
                data-action="delete"
                data-id="${t}"
                class="trash-btn">
                <svg width="16" height="16">
                  <use href="/iconic.svg#icon-trash"></use>
                </svg>
              </button>
            </div>

            <button
              data-action="start"
              data-id="${t}"
              class="details-link">
              Start
              <svg width="16" height="16">
                <use href="/iconic.svg#icon-arrow"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-header">
            <svg width="24" height="24">
              <use href="/iconic.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${s}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${b}</li>
            <li><span>Body part:</span> ${o}</li>
            <li><span>Target:</span> ${i}</li>
          </ul>
        </li>
      `}).join("")}async function F(e){const{quote:t,author:s}=await A();e.innerHTML=` 
    <svg width="32" height="32" class="quote-text-icon">
      <use href="/iconic.svg#icon-run"></use>
    </svg>
    <div>
      <h3 class="main-quote-title">Quote of the day</h3>
      <p class="main-quote-text">${t}</p>
      <p class="main-quote-author">${s}</p>
      <svg width="24" height="24" class="quote-text-icon-commas">
        <use href="/iconic.svg#icon-commas"></use>
      </svg>
    </div>
    `}const u={root:document.querySelector(".container-fav"),quote:document.querySelector(".quote")};let a=1;const h=8,P=1140,D=(e,t)=>e.slice((t-1)*h,t*h),R=e=>e.filter((t,s,r)=>s===r.findIndex(o=>o._id===t._id));function C(e){if(e<=1)return"";let t='<ul class="pagination">';t+=m(a-1,"←",a===1);for(let s=1;s<=e;s++)s===1||s===e||Math.abs(s-a)<=1?t+=m(s,s,!1,s===a):(s===a-2||s===a+2)&&(t+='<li class="dots">...</li>');return t+=m(a+1,"→",a===e),t+="</ul>",t}function m(e,t,s=!1,r=!1){return`
    <li>
      <button
        class="pagination-btn ${r?"active":""}"
        data-page="${e}"
        ${s?"disabled":""}>
        ${t}
      </button>
    </li>
  `}function p(){if(!u.root)return;const e=R(g()),t=window.innerWidth>=P;if(!e.length){u.root.innerHTML=`
      <p class="no_cards_wrapper">
        You haven't added any exercises to your favorites yet.
      </p>
    `;return}const s=Math.ceil(e.length/h);a>s&&(a=s);const r=t?e:D(e,a);u.root.innerHTML=`
    <ul class="fav_card_list">
      ${N(r)}
    </ul>
    ${t?"":C(s)}
  `}var w;(w=u.root)==null||w.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),r=e.target.closest(".pagination-btn");if(t&&(L(t.dataset.id),p()),s){const o=g().find(i=>i._id===s.dataset.id);o&&H(o,!0)}if(r){const o=Number(r.dataset.page);if(o===a||o<1)return;a=o,p()}});window.addEventListener("resize",()=>{a=1,p()});p();F(u.quote);const n={closeBtn:document.getElementById("form-close-btn"),backdrop:document.querySelector(".backdrop"),form:document.querySelector(".backdrop-form"),email:document.getElementById("user-email"),comment:document.getElementById("user-comment"),ratingWrapper:document.querySelector(".rating-wrapper"),ratingValue:document.querySelector(".rating-star-value"),stars:document.querySelectorAll(".rating-star-icons")};let k=null;const l={rate:0,email:"",comment:""},j=()=>{n.form.reset(),l.rate=0,n.ratingValue.textContent="0.0",n.stars.forEach(e=>e.style.fill="var(--white-20)")};n.closeBtn.onclick=()=>n.backdrop.classList.remove("is-open");n.backdrop.onclick=e=>{e.target===n.backdrop&&n.backdrop.classList.remove("is-open")};n.ratingWrapper.onclick=({target:e})=>{const t=Number(e.dataset.id);t&&(l.rate=t,n.ratingValue.textContent=`${t}.0`,n.stars.forEach((s,r)=>{s.style.fill=r<t?"var(--star-color)":"var(--white-20)"}))};const Q=e=>{k=e,n.backdrop.classList.add("is-open")};n.form.onsubmit=async e=>{if(e.preventDefault(),l.email=n.email.value.trim(),l.comment=n.comment.value.trim()||void 0,!l.rate)return alert("Please select a rating");if(!l.email)return alert("Please enter your email");try{await T(k,l),alert("Your rating is accepted"),j(),n.backdrop.classList.remove("is-open")}catch({message:t}){alert(`Error: ${t}`)}};const d=document.querySelector(".exr-card-backdrop"),f=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;function H(e,t=!1){const s=t||q(e._id);J(e,s),d.classList.add("card-is-open"),document.body.classList.add("not-scrollable")}function J(e,t){let s=t;d.innerHTML=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/iconic.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${f(e.name)}</h3>
      <div class="rating-container">
        <ul class="star-rating-list">
          <li>
            <p class="rating-score">${e.rating}</p>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
        </ul>
      </div>
      <div class="exr-information-container">
        <div class="exr-info-block">
          <p class="info-label">Target</p>
          <p class="exr-info" id="exr-target">${f(e.target)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${f(e.bodyPart)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${f(e.equipment)}</p>
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
            <use href="/iconic.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`,K(e.rating);const r=document.querySelector(".add-favourite-btn");r.addEventListener("click",()=>{s=M(e),console.log(s),r.innerHTML=`
    ${s?"Remove from":"Add to favourites"}
    <svg class="heart-icon" width="20" height="20">
      <use href="/iconic.svg#icon-heart"></use>
    </svg>
  `,p()}),document.getElementById("close-card").onclick=v,d.onclick=o=>o.target===d&&v(),document.querySelector(".give-rating-btn").onclick=()=>{v(),Q(e._id)}}function v(){d.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}function K(e){document.querySelectorAll(".star-rating-icon").forEach((t,s)=>{s<Math.round(e)&&(t.style.fill="#eea10c")})}const U=document.querySelector(".mobile-menu"),Y=document.querySelector(".open-mobile-menu-btn"),G=document.querySelector(".close-mobile-menu-btn"),_=document.querySelector(".mobile-menu-wrapper");U.addEventListener("click",e=>{e.stopPropagation()});const y=e=>{_.classList.toggle("is-open",e),document.body.classList.toggle("not-scrollable",e)};Y.addEventListener("click",()=>y(!0));G.addEventListener("click",()=>y(!1));_.addEventListener("click",()=>y(!1));export{V as a,N as b,W as f,H as h,z as p,F as r};
//# sourceMappingURL=header-x7bemRAT.js.map
