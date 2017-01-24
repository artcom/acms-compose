import Immutable from "immutable"
import kebabCase from "lodash/kebabCase"
import { createSelector } from "reselect"

import { evaluate } from "./condition"
import { isLocalized } from "./language"

const INDEX_KEY = "index"
const TEMPLATE_KEY = "template"

export const getVersion = (state) => state.version
export const getOriginalContent = (state) => state.originalContent
export const getChangedContent = (state) => state.changedContent
export const getTemplates = (state) => state.templates
export const getPath = (state) => state.path
export const getConfig = (state) => state.config
export const getProgress = (state) => state.progress

export const getNewEntity = (state) => {
  if (!state.newEntity) {
    return {
      isVisible: false,
      name: "",
      templates: []
    }
  }

  return { ...state.newEntity,
    isValidName: validateEntityName(state.newEntity.name),
    isVisible: true
  }
}

export const getRenamedEntity = (state) => {
  if (!state.renamedEntity) {
    return {
      isVisible: false,
      newName: ""
    }
  }

  return { ...state.renamedEntity,
    isValidName: validateEntityName(state.renamedEntity.newName),
    isVisible: true
  }
}

function validateEntityName(name) {
  return name.length > 0 && name !== "index"
}

export const getNewEntityPath = createSelector(
  [getNewEntity, getPath],
  (newEntity, path) => [...path, kebabCase(newEntity.name), INDEX_KEY]
)

export const getNewEntityValues = createSelector(
  [getNewEntity, getTemplates],
  (newEntity, templates) => {
    const template = templates[newEntity.template]

    const values = new Immutable.Map(template.fields.map(field => [
      field.name,
      defaultValue(field)
    ]))

    return values
      .filter((value, name) => {
        const field = template.fields.find(item => item.name === name)
        return !field.condition || evaluate(field.condition, values)
      })
      .set("template", newEntity.template)
  }
)

function defaultValue(field) {
  switch (field.type) {
    case "enum":
      return field.values[0].value

    case "markdown":
    case "string":
      return ""

    default:
      return null
  }
}

export const getFieldLocalization = (state) => {
  if (!state.fieldLocalization) {
    return {
      languageIds: new Immutable.Set(),
      isVisible: false
    }
  }

  return { ...state.fieldLocalization,
    isVisible: true
  }
}

export const getOriginalEntity = createSelector(
  [getOriginalContent, getPath],
  (originalContent, path) => originalContent.getIn(path, new Immutable.Map())
)

export const getChangedEntity = createSelector(
  [getChangedContent, getPath],
  (changedContent, path) => changedContent.getIn(path)
)

export const getOriginalValues = createSelector(
  [getOriginalEntity],
  (originalEntity) => originalEntity.get(INDEX_KEY, new Immutable.Map())
)

export const getChangedValues = createSelector(
  [getChangedEntity],
  (changedEntity) => changedEntity.get(INDEX_KEY)
)

export const getTemplate = createSelector(
  [getTemplates, getChangedValues],
  (templates, changedValues) => templates[changedValues.get(TEMPLATE_KEY)]
)

export const getTemplateChildren = createSelector(
  [getTemplate],
  (template) => template.children || []
)

export const getLanguages = createSelector(
  [getConfig],
  (config) => config.languages
)

export const getFields = createSelector(
  [getTemplate, getOriginalValues, getChangedValues, getPath, getLanguages, getProgress],
  (template, originalValues, changedValues, path, languages, progress) => template.fields
    .filter(field => !field.condition || evaluate(field.condition, changedValues))
    .map(field => {
      const originalValue = originalValues.get(field.name)
      const changedValue = changedValues.get(field.name)
      const fieldPath = [...path, INDEX_KEY, field.name]

      return { ...field,
        hasChanged: !Immutable.is(originalValue, changedValue),
        isLocalized: isLocalized(changedValue, languages),
        path: fieldPath,
        value: changedValue,
        progress: progress.get(fieldPath.toString())
      }
    })
)

export const getChildren = createSelector(
  [getOriginalEntity, getChangedEntity, getPath],
  (originalEntity, changedEntity, path) => {
    const childNames = new Immutable.Set(originalEntity.keySeq().concat(changedEntity.keySeq()))

    return childNames
      .filter(name => name !== INDEX_KEY)
      .sort()
      .map(child => ({
        hasChanged: !Immutable.is(originalEntity.get(child), changedEntity.get(child)),
        isNew: !originalEntity.has(child),
        isDeleted: !changedEntity.has(child),
        name: child,
        path: [...path, child]
      }))
  }
)
