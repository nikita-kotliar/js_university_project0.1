export function renderExercises(data, isFavourite) {
  return data
    .map(exercise => {
      let {
        _id,
        name,
        burnedCalories,
        bodyPart,
        target,
        time = 3,
        rating,
      } = exercise;

      let calories = `${burnedCalories} / ${time} min`;

      return `
        <li class="exercise-information" data-id-card="${_id}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              ${
                isFavourite
                  ? `<button data-action="delete" data-id="${_id}" class="trash-btn">
                      <svg width="16" height="16">
                        <use href="/js_university_project0.1/iconic.svg#icon-trash"></use>
                      </svg>
                    </button>`
                  : `<span class="rating">
                      ${rating}
                      <svg class="star-icon" width="14" height="14">
                        <use href="/js_university_project0.1/iconic.svg#icon-star"></use>
                      </svg>
                    </span>`
              }
            </div>

            <button data-action="start" data-id="${_id}" class="details-link">
              Start
              <svg width="16" height="16">
                <use href="${isFavourite ? '/js_university_project0.1/iconic.svg#icon-arrow' : '/js_university_project0.1/iconic.svg#icon-arrow'}"></use>
              </svg>
            </button>
          </div>

          <div class="exercise-header">
            <svg width="24" height="24">
              <use href="${isFavourite ? '/js_university_project0.1/iconic.svg#icon-run' : '/js_university_project0.1/iconic.svg#icon-run'}"></use>
            </svg>
            <h2 class="exercise-name">${name}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${calories}</li>
            <li><span>Body part:</span> ${isFavourite ? bodyPart : capitalize(bodyPart)}</li>
            <li><span>Target:</span> ${isFavourite ? target : capitalize(target)}</li>
          </ul>
        </li>
      `;
    })
    .join('');
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
