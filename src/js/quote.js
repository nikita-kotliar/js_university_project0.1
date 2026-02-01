import { getDailyQuote } from './LS.js';

export async function renderQuoteHTML(container) {
    const { quote, author } = await getDailyQuote();
    container.innerHTML = ` 
    <svg width="32" height="32" class="quote-text-icon">
      <use href="/iconic.svg#icon-run"></use>
    </svg>
    <div>
      <h3 class="main-quote-title">Quote of the day</h3>
      <p class="main-quote-text">${quote}</p>
      <p class="main-quote-author">${author}</p>
      <svg width="24" height="24" class="quote-text-icon-commas">
        <use href="/iconic.svg#icon-commas"></use>
      </svg>
    </div>
    `;
};
