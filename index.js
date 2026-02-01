import{r as y,f as w,a as S,b as v,h as L,p as E}from"./assets/header-CRzwEqJ0.js";const r={filters:document.querySelector(".filters"),musclesBtn:document.querySelector(".muscles-btn"),exercisesTitle:document.querySelector(".exercises-title"),searchForm:document.querySelector(".search-form"),quoteContainer:document.querySelector(".quote"),exercises:document.querySelector(".exercises-cards"),pagination:document.querySelector("#pagination-container")};let n=1,q=window.innerWidth<768?9:12,T=window.innerWidth<768?8:10,d="Muscles",o="",c="",f="",g=[];y(r.quoteContainer);r.musclesBtn.classList.add("active-btn");p();r.filters.addEventListener("click",M);r.exercises.addEventListener("click",F);r.searchForm.addEventListener("input",$);r.pagination.addEventListener("click",k);async function p(t=!0){t&&(n=1,r.exercises.innerHTML="");const e=await w(d,n,q,d);if(!e.results.length)return h();C(e.results),b(e.totalPages)}function C(t){r.exercises.innerHTML=`
    <ul class="exercises">
      ${t.map(({name:e,filter:s,imgURL:i})=>`
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
                alt="${e}"
                loading="lazy"
                class="exercise-image"
              />

              <div class="exercise-info">
                <h2 class="exercise-subtitle">
                  ${e[0].toUpperCase()+e.slice(1)}
                </h2>
                <p class="exercise-filter">${s}</p>
              </div>
            </li>
          `).join("")}
    </ul>
  `}function M(t){var s;const e=t.target.closest("button");e&&((s=document.querySelector(".active-btn"))==null||s.classList.remove("active-btn"),e.classList.add("active-btn"),d=e.classList.contains("muscles-btn")?"Muscles":e.classList.contains("bodyparts-btn")?"Body parts":"Equipment",r.exercisesTitle.textContent="Exercises",r.searchForm.style.display="none",o="",c="",f="",p(!0))}async function F(t){const e=t.target.closest(".exercise");if(!e)return;const s=e.querySelector(".exercise-filter"),i=e.querySelector(".exercise-subtitle");!s||!i||(o=H(s.textContent),c=i.textContent.toLowerCase(),r.exercisesTitle.innerHTML=`
    Exercises / <span>${B(c)}</span>
  `,r.searchForm.style.display="block",n=1,m(!0))}async function m(t=!0){t&&(n=1,r.exercises.innerHTML="");const e=await S(o,c,f,n,T);if(!e.results.length)return h();g=e.results,r.exercises.innerHTML=v(e.results,!1),b(e.totalPages)}function $(t){f=t.target.value.trim().toLowerCase(),n=1,m(!0)}function b(t){if(t<=1){r.pagination.innerHTML="";return}let e="";e+=u(n-1,"←",n===1);for(let s=1;s<=t;s++)s===1||s===t||Math.abs(s-n)<=1?e+=u(s,s,!1,s===n):(s===n-2||s===n+2)&&(e+='<li class="dots">...</li>');e+=u(n+1,"→",n===t),r.pagination.innerHTML=e}function u(t,e,s=!1,i=!1){return`
    <li>
      <button
        class="pagination-btn ${i?"active":""}"
        data-page="${t}"
        ${s?"disabled":""}>
        ${e}
      </button>
    </li>
  `}function k(t){const e=t.target.closest(".pagination-btn");if(!e)return;const s=Number(e.dataset.page);s===n||s<1||(n=s,o?m(!1):p(!1))}r.exercises.addEventListener("click",t=>{const e=t.target.closest('[data-action="start"]');if(!e)return;const s=g.find(i=>i._id===e.dataset.id);s&&L(s)});function H(t){return t.toLowerCase()==="body parts"?"bodypart":t.toLowerCase()}function h(){r.exercises.innerHTML=`
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `,r.pagination.innerHTML=""}function B(t){return t[0].toUpperCase()+t.slice(1)}const a=document.querySelector("input[name=email]"),l=document.querySelector(".footer-send-button"),x="feedback-form-state",I=()=>{localStorage.setItem(x,JSON.stringify({email:a.value}))},z=()=>{const t=localStorage.getItem(x);if(!t)return;const{email:e}=JSON.parse(t);a.value=e||"",l.disabled=!a.value};z();a.addEventListener("input",()=>{I(),l.disabled=!a.value});l.addEventListener("click",async t=>{if(t.preventDefault(),!!a.value)try{await E(a.value),alert("Success! Welcome to energy.flow world!"),a.value="",l.disabled=!0,localStorage.removeItem(x)}catch(e){e.message==="EMAIL_EXISTS"?alert("Email already exists"):alert("Something went wrong! Please try again later")}});
//# sourceMappingURL=index.js.map
