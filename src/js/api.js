export async function fetchFilterss(
  currentFilter,
  page,
  limit,
  searchQuery = ''
) {
  let url = `https://your-energy.b.goit.study/api/filters?filter=${currentFilter}&page=${page}&limit=${limit}`;

  if (searchQuery.trim()) {
    url += `&name=${searchQuery}`;
  }

  const res = await fetch(url);
  return res.json();
}

export async function fetchExercisess(filter, name, keyWord, page, limitx) {
  let preparedFilter = filter.toLowerCase();
  if (preparedFilter === 'body parts') preparedFilter = 'bodypart';

  const url = `
    https://your-energy.b.goit.study/api/exercises?
    ${preparedFilter}=${name}
    &keyword=${keyWord}
    &page=${page}
    &limit=${limitx}
  `.replace(/\s+/g, '');

  const res = await fetch(url);
  return res.json();
}

export async function postSubscriptions(email) {
  const response = await fetch(
    'https://your-energy.b.goit.study/api/subscription',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );

  if (response.status === 409) {
    throw new Error('EMAIL_EXISTS');
  }

  if (!response.ok) {
    throw new Error('REQUEST_FAILED');
  }

  return await response.json();
}

export async function fetchDailyQuote() {
  const response = await fetch('https://your-energy.b.goit.study/api/quote');
  return response.json();
}
export async function addExerciseRatingById(id, { email, rate, comment }) {
  const url = `https://your-energy.b.goit.study/api/exercises/${id}/rating`;
  rate = Number(rate);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      rate,
      review: comment,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Rating failed');
  }

  return response.json();
}