# adapt-assessmentResultsGraphic

**Assessment Results Graphic** is a *presentation component* similar in behaviour to the Graphic component - but where a different graphic can be displayed based on the following state of the associated assessment:
* incomplete
* failed
* passed

The 'incomplete' image is only needed if the Assessment Results Graphic can been seen by the learner prior to assessment completion i.e. it hasn't been hidden either by the Trickle extension or by using `_isVisibleBeforeCompletion: false` - otherwise it can safely be left out.

You *must* specify both the failed and passed images. If you don't want to have a different graphic for each of those assessment states you should probably just be using the standard graphic component..!

It is expected that most of the time this component will have `_isOptional: true` - but if not, it does support the same `_setCompletionOn` settings as the Assessment Results component.

## Limitations
Hasn't yet had a properties.schema added and set up - so isn't Adapt Authoring Tool compatible.

----------------------------
**Version number:** 0.0.1  
**Framework versions:** 5+  
**Author / maintainer:**  Kineo  
**Accessibility support:** Yes  
**RTL support:** Yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 13+14 for macOS/iOS/iPadOS, Opera  