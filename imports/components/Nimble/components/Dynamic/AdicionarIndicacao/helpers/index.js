export function updateAndCheck(name, value, schema, target) {
  if (target) {
    const $target = $(target);
    const $parent = $target.parent('label');
    try {
      schema.verify({[name]: value}, { keys: [name] });
      $parent.removeClass('mongoloid__error');
      $parent.find('.mongol__error-message').remove();
    } catch (e) {
      console.log(e);
      $parent.addClass('mongoloid__error').find('.mongol__error-message').remove();
      $parent.append(`<label class="mongol__error-message">${e.reason}</label>`);
    }
  }
}

export function getValidationErrors(data, schema) {
  const ctx = schema.newContext();
  ctx.validate(data);
  return ctx.validationErrors().map(error => ctx.keyErrorMessage(error.name));
}
