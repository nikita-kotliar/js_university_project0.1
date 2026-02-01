(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();async function Z(e,t,s,i=""){let r=`https://your-energy.b.goit.study/api/filters?filter=${e}&page=${t}&limit=${s}`;return i.trim()&&(r+=`&name=${i}`),(await fetch(r)).json()}async function ee(e,t,s,i,r){let o=e.toLowerCase();o==="body parts"&&(o="bodypart");const c=`
    https://your-energy.b.goit.study/api/exercises?
    ${o}=${t}
    &keyword=${s}
    &page=${i}
    &limit=${r}
  `.replace(/\s+/g,"");return(await fetch(c)).json()}async function te(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}async function O(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function M(e,{email:t,rate:s,comment:i}){const r=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const o=await fetch(r,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:i})});if(!o.ok){const c=await o.json();throw new Error(c.message||"Rating failed")}return o.json()}const S="userFavorites",_="dailyQuote",w="quoteTimestamp",A=864e5,g=()=>{try{const e=localStorage.getItem(S);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load favorites:",e.message),[]}},E=e=>{localStorage.setItem(S,JSON.stringify(e))},j=e=>g().some(t=>t._id===e),N=e=>{const t=g();t.some(s=>s._id===e._id)||(t.push(e),E(t))},q=e=>{const t=g().filter(s=>s._id!==e);E(t)},P=e=>j(e._id)?(q(e._id),!1):(N(e),!0);async function C(){const e=localStorage.getItem(_),t=localStorage.getItem(w);if(e&&t&&Date.now()-Number(t)<A)return JSON.parse(e);try{const s=await O();return localStorage.setItem(_,JSON.stringify(s)),localStorage.setItem(w,Date.now().toString()),s}catch(s){return console.error("Failed to fetch daily quote:",s),e?JSON.parse(e):{text:"No quote available",author:"Unknown"}}}function D(e,t){return e.map(s=>{let{_id:i,name:r,burnedCalories:o,bodyPart:c,target:m,time:I=3,rating:T}=s,B=`${o} / ${I} min`;return`
        <li class="exercise-information" data-id-card="${i}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              ${t?`<button data-action="delete" data-id="${i}" class="trash-btn">
                      <svg width="16" height="16">
                        <use href="/js_university_project0.1/iconic.svg#icon-trash"></use>
                      </svg>
                    </button>`:`<span class="rating">
                      ${T}
                      <svg class="star-icon" width="14" height="14">
                        <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
                      </svg>
                    </span>`}
            </div>

            <button data-action="start" data-id="${i}" class="details-link">
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
            <h2 class="exercise-name">${r}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${B}</li>
            <li><span>Body part:</span> ${t?c:x(c)}</li>
            <li><span>Target:</span> ${t?m:x(m)}</li>
          </ul>
        </li>
      `}).join("")}function x(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}async function F(e){const{quote:t,author:s}=await C();e.innerHTML=` 
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
    `}const u={root:document.querySelector(".container-fav"),quote:document.querySelector(".quote")};let a=1;const y=8,R=1140,Q=(e,t)=>e.slice((t-1)*y,t*y),H=e=>e.filter((t,s,i)=>s===i.findIndex(r=>r._id===t._id));function J(e){if(e<=1)return"";let t='<ul class="pagination">';t+=v(a-1,"←",a===1);for(let s=1;s<=e;s++)s===1||s===e||Math.abs(s-a)<=1?t+=v(s,s,!1,s===a):(s===a-2||s===a+2)&&(t+='<li class="dots">...</li>');return t+=v(a+1,"→",a===e),t+="</ul>",t}function v(e,t,s=!1,i=!1){return`
    <li>
      <button
        class="pagination-btn ${i?"active":""}"
        data-page="${e}"
        ${s?"disabled":""}>
        ${t}
      </button>
    </li>
  `}function p(){if(!u.root)return;const e=H(g()),t=window.innerWidth>=R;if(!e.length){u.root.innerHTML=`
      <p class="no_cards_wrapper">
        You haven't added any exercises to your favorites yet.
      </p>
    `;return}const s=Math.ceil(e.length/y);a>s&&(a=s);const i=t?e:Q(e,a);u.root.innerHTML=`
    <ul class="fav_card_list">
      ${D(i,!0)}
    </ul>
    ${t?"":J(s)}
  `}var $;($=u.root)==null||$.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),i=e.target.closest(".pagination-btn");if(t&&(q(t.dataset.id),p()),s){const r=g().find(o=>o._id===s.dataset.id);r&&Y(r,!0)}if(i){const r=Number(i.dataset.page);if(r===a||r<1)return;a=r,p()}});window.addEventListener("resize",()=>{a=1,p()});p();F(u.quote);const n={closeBtn:document.getElementById("form-close-btn"),backdrop:document.querySelector(".backdrop"),form:document.querySelector(".backdrop-form"),email:document.getElementById("user-email"),comment:document.getElementById("user-comment"),ratingWrapper:document.querySelector(".rating-wrapper"),ratingValue:document.querySelector(".rating-star-value"),stars:document.querySelectorAll(".rating-star-icons")};let L=null;const l={rate:0,email:"",comment:""},U=()=>{n.form.reset(),l.rate=0,n.ratingValue.textContent="0.0",n.stars.forEach(e=>e.style.fill="var(--white-20)")};n.closeBtn.onclick=()=>n.backdrop.classList.remove("is-open");n.backdrop.onclick=e=>{e.target===n.backdrop&&n.backdrop.classList.remove("is-open")};n.ratingWrapper.onclick=({target:e})=>{const t=Number(e.dataset.id);t&&(l.rate=t,n.ratingValue.textContent=`${t}.0`,n.stars.forEach((s,i)=>{s.style.fill=i<t?"var(--star-color)":"var(--white-20)"}))};const K=e=>{L=e,n.backdrop.classList.add("is-open")};n.form.onsubmit=async e=>{if(e.preventDefault(),l.email=n.email.value.trim(),l.comment=n.comment.value.trim()||void 0,!l.rate)return alert("Please select a rating");if(!l.email)return alert("Please enter your email");try{await M(L,l),alert("Your rating is accepted"),U(),n.backdrop.classList.remove("is-open")}catch({message:t}){alert(`Error: ${t}`)}};const d=document.querySelector(".exr-card-backdrop"),f=e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`;function Y(e,t=!1){const s=t||j(e._id);G(e,s),d.classList.add("card-is-open"),document.body.classList.add("not-scrollable")}function G(e,t){let s=t;d.innerHTML=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/js_university_project0.1/iconic.svg#icon-x"></use>
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
            <use href="/js_university_project0.1/iconic.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`,W(e.rating);const i=document.querySelector(".add-favourite-btn");i.addEventListener("click",()=>{s=P(e),i.innerHTML=`
    ${s?"Remove from":"Add to favourites"}
    <svg class="heart-icon" width="20" height="20">
      <use href="/js_university_project0.1/iconic.svg#icon-heart"></use>
    </svg>
  `,p()}),document.getElementById("close-card").onclick=h,d.onclick=r=>r.target===d&&h(),document.querySelector(".give-rating-btn").onclick=()=>{h(),K(e._id)}}function h(){d.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}function W(e){document.querySelectorAll(".star-rating-icon").forEach((t,s)=>{s<Math.round(e)&&(t.style.fill="#eea10c")})}const V=document.querySelector(".mobile-menu"),z=document.querySelector(".open-mobile-menu-btn"),X=document.querySelector(".close-mobile-menu-btn"),k=document.querySelector(".mobile-menu-wrapper");V.addEventListener("click",e=>{e.stopPropagation()});const b=e=>{k.classList.toggle("is-open",e),document.body.classList.toggle("not-scrollable",e)};z.addEventListener("click",()=>b(!0));X.addEventListener("click",()=>b(!1));k.addEventListener("click",()=>b(!1));export{ee as a,D as b,Z as f,Y as h,te as p,F as r};
//# sourceMappingURL=header-DDNnLOpa.js.map
