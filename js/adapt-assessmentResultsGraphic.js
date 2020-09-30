define([
  'core/js/adapt',
  './assessmentResultsGraphicModel',
  './assessmentResultsGraphicView'
], function(Adapt, AssessmentResultsGraphicModel, AssessmentResultsGraphicView) {

  return Adapt.register('assessmentResultsGraphic', {
    model: AssessmentResultsGraphicModel,
    view: AssessmentResultsGraphicView
  });

});
