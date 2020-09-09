const wrapWith = require('../utils/wrap-with');

const valueListenableBuilderSnippet = (widget) => {
  return `ValueListenableBuilder(
    valueListenable: $1,
    builder: (_, $1Value, __) {
        return ${widget};
    },
)`;
};


const providerConsumerBuilderSnippet = (widget) => {
  return `Consumer<$1>(
    builder: (_, $2) {
        return ${widget};
    },
)`;
};


const wrapWithValueListenableBuilder = async () => wrapWith(valueListenableBuilderSnippet);
const wrapWithProviderConsumerBuilder = async () => wrapWith(providerConsumerBuilderSnippet);

module.exports = { wrapWithValueListenableBuilder, wrapWithProviderConsumerBuilder };