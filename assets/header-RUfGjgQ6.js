import{i as f}from"./vendor-iVKk4foX.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();async function le(e,t,s,r=""){let i=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`;return r.trim()&&(i+=`&name=${r}`),(await fetch(i)).json()}async function ue(e,t,s,r,i){let o=e.toLowerCase();o==="body parts"&&(o="bodypart");const c=`
    https://your-energy.b.goit.study/api/exercises?
    ${o}=${t}
    &keyword=${s}
    &page=${r}
    &limit=${i}
  `.replace(/\s+/g,"");return(await fetch(c)).json()}async function de(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}async function D(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function H(e,{email:t,rate:s,comment:r}){const i=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const o=await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:r})});if(!o.ok){const c=await o.json();throw new Error(c.message||"Rating failed")}return o.json()}const k="userFavorites",x="dailyQuote",S="quoteTimestamp",Q=864e5,g=()=>{try{const e=localStorage.getItem(k);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load favorites:",e.message),[]}},L=e=>{localStorage.setItem(k,JSON.stringify(e))},q=e=>g().some(t=>t._id===e),J=e=>{const t=g();t.some(s=>s._id===e._id)||(t.push(e),L(t))},T=e=>{const t=g().filter(s=>s._id!==e);L(t)},U=e=>q(e._id)?(T(e._id),!1):(J(e),!0);async function W(){const e=localStorage.getItem(x),t=localStorage.getItem(S);if(e&&t&&Date.now()-Number(t)<Q)return JSON.parse(e);try{const s=await D();return localStorage.setItem(x,JSON.stringify(s)),localStorage.setItem(S,Date.now().toString()),s}catch(s){return console.error("Failed to fetch daily quote:",s),e?JSON.parse(e):{text:"No quote available",author:"Unknown"}}}function G(e,t){return e.map(s=>{let{_id:r,name:i,burnedCalories:o,bodyPart:c,target:y,time:R=3,rating:C}=s,F=`${o} / ${R} min`;return`
        <li class="exercise-information" data-id-card="${r}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              ${t?`<button data-action="delete" data-id="${r}" class="trash-btn">
                      <svg width="16" height="16">
                        <use href="/js_university_project0.1/iconic.svg#icon-trash"></use>
                      </svg>
                    </button>`:`<span class="rating">
                      ${C}
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
            <li><span>Burned calories:</span> ${F}</li>
            <li><span>Body part:</span> ${t?c:$(c)}</li>
            <li><span>Target:</span> ${t?y:$(y)}</li>
          </ul>
        </li>
      `}).join("")}function $(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}async function K(e){const{quote:t,author:s}=await W();e.innerHTML=` 
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
    `}const u={root:document.querySelector(".container-fav"),quote:document.querySelector(".quote")};let n=1;const _=8,Y=1140,z=(e,t)=>e.slice((t-1)*_,t*_),V=e=>e.filter((t,s,r)=>s===r.findIndex(i=>i._id===t._id));function X(e){if(e<=1)return"";let t='<ul class="pagination">';t+=b(n-1,"←",n===1);for(let s=1;s<=e;s++)s===1||s===e||Math.abs(s-n)<=1?t+=b(s,s,!1,s===n):(s===n-2||s===n+2)&&(t+='<li class="dots">...</li>');return t+=b(n+1,"→",n===e),t+="</ul>",t}function b(e,t,s=!1,r=!1){return`
    <li>
      <button
        class="pagination-btn ${r?"active":""}"
        data-page="${e}"
        ${s?"disabled":""}>
        ${t}
      </button>
    </li>
  `}function p(){if(!u.root)return;const e=V(g()),t=window.innerWidth>=Y;if(!e.length){u.root.innerHTML=`
      <p class="no_cards_wrapper">
        You haven't added any exercises to your favorites yet.
      </p>
    `;return}const s=Math.ceil(e.length/_);n>s&&(n=s);const r=t?e:z(e,n);u.root.innerHTML=`
    <ul class="fav_card_list">
      ${G(r,!0)}
    </ul>
    ${t?"":X(s)}
  `}var j;(j=u.root)==null||j.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),r=e.target.closest(".pagination-btn");if(t&&(T(t.dataset.id),p()),s){const i=g().find(o=>o._id===s.dataset.id);i&&M(i,!0)}if(r){const i=Number(r.dataset.page);if(i===n||i<1)return;n=i,p()}});window.addEventListener("resize",()=>{n=1,p()});p();K(u.quote);const a={closeBtn:document.getElementById("form-close-btn"),backdrop:document.querySelector(".backdrop"),form:document.querySelector(".backdrop-form"),email:document.getElementById("user-email"),comment:document.getElementById("user-comment"),ratingWrapper:document.querySelector(".rating-wrapper"),ratingValue:document.querySelector(".rating-star-value"),stars:document.querySelectorAll(".rating-star-icons")};let I=null,w=null;const l={rate:0,email:"",comment:""};function B(e){e.key==="Escape"&&h(!0)}const Z=()=>{a.form.reset(),l.rate=0,a.ratingValue.textContent="0.0",a.stars.forEach(e=>e.style.fill="var(--white-20)")};function h(e=!1){a.backdrop.classList.remove("is-open"),document.removeEventListener("keydown",B),e&&w&&M(w)}a.closeBtn.onclick=()=>h(!0);a.backdrop.onclick=e=>{e.target===a.backdrop&&h(!0)};a.ratingWrapper.onclick=({target:e})=>{const t=Number(e.dataset.id);t&&(l.rate=t,a.ratingValue.textContent=`${t}.0`,a.stars.forEach((s,r)=>{s.style.fill=r<t?"var(--star-color)":"var(--white-20)"}))};const ee=(e,t=null)=>{I=e,w=t,a.backdrop.classList.add("is-open"),document.addEventListener("keydown",B)};a.form.onsubmit=async e=>{if(e.preventDefault(),l.email=a.email.value.trim(),l.comment=a.comment.value.trim()||void 0,!l.rate)return f.warning({title:"Warning",message:"Please select a rating",position:"topRight"});if(!l.email)return f.warning({title:"Warning",message:"Please enter your email",position:"topRight"});try{await H(I,l),f.success({title:"Success",message:"Your rating is accepted",position:"topRight"}),Z(),h()}catch({message:t}){f.error({title:"Error",message:t,position:"topRight"})}};const d=document.querySelector(".exr-card-backdrop"),m=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;let O=null;function M(e,t=!1){O=e;const s=t||q(e._id);te(e,s),d.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),document.addEventListener("keydown",A)}function te(e,t){let s=t;d.innerHTML=`
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
    </div>`,se(e.rating);const r=document.querySelector(".add-favourite-btn");r.addEventListener("click",()=>{s=U(e),r.innerHTML=`
    ${s?"Remove from":"Add to favourites"}
    <svg class="heart-icon" width="20" height="20">
      <use href="/js_university_project0.1/iconic.svg#icon-heart"></use>
    </svg>
  `,p()}),document.getElementById("close-card").onclick=v,d.onclick=i=>i.target===d&&v(),document.querySelector(".give-rating-btn").onclick=()=>{v(),ee(e._id,O)}}function A(e){e.key==="Escape"&&v()}function v(){d.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),document.removeEventListener("keydown",A)}function se(e){document.querySelectorAll(".star-rating-icon").forEach((t,s)=>{s<Math.round(e)&&(t.style.fill="#eea10c")})}const ie=document.querySelector(".mobile-menu"),re=document.querySelector(".open-mobile-menu-btn"),oe=document.querySelector(".close-mobile-menu-btn"),N=document.querySelector(".mobile-menu-wrapper"),ne=document.querySelector(".header-nav-link-fav"),ae=document.querySelector(".header-nav-link-home"),P=window.PAGE;P==="fav"&&ne.classList.add("active");P==="home"&&ae.classList.add("active");ie.addEventListener("click",e=>{e.stopPropagation()});const E=e=>{N.classList.toggle("is-open",e),document.body.classList.toggle("not-scrollable",e)};re.addEventListener("click",()=>E(!0));oe.addEventListener("click",()=>E(!1));N.addEventListener("click",()=>E(!1));export{ue as a,G as b,le as f,M as h,de as p,K as r};
//# sourceMappingURL=header-RUfGjgQ6.js.map
