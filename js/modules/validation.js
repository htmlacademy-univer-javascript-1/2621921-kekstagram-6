const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

function checkHashtags(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return true;
  }

  const hashtags = trimmedValue.toLowerCase().split(' ').filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];

    if (tag === '#') {
      return false;
    }

    if (!HASHTAG_PATTERN.test(tag)) {
      return false;
    }

    for (let j = i + 1; j < hashtags.length; j++) {
      if (tag === hashtags[j]) {
        return false;
      }
    }
  }

  return true;
}

function getHashtagError(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return '';
  }

  const hashtags = trimmedValue.toLowerCase().split(' ').filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS) {
    return `Максимум ${MAX_HASHTAGS} хэш-тегов`;
  }

  for (const tag of hashtags) {
    if (tag === '#') {
      return 'Хэш-тег не может быть только #';
    }

    if (!HASHTAG_PATTERN.test(tag)) {
      return 'Хэш-тег должен начинаться с # и содержать буквы/цифры';
    }

    if (tag.length > HASHTAG_MAX_LENGTH) {
      return `Максимальная длина ${HASHTAG_MAX_LENGTH} символов`;
    }
  }

  const uniqueTags = new Set(hashtags);
  if (uniqueTags.size !== hashtags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  return '';
}

function checkComment(value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

function initValidation(formElement) {
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(
    formElement.querySelector('.text__hashtags'),
    checkHashtags,
    getHashtagError
  );

  pristine.addValidator(
    formElement.querySelector('.text__description'),
    checkComment,
    `Комментарий не должен превышать ${COMMENT_MAX_LENGTH} символов`
  );

  return pristine;
}

export { initValidation };
