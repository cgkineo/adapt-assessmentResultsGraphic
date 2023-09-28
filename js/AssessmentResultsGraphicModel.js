import Adapt from 'core/js/adapt';
import ComponentModel from 'core/js/models/componentModel';

class AssessmentResultsGraphicModel extends ComponentModel {
  init() {
    this.config = this.get('_graphics');
    this.setDefaultResultsGraphic();

    this.listenTo(Adapt, {
      'assessments:complete': this.onAssessmentComplete,
      'assessments:reset': this.onAssessmentReset
    });
  };

  setDefaultResultsGraphic() {
    if (!this.config._assessmentIncomplete || !this.config._assessmentIncomplete._src) return;

    this.set('resultsGraphic', this.config._assessmentIncomplete);
  };

  /**
   * Checks to see if the assessment was completed in a previous session or not
   */
  checkIfAssessmentComplete() {
    if (!Adapt.assessment || this.get('_assessmentId') === undefined) {
      return;
    }

    const assessmentModel = Adapt.assessment.get(this.get('_assessmentId'));
    if (!assessmentModel || assessmentModel.length === 0) return;

    const state = assessmentModel.getState();
    const isResetOnRevisit = assessmentModel.get('_assessment')._isResetOnRevisit;
    if (state.isComplete && (!state.allowResetIfPassed || !isResetOnRevisit)) {
      this.onAssessmentComplete(state);
      return;
    }

    this.setVisibility();
  };

  onAssessmentComplete(state) {
    if (this.get('_assessmentId') === undefined ||
        this.get('_assessmentId') !== state.id) return;

    this.setResultsGraphic(state);
    this.toggleVisibility(true);
  };

  setResultsGraphic(state) {
    const selectedGraphic = (state.isPass ? this.config._assessmentPassed : this.config._assessmentFailed);
    this.set('resultsGraphic', selectedGraphic);
  };

  setVisibility() {
    if (!Adapt.assessment) return;

    const assessmentModel = Adapt.assessment.get(this.get('_assessmentId'));
    if (!assessmentModel || assessmentModel.length === 0) return;

    const state = assessmentModel.getState();
    const isAttemptInProgress = state.attemptInProgress;
    const isComplete = !isAttemptInProgress && state.isComplete;
    const isVisibleBeforeCompletion = this.get('_isVisibleBeforeCompletion') || false;
    const isVisible = isVisibleBeforeCompletion || isComplete;

    this.toggleVisibility(isVisible);
  };

  toggleVisibility(isVisible) {
    if (isVisible === undefined) {
      isVisible = !this.get('_isVisible');
    }

    this.set('_isVisible', isVisible, { pluginName: 'assessmentResultsGraphic' });
  };

  checkCompletion() {
    if (this.get('_setCompletionOn') === 'pass' && !this.get('isPass')) {
      return;
    }

    this.setCompletionStatus();
  };

  /**
   * Handles resetting the component whenever its corresponding assessment is reset
   * The component can either inherit the assessment's reset type or define its own
   */
  onAssessmentReset(state) {
    if (this.get('_assessmentId') === undefined ||
        this.get('_assessmentId') !== state.id) return;

    let resetType = this.get('_resetType');
    if (!resetType || resetType === 'inherit') {
      // backwards compatibility - state.resetType was only added in assessment v2.3.0
      resetType = state.resetType || 'hard';
    }
    this.reset(resetType, true);
  };

  reset() {
    this.setDefaultResultsGraphic();
    ComponentModel.prototype.reset.apply(this, arguments);
  };
}

export default AssessmentResultsGraphicModel;
