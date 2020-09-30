define([
  'core/js/adapt',
  'core/js/models/componentModel'
], function(Adapt, ComponentModel) {

  var AssessmentResultsModel = ComponentModel.extend({

    init: function() {
      this.setDefaultResultsGraphic();

      this.listenTo(Adapt, {
        'assessments:complete': this.onAssessmentComplete,
        'assessments:reset': this.onAssessmentReset
      });
    },

    setDefaultResultsGraphic: function() {
      var graphics = this.get('_graphics');
      if (!graphics._assessmentIncomplete || !graphics._assessmentIncomplete._src) return;

      this.set('resultsGraphic', graphics._assessmentIncomplete);
    },

    /**
     * Checks to see if the assessment was completed in a previous session or not
     */
    checkIfAssessmentComplete: function() {
      if (!Adapt.assessment || this.get('_assessmentId') === undefined) {
        return;
      }

      var assessmentModel = Adapt.assessment.get(this.get('_assessmentId'));
      if (!assessmentModel || assessmentModel.length === 0) return;

      var state = assessmentModel.getState();
      var isResetOnRevisit = assessmentModel.get('_assessment')._isResetOnRevisit;
      if (state.isComplete && (!state.allowResetIfPassed || !isResetOnRevisit)) {
        this.onAssessmentComplete(state);
        return;
      }

      this.setVisibility();
    },

    onAssessmentComplete: function(state) {
      if (this.get('_assessmentId') === undefined ||
          this.get('_assessmentId') != state.id) return;

      this.setResultsGraphic(state);

      this.toggleVisibility(true);
    },

    setResultsGraphic: function(state) {
      var graphics = this.get('_graphics');
      this.set('resultsGraphic', (state.isPass ? graphics._assessmentPassed : graphics._assessmentFailed));
    },

    setVisibility: function() {
      if (!Adapt.assessment) return;

      var isVisibleBeforeCompletion = this.get('_isVisibleBeforeCompletion') || false;
      var wasVisible = this.get('_isVisible');

      var assessmentModel = Adapt.assessment.get(this.get('_assessmentId'));
      if (!assessmentModel || assessmentModel.length === 0) return;

      var state = assessmentModel.getState();
      var isComplete = state.isComplete;
      var isAttemptInProgress = state.attemptInProgress;
      var attemptsSpent = state.attemptsSpent;
      var hasHadAttempt = (!isAttemptInProgress && attemptsSpent > 0);

      var isVisible = (isVisibleBeforeCompletion && !isComplete) || hasHadAttempt;

      if (!wasVisible && isVisible) isVisible = false;

      this.toggleVisibility(isVisible);
    },

    toggleVisibility: function (isVisible) {
      if (isVisible === undefined) {
        isVisible = !this.get('_isVisible');
      }

      this.set('_isVisible', isVisible, {pluginName: 'assessmentResultsGraphic'});
    },

    checkCompletion: function() {
      if (this.get('_setCompletionOn') === 'pass' && !this.get('isPass')) {
        return;
      }

      this.setCompletionStatus();
    },

    /**
     * Handles resetting the component whenever its corresponding assessment is reset
     * The component can either inherit the assessment's reset type or define its own
     */
    onAssessmentReset: function(state) {
      if (this.get('_assessmentId') === undefined ||
          this.get('_assessmentId') != state.id) return;

      this.reset(this.get('_resetType'), true);
    },

    reset: function() {
      this.setDefaultResultsGraphic();

      ComponentModel.prototype.reset.apply(this, arguments);
    }
  });

  return AssessmentResultsModel;

});
