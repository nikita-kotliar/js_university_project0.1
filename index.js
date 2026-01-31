import{d as B,h as j}from"./assets/exercises_card-NyUQigKq.js";const n={filters:document.querySelector(".filters"),navButtons:document.querySelector(".nav-buttons"),musclesBtn:document.querySelector(".muscles-btn"),exercisesTitle:document.querySelector(".exercises-title"),searchForm:document.querySelector(".search-form"),loadMoreBtn:document.querySelector(".load-more-btn"),quoteContainer:document.querySelector(".quote"),pagination:document.querySelector(".pagination"),exercises:document.querySelector(".exercises-div")};let C=window.innerWidth<768?9:12,F=window.innerWidth<768?8:10,a=1,u="Muscles",w="Muscles",S="",g="",y="",p=[];B(n.quoteContainer);h();n.musclesBtn.classList.add("active-btn");n.filters.addEventListener("click",_);n.exercises.addEventListener("click",I);n.searchForm.addEventListener("input",N);var L;(L=n.loadMoreBtn)==null||L.addEventListener("click",loadMore);async function h(e=!0){e&&(a=1,n.exercises.innerHTML="");let t=`https://your-energy.b.goit.study/api/filters?filter=${u}&page=${a}&limit=${C}`;w.trim()&&(t+=`&name=${w}`);const r=await(await fetch(t)).json();if(!r.results.length){$();return}H(r.results),E(r.totalPages)}function H(e){const t=`
    <ul class="exercises">
      ${e.map(({name:s,filter:r,imgURL:i})=>`
            <li class="exercise">
              <img
                src="${i}?w=290&h=242"
                srcset="
                  ${i}?w=335&h=225 335w,
                  ${i}?w=225&h=225 225w,
                  ${i}?w=290&h=242 290w
                "
                sizes="(max-width: 767px) 335px,
                       (min-width: 768px) and (max-width: 1439px) 225px,
                       290px"
                alt="${s}"
                loading="lazy"
                class="exercise-image"
              />

              <div class="exercise-info">
                <h2 class="exercise-subtitle">
                  ${s[0].toUpperCase()+s.slice(1)}
                </h2>
                <p class="exercise-filter">${r}</p>
              </div>
            </li>
          `).join("")}
    </ul>
    <ul class="nav-buttons pagination" id="pagination-container"></ul>
  `;n.exercises.insertAdjacentHTML("beforeend",t)}function _(e){var t;e.target.tagName==="BUTTON"&&((t=document.querySelector(".active-btn"))==null||t.classList.remove("active-btn"),e.target.classList.add("active-btn"),e.target.classList.contains("muscles-btn")?u="Muscles":e.target.classList.contains("bodyparts-btn")?u="Body parts":e.target.classList.contains("equipment-btn")&&(u="Equipment"),n.exercisesTitle.textContent="Exercises",n.searchForm.style.display="none",h(!0))}async function I(e){const t=e.target.closest(".exercise");if(!t)return;const s=t.querySelector(".exercise-filter"),r=t.querySelector(".exercise-subtitle");!s||!r||(g=s.textContent,y=r.textContent.toLowerCase(),n.exercisesTitle.innerHTML=`
    <ul class="exercises-title">
      Exercises / <span>${d(y)}</span>
    </ul>
  `,n.searchForm.style.display="block",a=1,n.exercises.innerHTML="",await v())}async function v(e=!0){e&&(p=[]);let t=g.toLowerCase();t==="body parts"&&(t="bodypart");const s=`
    https://your-energy.b.goit.study/api/exercises?
    ${t}=${y}
    &keyword=${S}
    &page=${a}
    &limit=${F}
  `.replace(/\s+/g,""),i=await(await fetch(s)).json();if(!i.results.length){$();return}p=i.results,A(i.results),E(i.totalPages)}async function A(e){n.exercises.innerHTML="",p=e;const t=`
    <ul class="exercises-cards">
      ${e.map(({name:s,_id:r,rating:i,burnedCalories:l,bodyPart:c,target:T,time:q})=>{let k=`${l} / ${q} min`;return i%1===0&&(i+=".0"),i=parseFloat(i).toFixed(1),`
              <li class="exercise-information" data-id-card="${r}">
                <div class="top-nav">
                  <div>
                    <p class="tag">Workout</p>
                    <span class="rating">
                      ${i}
                      <svg class="star-icon" width="14" height="14">
                        <use href="/js_university_project0.1/icons.svg#icon-star"></use>
                      </svg>
                    </span>
                  </div>
                  <button
                    name="start"
                    data-action="start"
                    data-id="${r}"
                    class="details-link">
                    Start
                    <svg class="arrow-icon" width="16" height="16">
                      <use href="/js_university_project0.1/icons.svg#icon-arrow"></use>
                    </svg>
                  </button>
                </div>

                <div class="exercise-header">
                  <svg class="icon-man" fill="white" width="24" height="24">
                    <use href="/js_university_project0.1/icons.svg#icon-run"></use>
                  </svg>
                  <h2 class="exercise-name">
                    ${d(s)}
                  </h2>
                </div>

                <ul class="exercise-details">
                  <li>
                    <span>Burned calories:</span>
                    ${k}
                  </li>
                  <li>
                    <span>Body part:</span>
                    ${d(c)}
                  </li>
                  <li>
                    <span>Target:</span>
                    ${d(T)}
                  </li>
                </ul>
              </li>
            `}).join("")}
    </ul>
    <ul class="nav-buttons pagination" id="pagination-container"></ul>
  `;n.exercises.insertAdjacentHTML("beforeend",t)}function N(e){S=e.target.value.trim().toLowerCase(),a=1,n.exercises.innerHTML="",v(!0)}function E(e){const t=document.querySelector("#pagination-container");if(!t)return;if(e<=1){t.innerHTML="";return}let s="";const r=c=>`
    <li>
      <button
        class="pagination-btn ${c===a?"active":""}"
        data-page="${c}">
        ${c}
      </button>
    </li>
  `;let i=Math.max(1,a-1),l=Math.min(e,a+1);a===1&&(l=Math.min(e,3)),a===e&&(i=Math.max(1,e-2)),i>1&&(s+=r(1),i>2&&e>4&&(s+='<li class="dots">...</li>'));for(let c=i;c<=l;c++)s+=r(c);l<e&&(l<e-1&&e>4&&(s+='<li class="dots">...</li>'),s+=r(e)),t.innerHTML=s}n.exercises.addEventListener("click",e=>{const t=e.target.closest(".pagination-btn");if(!t)return;const s=Number(t.dataset.page);s!==a&&(a=s,n.exercises.innerHTML="",g?v(!1):h(!1))});n.exercises.addEventListener("click",e=>{const t=e.target.closest('[data-action="start"]');if(!t)return;const s=p.find(r=>r._id===t.dataset.id);j(s)});function $(){var e;n.exercises.innerHTML=`
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `,(e=n.loadMoreBtn)==null||e.style.setProperty("display","none"),n.pagination&&(n.pagination.innerHTML="")}function d(e){return e[0].toUpperCase()+e.slice(1)}async function O(e){const t=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(t.status===409)throw new Error("EMAIL_EXISTS");if(!t.ok)throw new Error("REQUEST_FAILED");return await t.json()}const o=document.querySelector("input[name=email]"),m=document.querySelector(".footer-send-button"),x="feedback-form-state";function f(e){return/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)}function W(){localStorage.setItem(x,JSON.stringify({email:o.value}))}function z(){const e=localStorage.getItem(x);if(!e)return;const{email:t}=JSON.parse(e);o.value=t||"",m.disabled=!f(o.value)}z();o.addEventListener("input",()=>{W(),m.disabled=!f(o.value)});o.addEventListener("change",()=>{f(o.value)||alert("Please enter a valid email address")});m.addEventListener("click",async e=>{if(e.preventDefault(),!!f(o.value))try{await O(o.value),alert("Success! Welcome to energy.flow world!"),o.value="",m.disabled=!0,localStorage.removeItem(x)}catch(t){t.message==="EMAIL_EXISTS"?alert("Email already exists"):alert("Something went wrong! Please try again later")}});const J=document.querySelector(".open-mobile-menu-btn"),Q=document.querySelector(".close-mobile-menu-btn"),b=document.querySelector(".mobile-menu-wrapper"),R=document.querySelector(".mobile-menu");J.addEventListener("click",()=>{b.classList.add("is-open"),document.body.classList.add("not-scrollable")});Q.addEventListener("click",()=>{M()});b.addEventListener("click",()=>{M()});R.addEventListener("click",e=>{e.stopPropagation()});function M(){b.classList.remove("is-open"),document.body.classList.remove("not-scrollable")}
//# sourceMappingURL=index.js.map
