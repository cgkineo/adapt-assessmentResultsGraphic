# adapt-assessmentResultsGraphic

**Assessment Results Graphic** is a *presentation component* similar in behaviour to the Graphic component. However, a different graphic can be displayed based on the following state of the associated assessment:

* incomplete
* failed
* passed

The `_assessmentIncomplete` image is only needed if the Assessment Results Graphic can been seen by the learner prior to assessment completion (i.e. it hasn't been hidden either by the Trickle extension or by using `_isVisibleBeforeCompletion: false`). Otherwise, it can safely be left out.

It is expected that most of the time this component will have `_isOptional: true`. If it is *not* optional, it does support the same `_setCompletionOn` settings as the Assessment Results component.

## Settings Overview

The attributes listed below are used in *components.json* to configure **Assessment Results Graphic**, and are properly formatted as JSON in [*example.json*](https://github.com/cgkineo/adapt-assessmentResultsGraphic/blob/master/example.json).

## Attributes

The [**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes) are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)

### \_component (string)

This must be set to: `"assessmentResultsGraphic"`.

### \_classes (string)

CSS class name(s) to be applied to this component's containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

### \_layout (string)

This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.

### \_assessmentId (string)

This value must match the [`_id` of the assessment](https://github.com/adaptlearning/adapt-contrib-assessment#attributes) for which the graphic should be displayed. If you only have *one* assessment, you can leave this blank (the article's `_assessment._id` must also be blank).

### \_graphics (object)

The object that defines the images to use for each assessment state. It contains the following settings that apply to the `_assessmentIncomplete`, `_assessmentPassed`, and `_assessmentFailed` objects.

#### \_src (string)

File name (including path) of the image. Path should be relative to the `src` folder (e.g. `"course/en/images/assessment-pass.jpg"`).

#### alt (string)

The alternative text for this image. Assign [alt text](https://github.com/adaptlearning/adapt_framework/wiki/Providing-good-alt-text) to images that convey course content only.

## Accessibility

The graphic displayed uses an [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute. This uses the content from each graphic's `alt` property. If `alt` is not set, the graphic will be hidden.

## Notes

You *must* specify both the failed and passed images. If you don't want to have a different graphic for each of those assessment states, you should probably just be using the standard [Graphic component](https://github.com/adaptlearning/adapt-contrib-graphic).

## Limitations

No known limitations.

----------------------------

**Author / maintainer:**  CGKineo<br>
**Accessibility support:** Yes<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, Safari for macOS/iOS/iPadOS, Opera<br>
