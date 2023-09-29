import React from 'react';
import { templates } from 'core/js/reactHelpers';

export default function AssessmentResultsGraphic(props) {
  const {
    resultsGraphic
  } = props;

  return (
    <div className="component__inner assessmentresultsgraphic__inner">

      <templates.header {...props} />

      <div className="component__widget assessmentresultsgraphic__widget">

        <div className="assessmentresultsgraphic__image-container">

          <templates.image {...resultsGraphic}
            classNamePrefixes={[
              'component',
              'assessmentresultsgraphic'
            ]}
          />

        </div>

      </div>

    </div>

  );
}
