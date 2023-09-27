import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class AssessmentResultsGraphicView extends ComponentView {
  preRender () {
    this.model.setLocking('_isVisible', false);

    this.listenTo(Adapt, 'preRemove', function () {
      this.model.unsetLocking('_isVisible');
    });
    this.listenTo(this.model, 'change:resultsGraphic', this.render);
  };

  postRender() {
    this.model.checkIfAssessmentComplete();
    this.setReadyStatus();

    if (this.model.get('_isOptional')) return;

    this.setupInviewCompletion();
  };

  static get template() {
    return 'assessmentResultsGraphic.jsx';
  };

}

export default AssessmentResultsGraphicView;
