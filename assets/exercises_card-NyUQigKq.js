(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const m="favouriteExercises",b="quote",x="quote_time",I=864e5,w=e=>localStorage.setItem(m,JSON.stringify(e)),y=e=>{try{const t=localStorage.getItem(e);return t?JSON.parse(t):[]}catch(t){return console.error("Error parsing JSON:",t.message),[]}},L=e=>{const t=y(m).filter(s=>s._id!==e);w(t)};async function N(){return(await fetch("https://your-energy.b.goit.study/api/quote")).json()}async function M(){const e=localStorage.getItem(b),t=localStorage.getItem(x);if(e&&t&&Date.now()-Number(t)<I)return JSON.parse(e);try{const s=await N();return localStorage.setItem(b,JSON.stringify(s)),localStorage.setItem(x,Date.now().toString()),s}catch(s){return console.error("Error fetching quote:",s),e?JSON.parse(e):{quote:"No quote available",author:""}}}const O=(e,t)=>`
  <svg width="32" height="32" class="quote-text-icon">
    <use href="/js_university_project0.1/icons.svg#icon-run"></use>
  </svg>
  <div>
    <h3 class="main-quote-title">Quote of the day</h3>
    <p class="main-quote-text">${e}</p>
    <p class="main-quote-author">${t}</p>
    <svg width="24" height="24" class="quote-text-icon-commas">
      <use href="/js_university_project0.1/icons.svg#icon-commas"></use>
    </svg>
  </div>
`,F=async e=>{const{quote:t,author:s}=await M();e.innerHTML=O(t,s)},f={root:document.querySelector(".scrollbar_custom"),quoteContainer:document.querySelector(".quote")};let a=1;const h=8,T=(e,t)=>{const s=(t-1)*h;return e.slice(s,s+h)},B=(e=[])=>{const t=new Set;return e.filter(s=>!(s!=null&&s._id)||t.has(s._id)?!1:(t.add(s._id),!0))};function C(){f.root.innerHTML=`
    <div class="no_cards_wrapper-container">
      <p class="no_cards_wrapper">
        It appears that you haven't added any exercises to your favorites yet.
        To get started, you can add exercises that you like to your favorites
        for easier access in the future.
      </p>
    </div>
  `}function A(e){return`
    <ul class="fav_card_list">
      ${e.map(({name:t,_id:s,burnedCalories:o,bodyPart:i,target:r,time:n=3})=>{let k=`${o} / ${n} min`;return`
            <li class="exercise-information" data-id-card="${s}">
              <div class="top-nav">
                <div>
                  <p class="tag">Workout</p>
                  <button
                    data-action="delete"
                    data-id="${s}"
                    class="trash-btn">
                    <svg width="16" height="16">
                      <use href="/js_university_project0.1/icons.svg#icon-trash"></use>
                    </svg>
                  </button>
                </div>

                <button
                  data-action="start"
                  data-id="${s}"
                  class="details-link">
                  Start
                  <svg width="16" height="16">
                    <use href="/js_university_project0.1/icons.svg#icon-arrow"></use>
                  </svg>
                </button>
              </div>

              <div class="exercise-header">
                <svg width="24" height="24">
                  <use href="/js_university_project0.1/icons.svg#icon-run"></use>
                </svg>
                <h2 class="exercise-name">${t}</h2>
              </div>

              <ul class="exercise-details">
                <li><span>Burned calories:</span> ${k}</li>
                <li><span>Body part:</span> ${i}</li>
                <li><span>Target:</span> ${r}</li>
              </ul>
            </li>
          `}).join("")}
    </ul>
  `}function P(e){if(e<=1)return"";let t='<ul class="nav-buttons pagination">';const s=r=>`
    <li>
      <button
        class="pagination-btn ${r===a?"active":""}"
        data-page="${r}">
        ${r}
      </button>
    </li>
  `;let o=Math.max(1,a-1),i=Math.min(e,a+1);a===1&&(i=Math.min(e,3)),a===e&&(o=Math.max(1,e-2)),o>1&&(t+=s(1),o>2&&(t+='<li class="dots">...</li>'));for(let r=o;r<=i;r++)t+=s(r);return i<e&&(i<e-1&&(t+='<li class="dots">...</li>'),t+=s(e)),t+="</ul>",t}function g(){if(!f.root)return;const e=B(y(m)||[]);if(!e.length){C();return}const t=Math.ceil(e.length/h);a>t&&(a=t);const s=window.innerWidth<1440?T(e,a):e;f.root.innerHTML=A(s)+(window.innerWidth<1440?P(t):"")}var S;(S=f.root)==null||S.addEventListener("click",e=>{const t=e.target.closest('[data-action="delete"]'),s=e.target.closest('[data-action="start"]'),o=e.target.closest(".pagination-btn");if(t&&(L(t.dataset.id),g()),s){const r=(y(m)||[]).find(n=>n._id===s.dataset.id);r&&K(r,!0,!0)}if(o){const i=Number(o.dataset.page);i!==a&&(a=i,g())}});window.addEventListener("resize",()=>{a=1,g()});g();F(f.quoteContainer);async function H(e,{email:t,rate:s,comment:o}){const i=`https://your-energy.b.goit.study/api/exercises/${e}/rating`;s=Number(s);const r=await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,rate:s,review:o})});if(!r.ok){const n=await r.json();throw new Error(n.message||"Rating failed")}return r.json()}const J=document.getElementById("form-close-btn"),d=document.querySelector(".backdrop"),j=document.querySelector("#user-email"),q=document.getElementById("user-comment"),Q=document.querySelector(".form-send-btn"),R=document.querySelector(".rating-wrapper"),E=document.querySelector(".rating-star-value"),D=document.querySelector(".backdrop-form");let $=null;const c={rate:0,email:"",comment:""};Q.disabled=!1;function U(){j.value="",q.value="",c.rate=0,c.comment="",c.email="",E.textContent="0.0",document.querySelectorAll(".rating-star-icons").forEach(t=>{t.style.fill="var(--white-20)"})}J.addEventListener("click",()=>{d.classList.remove("is-open")});d.addEventListener("click",e=>{e.target===d&&d.classList.remove("is-open")});R.addEventListener("click",e=>{const t=document.querySelectorAll(".rating-star-icons");if(e.target.dataset.id){c.rate=Number(e.target.dataset.id);for(let s=0;s<5;s++)t[s].style.fill=s<c.rate?"var(--star-color)":"var(--white-20)";E.textContent=`${c.rate}.0`}});function W(e){$=e,d.classList.add("is-open")}D.addEventListener("submit",Y);async function Y(e){if(e.preventDefault(),c.email=j.value.trim(),c.comment=q.value.trim()||void 0,!c.rate){alert("Please select a rating");return}if(!c.email){alert("Please enter your email");return}try{await H($,c),alert("Your rating is accepted"),U(),d.classList.remove("is-open")}catch(t){alert(`Error: ${t.message}`)}}const l=document.querySelector(".exr-card-backdrop");let u=!1,p=[],_=JSON.parse(localStorage.getItem("favourite"));_&&_.forEach(e=>{p[0]||(p[0]=e),p.push(e)});function v(e){return`${e.charAt(0).toUpperCase()}${e.slice(1)}`}function K(e,t=!1,s=!1){u=t,u||p.forEach(o=>{o._id===e._id&&(u=!0)}),z(e),l.classList.add("card-is-open"),document.body.classList.add("not-scrollable"),u===!0&&(document.querySelector(".add-favourite-btn").innerHTML=`Remove from
          <svg class="heart-icon">
            <use href="/js_university_projectNew/icons.svg#icon-heart"></use>
          </svg>`)}function z(e,t){let s=e.rating;s%1===0&&(s+=".0"),s=parseFloat(s).toFixed(1);const o=`
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/js_university_project0.1/icons.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${e.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${v(e.name)}</h3>
      <div class="rating-container">
        <ul class="star-rating-list">
          <li>
            <p class="rating-score">${s}</p>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/icons.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/js_university_project0.1/icons.svg#icon-star"></use>
            </svg>
          </li>
        </ul>
      </div>
      <div class="exr-information-container">
        <div class="exr-info-block">
          <p class="info-label">Target</p>
          <p class="exr-info" id="exr-target">${v(e.target)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${v(e.bodyPart)}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${v(e.equipment)}</p>
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
          Add to favourites
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_project0.1/icons.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`;l.innerHTML=o;const i=document.querySelectorAll(".star-rating-icon");for(let n=0;n<Math.round(e.rating);++n)i[n].style.fill="#eea10c";const r=document.querySelector(".add-favourite-btn");r.addEventListener("click",function(){u?(L(e._id),r.innerHTML=`Add to favourite
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_project0.1/icons.svg#icon-heart"></use>
          </svg>`,u=!1):(p.push(e),w(p),r.innerHTML=`Remove from
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/js_university_project0.1/icons.svg#icon-heart"></use>
          </svg>`,u=!0),g()}),document.getElementById("close-card").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable")}),l.addEventListener("click",n=>{n.target===l&&(l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"))}),document.querySelector(".give-rating-btn").addEventListener("click",()=>{l.classList.remove("card-is-open"),document.body.classList.remove("not-scrollable"),W(e._id)})}export{F as d,K as h};
//# sourceMappingURL=exercises_card-NyUQigKq.js.map
