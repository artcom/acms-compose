import Immutable from "immutable"
import kebabCase from "lodash/kebabCase"
import mapValues from "lodash/mapValues"
import { createSelector } from "reselect"

import { evaluate } from "./condition"
import { isLocalized } from "./language"
import { isWhitelisted } from "./whitelist"

const INDEX_KEY = "index"
const TEMPLATE_KEY = "template"

export const getVersion = (state) => state.version
export const getOriginalContent = (state) => state.originalContent
export const getChangedContent = (state) => state.changedContent
export const getPath = (state) => state.path
export const getLanguages = (state) => state.languages
export const getProgress = (state) => state.progress
export const getWhitelist = (state) => state.whitelist

export const getTemplates = (state) => mapValues(state.templates, template => ({
  fields: [],
  children: [],
  ...template
}))

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
      languageIds: new Immutable.OrderedMap(),
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
  (template) => template.children
)

const getFields = createSelector(
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

export const getWhitelistedFields = createSelector(
  [getFields, getWhitelist],
  (fields, whitelist) => fields.filter(field => isWhitelisted(whitelist, field.path))
)

const getChildren = createSelector(
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

export const getWhitelistedChildren = createSelector(
  [getChildren, getWhitelist],
  (children, whitelist) => children.filter(child => isWhitelisted(whitelist, child.path))
)
