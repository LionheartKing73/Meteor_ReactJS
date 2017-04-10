/**
 * Pega dados ja existentes no redux
 */
export function getInitialNimbleStateDataFromReduxBackup(self) {
  self.props = self.props || {};
  const stepID = self.props.currentStepID;
  const backupState = (self.props.localComponentStates || {})[stepID];
  return backupState || {};
}


export default function makeNimbleHandlers(self) {
  const { values, steps = [], currentStepID } = self.props;
  if(!steps.length) return;
  
  const step = steps.find(s => s.id === currentStepID);

  self._getNimbleValue = (inputName) => {
    let inputProps;
    let value;

    //TODO: passar esta logica para checked se aplicavel
    if (step.form) {
      inputProps = step.form.find(input => input.name === inputName);
      value = inputProps.value || inputProps.defaultValue;
    }

    if (typeof value === 'undefined') {
      const valueObj = values[step.id];

      const keys = Object.keys(valueObj);
      if (keys.length === 1) {
        value = valueObj[inputName];
      }
    }

    return value;
  };
};
