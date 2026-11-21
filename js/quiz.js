// 以原生 radio 群組支援點擊、Tab、方向鍵與螢幕閱讀器。
export function makeQuiz(questions, onChange) {
  const form = document.createElement('form');
  const score = document.createElement('p');
  score.className = 'quiz-feedback';
  score.setAttribute('role', 'status');
  const answers = new Map();

  function updateScore() {
    const correct = questions.filter((question, i) => answers.get(i) === question[2]).length;
    score.textContent = `答對 ${correct} / ${questions.length} 題`;
    onChange(correct === questions.length);
  }

  questions.forEach(([question, options, answer, explanation], i) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'quiz-question';
    const legend = document.createElement('legend');
    legend.textContent = `${i + 1}. ${question}`;
    const choices = document.createElement('div');
    choices.className = 'quiz-options';
    const feedback = document.createElement('p');
    feedback.id = `quiz-feedback-${i}`;
    feedback.className = 'quiz-feedback';
    feedback.setAttribute('role', 'status');

    options.forEach((option, index) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question-${i}`;
      input.setAttribute('aria-describedby', feedback.id);
      input.addEventListener('change', () => {
        answers.set(i, index);
        feedback.textContent = index === answer ? `答對了！${explanation}` : `再試一次。${explanation}`;
        updateScore();
      });
      label.append(input, document.createTextNode(option));
      choices.append(label);
    });

    fieldset.append(legend, choices, feedback);
    form.append(fieldset);
  });

  form.append(score);
  form.addEventListener('submit', event => event.preventDefault());
  updateScore();
  return form;
}
