define([
  'core/js/adapt',
  'core/js/views/componentView'
], function(Adapt, ComponentView) {

  var AssessmentResultsGraphicView = ComponentView.extend({

    preRender: function () {
      this.model.setLocking('_isVisible', false);

      this.listenTo(Adapt, 'preRemove', function () {
        this.model.unsetLocking('_isVisible');
      });

      this.listenTo(this.model, 'change:resultsGraphic', this.render);
    },

    postRender: function() {
      this.model.checkIfAssessmentComplete();

      this.setReadyStatus();

      if (this.model.get('_isOptional')) return;

      this.setupInviewCompletion('.component__inner', this.model.checkCompletion.bind(this.model));
    }

  }, {
    template: 'assessmentResultsGraphic'
  });

  return AssessmentResultsGraphicView;

});
