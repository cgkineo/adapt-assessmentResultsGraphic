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

          {resultsGraphic &&
          <img
            className="assessmentresultsgraphic__image"
            src={resultsGraphic._src}
            aria-label={resultsGraphic.alt || null}
            aria-hidden={!resultsGraphic.alt || null}
          />
          }

        </div>

      </div>

    </div>

  );
}
