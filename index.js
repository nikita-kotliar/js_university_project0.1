import{r as w,f as v,a as S,b as L,h as E,p as T}from"./assets/header-D5NR5ieG.js";import{i as u}from"./assets/vendor-iVKk4foX.js";const r={filters:document.querySelector(".filters"),musclesBtn:document.querySelector(".muscles-btn"),exercisesTitle:document.querySelector(".exercises-title"),searchForm:document.querySelector(".search-form"),quoteContainer:document.querySelector(".quote"),exercises:document.querySelector(".exercises-cards"),pagination:document.querySelector("#pagination-container")};let n=1,q=window.innerWidth<768?9:12,C=window.innerWidth<768?8:10,f="Muscles",l="",o="",p="",h=[];w(r.quoteContainer);r.musclesBtn.classList.add("active-btn");m();r.filters.addEventListener("click",M);r.exercises.addEventListener("click",$);r.searchForm.addEventListener("submit",k);r.pagination.addEventListener("click",H);async function m(t=!0){t&&(n=1,r.exercises.innerHTML="");const e=await v(f,n,q,f);if(!e.results.length)return y();F(e.results),b(e.totalPages)}function F(t){r.exercises.innerHTML=`
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
  `}function M(t){var s;const e=t.target.closest("button");e&&((s=document.querySelector(".active-btn"))==null||s.classList.remove("active-btn"),e.classList.add("active-btn"),f=e.classList.contains("muscles-btn")?"Muscles":e.classList.contains("bodyparts-btn")?"Body parts":"Equipment",r.exercisesTitle.textContent="Exercises",r.searchForm.style.display="none",l="",o="",p="",m(!0))}async function $(t){const e=t.target.closest(".exercise");if(!e)return;const s=e.querySelector(".exercise-filter"),i=e.querySelector(".exercise-subtitle");!s||!i||(l=B(s.textContent),o=i.textContent.toLowerCase(),r.exercisesTitle.innerHTML=`
    Exercises / <span>${z(o)}</span>
  `,r.searchForm.style.display="block",n=1,g(!0))}async function g(t=!0){t&&(n=1,r.exercises.innerHTML="");const e=await S(l,o,p,n,C);if(!e.results.length)return y();h=e.results,r.exercises.innerHTML=L(e.results,!1),b(e.totalPages)}function k(t){t.preventDefault(),p=r.searchForm.elements.searchQuery.value.trim().toLowerCase(),n=1,g(!0)}function b(t){if(t<=1){r.pagination.innerHTML="";return}let e="";e+=d(n-1,"←",n===1);for(let s=1;s<=t;s++)s===1||s===t||Math.abs(s-n)<=1?e+=d(s,s,!1,s===n):(s===n-2||s===n+2)&&(e+='<li class="dots">...</li>');e+=d(n+1,"→",n===t),r.pagination.innerHTML=e}function d(t,e,s=!1,i=!1){return`
    <li>
      <button
        class="pagination-btn ${i?"active":""}"
        data-page="${t}"
        ${s?"disabled":""}>
        ${e}
      </button>
    </li>
  `}function H(t){const e=t.target.closest(".pagination-btn");if(!e)return;const s=Number(e.dataset.page);s===n||s<1||(n=s,l?g(!1):m(!1))}r.exercises.addEventListener("click",t=>{const e=t.target.closest('[data-action="start"]');if(!e)return;const s=h.find(i=>i._id===e.dataset.id);s&&E(s)});function B(t){return t.toLowerCase()==="body parts"?"bodypart":t.toLowerCase()}function y(){r.exercises.innerHTML=`
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `,r.pagination.innerHTML=""}function z(t){const e=t.trim();return e[0].toUpperCase()+e.slice(1)}const a=document.querySelector("input[name=email]"),c=document.querySelector(".footer-send-button"),x="feedback-form-state",I=()=>{localStorage.setItem(x,JSON.stringify({email:a.value}))},W=()=>{const t=localStorage.getItem(x);if(!t)return;const{email:e}=JSON.parse(t);a.value=e||"",c.disabled=!a.value};W();a.addEventListener("input",()=>{I(),c.disabled=!a.value});c.addEventListener("click",async t=>{if(t.preventDefault(),!!a.value)try{await T(a.value),u.success({title:"Success",message:"Welcome to energy.flow world!",position:"topRight"}),a.value="",c.disabled=!0,localStorage.removeItem(x)}catch(e){e.message==="EMAIL_EXISTS"?u.warning({title:"Warning",message:"Email already exists",position:"topRight"}):u.error({title:"Error",message:"Something went wrong! Please try again later",position:"topRight"})}});
//# sourceMappingURL=index.js.map
