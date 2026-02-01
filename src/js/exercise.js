export function renderExercises(data) {
  return data
    .map(({ _id, name, burnedCalories, bodyPart, target, time = 3 }) => {
      const calories = `${burnedCalories} / ${time} min`;

      return `
        <li class="exercise-information" data-id-card="${_id}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <button
                data-action="delete"
                data-id="${_id}"
                class="trash-btn">
                <svg width="16" height="16">
                  <use href="/iconic.svg#icon-trash"></use>
                </svg>
              </button>
            </div>

            <button
              data-action="start"
              data-id="${_id}"
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
            <h2 class="exercise-name">${name}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${calories}</li>
            <li><span>Body part:</span> ${bodyPart}</li>
            <li><span>Target:</span> ${target}</li>
          </ul>
        </li>
      `;
    })
    .join('');
}
