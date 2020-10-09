const _ = require('lodash');

// Return _components organized by section, based on the parameters passed in index
// See components-build-defaults for example of index spec
module.exports = (_components, index, options) => {
  let components = _.cloneDeep(_components);
  // Sort components first
  if (index.sortAllBy) {
    components = _.orderBy(components, index.sortAllBy[0], index.sortAllBy[1]);
  }
  // Eventually keep only some of them
  if (index.limitAll && Number.isInteger(index.limitAll)) {
    components = components.slice(0, index.limitAll);
  }
  // Organize components by sections
  const componentsBySections = {};
  components.forEach((component) => {
    // A section can be either a property on the component object, or the result
    // of calling a callback with the component as parameter, for flexibility
    const section = _.isFunction(index.createSectionsBy)
      ? index.createSectionsBy(component)
      : component[index.createSectionsBy];
    // Initialize the section, compute the (pretty) section name based either
    // on a index.prettifySection callack or an options.components.prettify callback
    // if the section is an object property
    if (!componentsBySections[section]) {
      componentsBySections[section] = {};
      if (index.prettifySection) {
        componentsBySections[section].name = index.prettifySection(section);
      } else if (options.components.prettify[index.createSectionsBy]) {
        componentsBySections[section].name =
          options.components.prettify[index.createSectionsBy](section);
      } else {
        componentsBySections[section].name = section;
      }
      componentsBySections[section].components = [];
    }
    // Accumulate in the section
    componentsBySections[section].components.push(component);
  });
  return componentsBySections;
};
