import components from 'core/js/components';
import AssessmentResultsGraphicView from './AssessmentResultsGraphicView';
import AssessmentResultsGraphicModel from './AssessmentResultsGraphicModel';

export default components.register('assessmentResultsGraphic', {
  view: AssessmentResultsGraphicView,
  model: AssessmentResultsGraphicModel
});
