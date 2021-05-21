const wrapWith = require('../utils/wrap-with');

const valueListenableBuilderSnippet = (widget) => {
  return `ValueListenableBuilder(
    valueListenable: $1,
    builder: (_, $1Value, child) {
        return ${widget};
    },
)`;
};


const providerConsumerBuilderSnippet = (widget) => {
  return `Consumer<$1>(
    builder: (_, $2, __) {
        return ${widget};
    },
)`;
};

const mobxObserverBuilderSnippet = (widget) => {
  return `Observer(
    builder: (_) {
        return ${widget};
    },
)`;
};

const layoutBuilderSnippet = (widget) => {
  return `LayoutBuilder(
    builder: (_, constrains) { 
        return ${widget};
    },
  )`;
};

const builderSnippet = (widget) => {
  return `Builder(
    builder: (context) { 
        return ${widget};
    },
  )`;
};


const wrapWithValueListenableBuilder = async () => wrapWith(valueListenableBuilderSnippet);
const wrapWithProviderConsumerBuilder = async () => wrapWith(providerConsumerBuilderSnippet);
const wrapWithMobXObserverBuilder = async () => wrapWith(mobxObserverBuilderSnippet);
const wrapWithLayoutBuilder = async () => wrapWith(layoutBuilderSnippet);
const wrapWithBuilder = async () => wrapWith(builderSnippet);

module.exports = { wrapWithValueListenableBuilder, wrapWithProviderConsumerBuilder, wrapWithMobXObserverBuilder, wrapWithLayoutBuilder, wrapWithBuilder };